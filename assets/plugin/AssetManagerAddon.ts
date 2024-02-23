import { assetManager } from "cc";

assetManager.downloader.register(".wasm", assetManager.downloader["_downloadArrayBuffer"]);
assetManager.downloader.register(".ktx2", assetManager.downloader["_downloadArrayBuffer"]);
