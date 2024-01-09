import { MMKVInstance, MMKVLoader } from "react-native-mmkv-storage";

export default class Internal {
    static initialized = false
    static storage: MMKVInstance | undefined

    static init() {
        this.storage = new MMKVLoader().withInstanceID('settings').initialize()
        this.initialized = true
    }

    static load(key: string): string {
        if (!this.initialized){
            this.init()
        }
        const result =  this.storage?.getString(key) ?? ""
        console.log("loaded:" + result)
        return result
    }

    static save(key: string, value: any) {
        if (!this.initialized){
            this.init()
        }
        this.storage?.setString(key, "" + value);
    }
}

