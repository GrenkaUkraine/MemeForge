import { registerFont } from "canvas";
import path from "path";

export class FontLoader {
    static registerAbsolutePath(fontPath, name) {
        registerFont(fontPath, { family: name });
    }

    static register(fontsDirPath, fontFile, name) {
        console.log(new URL(import.meta.url).pathname.slice(1));
        
        const moduleDir = new URL(import.meta.url).pathname.slice(1);
        console.log(path.resolve(moduleDir, fontsDirPath, fontFile));
        
        const absoluteFontPath = path.resolve(moduleDir, fontsDirPath, fontFile);
        this.registerAbsolutePath(absoluteFontPath, name);
    }

    static load() {
        this.register("../../assets/fonts", "impact.ttf", "Impact");
    }
}
