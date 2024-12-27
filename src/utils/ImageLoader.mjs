import { loadImage } from 'canvas';
import { PathUtil } from './SaveUtil.mjs';
import fs from 'fs';

export class ImageLoader {
    constructor(imagePath) {
        this.imagePath = imagePath;
        this.absoluteImagePath = PathUtil.getAbsolutePath(imagePath);
        this.image = null;
    }

    load() {
        try {
            console.log("Loading image from path:", this.imagePath);
            console.log("Loading image from absolute path:", this.absoluteImagePath);

            // Проверка существования файла
            try {
                fs.promises.access(this.absoluteImagePath, fs.constants.F_OK);
                console.log("file exists!");
            } catch (err) {
                console.error("Image not found at:", this.absoluteImagePath);
                throw new Error("Image not found");
            }

            const image = loadImage(this.absoluteImagePath);
            return image;
        } catch (error) {
            console.error("Error loading image:", error);
            throw error;
        }
    }
}
