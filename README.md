# coocs-ktx2_demo

这是一个用来测试 cocos creator 3.8.2 使用 ktx2 格式来处理纹理的 Demo，目前只有加载 ktx2 格式图片的功能。

# 关于 KTX2

KTX 是一种 GPU 纹理容器格式，用于存储不同的纹理类型（2D、立方体贴图等）和纹理格式（未压缩和压缩）。2.0 版增加了对 Basis Universal 超压缩纹理的支持。

Basis Universal 是一个超级压缩 GPU 纹理数据交换系统，它实现了作为传输格式的 UASTC 和 ETC1S 压缩格式。这两种格式都可以快速转码为各种 GPU 原生压缩和非压缩格式，如 RGB/RGBA、PVRTC1、BCn、ETC1、ETC2 等。这意味着，与存储 BC3 纹理的 KTX 2.0 文件不同，数据需要在运行时进行转码。

这里说的 KTX2.0 就是指的 Basis Universal。

![Universal GPU Compressed Textures](https://docs.vulkan.org/samples/latest/_images/samples/performance/texture_compression_basisu/images/2021-ktx-universal-gpu-compressed-textures.png)

传统的 PNG、JPG 格式虽然做到了极致的压缩，但是送到 GPU 渲染时需要完全解码以支持 GPU 的随机访问。ETC、PVRTC 等纹理压缩格式虽然满足在运行时大大减少内存，但是在传输时比 PNG、JPG 占用更大的空间。总体看来，KTX2.0（BASIS）在权衡之后获得了更好的表现。

[关于 BASIS](http://tinyjs.net/guide/advanced-texture-basistexture.html):

> "Basis Universal Supercompressed GPU Texture Codec"——这是来着 basis_universal 的官方介绍，关键词是 Supercompressed。
>
> 相比于 .ktx 为容器的压缩纹理，可以理解为它是以 .basis 为容器的压缩纹理格式，不同的是，它是通过 WebAssembly 运行时解码为各端可支持的压缩纹理格式。
>
> 优点：
>
> -   一套资源：.basis
> -   文件体积更小，常规的比 png 还小
> -   有损性较低：最终的显示效果与原图基本相差不大
>
> 缺点：
>
> -   需要额外加载两个解码相关的文件：basis_transcoder.js 和 basis_transcoder.wasm
> -   有运行时开销：实时解码（借助 WebWorker 可缓解）

# 还可以改进的部分

-   模仿 threejs 的 [KTX2Loader]()，将这个解码过程放在多线程上。另外，那边有个很有用的 [WorkerPool]()。
-   将编码部分也拆出来，做一套工具加入到打包流程里面。

# 相关链接

-   [cococs creator](https://docs.cocos.com/)
-   [basis_universal](https://github.com/BinomialLLC/basis_universal)
-   [Basis-Universal-Transcoders](https://github.com/KhronosGroup/Basis-Universal-Transcoders)
-   [tiny.js 使用 BASIS 纹理](http://tinyjs.net/guide/advanced-texture-basistexture.html)
