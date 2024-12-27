import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { PathUtil } from '../utils/SaveUtil.mjs';

export class BaseGenerator {
    constructor(width = 800, height = 600) {
        this.recreateCanvas(width, height);
    }

    recreateCanvas(width = 800, height = 600) {
        this.canvas = createCanvas(width, height);
        this.context = this.canvas.getContext('2d');
    }

    getCanvas() {
        return this.canvas;
    }

    getContext() {
        return this.context;
    }

    saveToFile(filename) {
        if (!this.canvas) {
            throw new Error("Canvas is not initialized");
        }
        if (!this.context) {
            throw new Error("Canvas context is not initialized");
        }
        

        const dir = path.dirname(filename);
        PathUtil.ensureDirExists(dir);
    
        try {
            const buffer = this.canvas.toBuffer("image/png");
            return fs.promises.writeFile(filename, buffer);
        } catch (error) {
            console.error("Error during buffer generation:", error);
            throw error;
        }
    }

    generate() {
        throw new Error('Method "generate" must be implemented in child class');
    }
}
