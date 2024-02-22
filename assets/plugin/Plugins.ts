import { KTX2Loader } from "./KTX2Loader";

export class Plugins {
    private static _KTX2LoaderInst: KTX2Loader;
    /**
     * KTX2Loader
     */
    static get KTX2Loader(): KTX2Loader {
        if (!this._KTX2LoaderInst) {
            this._KTX2LoaderInst = new KTX2Loader();
        }
        return this._KTX2LoaderInst;
    };
}
