import { _decorator, Asset, assetManager, Component, Node, Sprite, SpriteFrame } from 'cc';
import { Plugins } from '../plugin/Plugins';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    @property(Sprite) sp: Sprite;

    protected onLoad(): void {
    }

    protected start(): void {
        this.foo().then(() => { });
    }

    async foo() {
        await Plugins.KTX2Loader.init();
        let tex = await Plugins.KTX2Loader.loadKTX2(await this.loadTestImage());
        const spf = new SpriteFrame();
        spf.texture = tex;
        this.sp.spriteFrame = spf;
    }

    async loadTestImage(): Promise<ArrayBuffer> {
        return new Promise<ArrayBuffer>((resolve, reject) => {
            // 正常应该是打包之后来用这个 de35c413-d518-4b61-a21f-d6e777597bfa -> kodim23.ktx2
            assetManager.loadAny<Asset>('de35c413-d518-4b61-a21f-d6e777597bfa', (error, asset) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(asset._nativeAsset as ArrayBuffer);
                }
            });
        });
    }
}


