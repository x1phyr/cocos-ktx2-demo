/*
 * @Description: 
 * @Author: liufuhong
 * @Mail: 550939351@qq.com
 * @Date: 2024-02-22 20:57:40
 * @LastEditors: liufuhong
 * @LastEditTime: 2024-02-22 22:27:42
 * @FilePath: \cocos_ktx2_demo\assets\plugin\AssetManagerAddon.ts
 */
import { assetManager } from "cc";

assetManager.downloader.register(".wasm", assetManager.downloader["_downloadArrayBuffer"]);
assetManager.downloader.register(".ktx2", assetManager.downloader["_downloadArrayBuffer"]);
