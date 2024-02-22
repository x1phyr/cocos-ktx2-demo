// cocos/gfx/base/define.ts 没导出
export enum Format {

    UNKNOWN,

    A8,
    L8,
    LA8,

    R8,
    R8SN,
    R8UI,
    R8I,
    R16F,
    R16UI,
    R16I,
    R32F,
    R32UI,
    R32I,

    RG8,
    RG8SN,
    RG8UI,
    RG8I,
    RG16F,
    RG16UI,
    RG16I,
    RG32F,
    RG32UI,
    RG32I,

    RGB8,
    SRGB8,
    RGB8SN,
    RGB8UI,
    RGB8I,
    RGB16F,
    RGB16UI,
    RGB16I,
    RGB32F,
    RGB32UI,
    RGB32I,

    RGBA8,
    BGRA8,
    SRGB8_A8,
    RGBA8SN,
    RGBA8UI,
    RGBA8I,
    RGBA16F,
    RGBA16UI,
    RGBA16I,
    RGBA32F,
    RGBA32UI,
    RGBA32I,

    // Special Format
    R5G6B5,
    R11G11B10F,
    RGB5A1,
    RGBA4,
    RGB10A2,
    RGB10A2UI,
    RGB9E5,

    // Depth-Stencil Format
    DEPTH,
    DEPTH_STENCIL,

    // Compressed Format

    // Block Compression Format, DDS (DirectDraw Surface)
    // DXT1: 3 channels (5:6:5), 1/8 original size, with 0 or 1 bit of alpha
    BC1,
    BC1_ALPHA,
    BC1_SRGB,
    BC1_SRGB_ALPHA,
    // DXT3: 4 channels (5:6:5), 1/4 original size, with 4 bits of alpha
    BC2,
    BC2_SRGB,
    // DXT5: 4 channels (5:6:5), 1/4 original size, with 8 bits of alpha
    BC3,
    BC3_SRGB,
    // 1 channel (8), 1/4 original size
    BC4,
    BC4_SNORM,
    // 2 channels (8:8), 1/2 original size
    BC5,
    BC5_SNORM,
    // 3 channels (16:16:16), half-floating point, 1/6 original size
    // UF16: unsigned float, 5 exponent bits + 11 mantissa bits
    // SF16: signed float, 1 signed bit + 5 exponent bits + 10 mantissa bits
    BC6H_UF16,
    BC6H_SF16,
    // 4 channels (4~7 bits per channel) with 0 to 8 bits of alpha, 1/3 original size
    BC7,
    BC7_SRGB,

    // Ericsson Texture Compression Format
    ETC_RGB8,
    ETC2_RGB8,
    ETC2_SRGB8,
    ETC2_RGB8_A1,
    ETC2_SRGB8_A1,
    ETC2_RGBA8,
    ETC2_SRGB8_A8,
    EAC_R11,
    EAC_R11SN,
    EAC_RG11,
    EAC_RG11SN,

    // PVRTC (PowerVR)
    PVRTC_RGB2,
    PVRTC_RGBA2,
    PVRTC_RGB4,
    PVRTC_RGBA4,
    PVRTC2_2BPP,
    PVRTC2_4BPP,

    // ASTC (Adaptive Scalable Texture Compression)
    ASTC_RGBA_4X4,
    ASTC_RGBA_5X4,
    ASTC_RGBA_5X5,
    ASTC_RGBA_6X5,
    ASTC_RGBA_6X6,
    ASTC_RGBA_8X5,
    ASTC_RGBA_8X6,
    ASTC_RGBA_8X8,
    ASTC_RGBA_10X5,
    ASTC_RGBA_10X6,
    ASTC_RGBA_10X8,
    ASTC_RGBA_10X10,
    ASTC_RGBA_12X10,
    ASTC_RGBA_12X12,

    // ASTC (Adaptive Scalable Texture Compression) SRGB
    ASTC_SRGBA_4X4,
    ASTC_SRGBA_5X4,
    ASTC_SRGBA_5X5,
    ASTC_SRGBA_6X5,
    ASTC_SRGBA_6X6,
    ASTC_SRGBA_8X5,
    ASTC_SRGBA_8X6,
    ASTC_SRGBA_8X8,
    ASTC_SRGBA_10X5,
    ASTC_SRGBA_10X6,
    ASTC_SRGBA_10X8,
    ASTC_SRGBA_10X10,
    ASTC_SRGBA_12X10,
    ASTC_SRGBA_12X12,

    // Total count
    COUNT,
}


// ASTC format, from:
// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
const COMPRESSED_RGBA_ASTC_4x4_KHR = 0x93B0;

// DXT formats, from:
// http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
const COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83F0;
const COMPRESSED_RGBA_S3TC_DXT1_EXT = 0x83F1;
const COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83F2;
const COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83F3;

// BC7 format, from:
// https://www.khronos.org/registry/webgl/extensions/EXT_texture_compression_bptc/
const COMPRESSED_RGBA_BPTC_UNORM = 0x8E8C;

// ETC format, from:
// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_etc1/
const COMPRESSED_RGB_ETC1_WEBGL = 0x8D64;

// PVRTC format, from:
// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_pvrtc/
const COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 0x8C00;
const COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 0x8C02;

// Same as the Module.transcoder_texture_format enum
export enum BASIS_FORMAT {
    cTFETC1 = 0,
    cTFETC2 = 1,
    cTFBC1 = 2,
    cTFBC3 = 3,
    cTFBC4 = 4,
    cTFBC5 = 5,
    cTFBC7 = 6,
    cTFPVRTC1_4_RGB = 8,
    cTFPVRTC1_4_RGBA = 9,
    cTFASTC_4x4 = 10,
    // cTFATC_RGB = 11,
    // cTFATC_RGBA_INTERPOLATED_ALPHA = 12,
    cTFRGBA32 = 13,
    cTFRGB565 = 14,
    // cTFBGR565 = 15,
    cTFRGBA4444 = 16,
    // cTFFXT1_RGB = 17,
    // cTFPVRTC2_4_RGB = 18,
    cTFPVRTC2_4_RGBA = 19,
    // cTFETC2_EAC_R11 = 20,
    // cTFETC2_EAC_RG11 = 21
};

const BASIS_FORMAT_2_GL_FORMAT = {
    [BASIS_FORMAT.cTFETC1]: Format.ETC_RGB8,
    [BASIS_FORMAT.cTFETC2]: Format.ETC2_RGB8,
    [BASIS_FORMAT.cTFBC1]: Format.BC1,
    [BASIS_FORMAT.cTFBC3]: Format.BC3,
    [BASIS_FORMAT.cTFBC4]: Format.BC4,
    [BASIS_FORMAT.cTFBC5]: Format.BC5,
    [BASIS_FORMAT.cTFBC7]: Format.BC7,
    [BASIS_FORMAT.cTFPVRTC1_4_RGB]: Format.PVRTC_RGB4,
    [BASIS_FORMAT.cTFPVRTC1_4_RGBA]: Format.PVRTC_RGBA4,
    [BASIS_FORMAT.cTFASTC_4x4]: Format.ASTC_RGBA_4X4,
    // cTFATC_RGB:,
    // cTFATC_RGBA_INTERPOLATED_ALPHA:, 
    [BASIS_FORMAT.cTFRGBA32]: Format.RGBA32F,
    [BASIS_FORMAT.cTFRGB565]: Format.R5G6B5,
    // cTFBGR565:,
    [BASIS_FORMAT.cTFRGBA4444]: Format.RGBA16F,
    // cTFFXT1_RGB:, // FXT1 (desktop, Intel devices, this is a super obscure format)
    // cTFPVRTC2_4_RGB:,
    [BASIS_FORMAT.cTFPVRTC2_4_RGBA]: Format.PVRTC_RGBA4,
    // cTFETC2_EAC_R11:,
    // cTFETC2_EAC_RG11:,
}

/**
 * Basis 和 WebGL 压缩格式编号互转
 * @param basisFormat 
 * @returns 
 */
export const BasisFormat2GlFormat = function (basisFormat) {
    return BASIS_FORMAT_2_GL_FORMAT[basisFormat];
}