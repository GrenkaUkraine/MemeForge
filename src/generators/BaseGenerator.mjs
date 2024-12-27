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
    const dir = path.dirname(filename);

    PathUtil.ensureDirExists(dir);

    const out = fs.createWriteStream(filename);
    const stream = this.canvas.createPNGStream();
    stream.pipe(out);
    return new Promise((resolve, reject) => {
      out.on('finish', () => resolve(filename));
      out.on('error', reject);
    });
  }

  generate() {
    throw new Error('Method "generate" must be implemented in child class');
  }
}
