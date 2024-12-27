import { registerFont } from "canvas";
import path from "path";

export class FontLoader {
    static registerAbsolutePath(fontPath, name) {
        registerFont(fontPath, { family: name });
    }

    static register(fontsDirPath, fontFile, name) {
        const absoluteFontPath = path.resolve(fontsDirPath, fontFile);
        this.registerAbsolutePath(absoluteFontPath, name);
    }

    static load() {
        this.register("./src/assets/fonts", "impact.ttf", "Impact");
    }
}
