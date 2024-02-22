import { Asset, Root, Texture2D, assetManager, director } from "cc";
import BASIS from "./basis_encoder/basis_encoder.js"
import { BASIS_FORMAT, BasisFormat2GlFormat, Format } from "./Define";

export class KTX2Loader {
    private _init: boolean = false;
    private _module: { basisFile, KTX2File, encodeBasisTexture };

    public async init() {
        if (this._init) return;
        await this.initBasicModule();
        this._init = true;
    }

    /**
     * 解析 KTX2
     * @param data 
     * @returns 
     */
    public async loadKTX2(data: ArrayBuffer): Promise<Texture2D> {
        await this.init();

        let tex: Texture2D = new Texture2D();

        const startTime = performance.now();

        const ktx2File = new this._module.KTX2File(new Uint8Array(data));

        if (!ktx2File.isValid()) {
            console.warn('Invalid or unsupported .ktx2 file');
            ktx2File.close();
            ktx2File.delete();
            return tex;
        }

        // Returns the texture's width in texels. Always non-zero, might not be divisible by 4. Valid after init().
        let width = ktx2File.getWidth();
        // Returns the texture's height in texels. Always non-zero, might not be divisible by 4. Valid after init().
        let height = ktx2File.getHeight();
        // Returns 0 or the number of layers in the texture array or texture video. Valid after init().
        let layers = ktx2File.getLayers() || 1;
        // Returns the texture's number of mipmap levels. Always returns 1 or higher. Valid after init().
        let levels = ktx2File.getLevels();
        // Returns the number of faces. Returns 1 for 2D textures and or 6 for cubemaps. Valid after init().
        let faces = ktx2File.getFaces();
        // Returns true if the ETC1S file has two planes (typically RGBA, or RRRG), or true if the UASTC file has alpha data. Valid after init().
        let has_alpha = ktx2File.getHasAlpha();

        if (!width || !height || !levels) {
            console.warn('Invalid .ktx2 file');
            ktx2File.close();
            ktx2File.delete();
            return tex;
        }

        let format = this.getSupportCompressFormat(width, height, has_alpha);

        if (!ktx2File.startTranscoding()) {
            console.warn('startTranscoding failed');
            this._module.basisFile.close();
            this._module.basisFile.delete();
            return tex;
        }

        // getImageTranscodedSizeInBytes 的第一个参数是 mip，第二个参数是 layer 这里只考虑单张图片的情况，之后再找时间扩展成完整的
        const dstSize = ktx2File.getImageTranscodedSizeInBytes(0, 0, 0, format);
        const dst = new Uint8Array(dstSize);

        // transcodeImage 的第二个参数是 mip，第三个参数是 layer ，第四个参数是 face 这里只考虑单张图片的情况，之后再找时间扩展成完整的
        if (!ktx2File.transcodeImage(dst, 0, 0, 0, format, 0, -1, -1)) {
            console.warn('transcodeImage failed');
            ktx2File.close();
            ktx2File.delete();
            return tex;
        }

        const elapsed = performance.now() - startTime;

        ktx2File.close();
        ktx2File.delete();

        console.log('width: ' + width);
        console.log('height: ' + height);
        console.log('levels: ' + levels);
        console.log('layers: ' + layers);
        console.log('faces: ' + faces);
        console.log('has_alpha: ' + has_alpha);
        console.log('format:' + format);
        console.log('transcoding time', elapsed.toFixed(2));

        tex.reset({
            width,
            height,
            format: BasisFormat2GlFormat(format),
        });
        tex.uploadData(dst);

        return tex;
    }

    /**
     * 初始化 Module
     */
    async initBasicModule() {
        let BasisModule: any;
        // Creator 3.4.1 无法正确加载Wasm文件 https://forum.cocos.org/t/topic/135776/3
        const wasmBinary = await new Promise<ArrayBuffer>((resolve, reject) => {
            assetManager.loadAny<Asset>('b3f09137-abec-4bdb-b96c-4c7f969e2acc', (error, asset) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(asset._nativeAsset as ArrayBuffer);
                }
            });
        });
        await new Promise((resolve) => {
            BasisModule = { wasmBinary, onRuntimeInitialized: resolve };
            BASIS(BasisModule); // eslint-disable-line no-undef
        }).then(() => {
            BasisModule.initializeBasis();
            if (BasisModule.KTX2File === undefined) {
                console.warn('THREE.KTX2Loader: Please update Basis Universal transcoder.');
            }
        });
        this._module = BasisModule;
    }

    /**
     * 获取要转换的目标格式
     * @param width 
     * @param height 
     * @param has_alpha 
     * @returns 
     */
    private getSupportCompressFormat(width, height, has_alpha) {
        let format: BASIS_FORMAT;
        const getFormatFeatures = director.root.device.getFormatFeatures.bind(director.root.device);
        if (getFormatFeatures(Format.ASTC_RGBA_4X4)) {
            format = BASIS_FORMAT.cTFASTC_4x4;
        }
        else if (getFormatFeatures(Format.BC7)) {
            format = BASIS_FORMAT.cTFBC7;
        }
        else if (getFormatFeatures(Format.BC3)) {
            if (has_alpha) {
                format = BASIS_FORMAT.cTFBC3;
            }
            else {
                format = BASIS_FORMAT.cTFBC1;
            }
        }
        else if (getFormatFeatures(Format.PVRTC_RGBA4)) {
            if (has_alpha) {
                format = BASIS_FORMAT.cTFPVRTC1_4_RGBA;
            }
            else {
                format = BASIS_FORMAT.cTFPVRTC1_4_RGB;
            }

            if (
                ((width & (width - 1)) != 0) || ((height & (height - 1)) != 0)
            ) {
                console.error('ERROR: PVRTC1 requires square power of 2 textures');
            }
            if (width != height) {
                console.error('ERROR: PVRTC1 requires square power of 2 textures');
            }
        }
        else if (getFormatFeatures(Format.ETC_RGB8)) {
            format = BASIS_FORMAT.cTFETC1;
        }
        else {
            format = BASIS_FORMAT.cTFRGB565;
            // console.log('Decoding .basis data to 565');
        }

        if (!format) throw ("error format!");
        return format;
    }
}