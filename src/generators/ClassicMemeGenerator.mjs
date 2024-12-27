import { loadImage } from "canvas";
import { FontSettings } from "../utils/FontSettings.mjs";
import { BaseGenerator } from "./BaseGenerator.mjs";

export class ClassicMemeGenerator extends BaseGenerator {
    constructor(image, fontSettings = new FontSettings(
        "Impact",
        50,
        'bold',
        'white',
        'black',
        3
    )) {
        super();

        this.image = null;
        this.imagePath = image;

        this.fontSettings = fontSettings;
    }

    async generate(topText = null, bottomText = null) {
        this.image = await loadImage(this.imagePath);
        if (!this.image) {
            throw new Error("Image failed to load");
        }

        this.recreateCanvas(this.image.width, this.image.height);

        this.drawImage();
        this.drawText(topText, bottomText);
    }

    drawImage() {
        this.context.drawImage(this.image, 0, 0);
    }

    // Метод для разбивки текста на строки, если он слишком длинный
    wrapText(text, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';

        for (const word of words) {
            const testLine = currentLine ? currentLine + ' ' + word : word;
            const testWidth = this.context.measureText(testLine).width;

            if (testWidth > maxWidth) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }

        if (currentLine) {
            lines.push(currentLine);
        }

        return lines;
    }

    drawText(topText = null, bottomText = null) {
        topText = topText ? topText.toUpperCase() : '';
        bottomText = bottomText ? bottomText.toUpperCase() : '';

        this.fontSettings.applySettings(this.context);
        this.context.textAlign = "center";

        const margin = 20;
        const lineHeight = this.fontSettings.fontSize * 1.2; // межстрочный интервал
        const maxWidth = this.canvas.width - margin * 2;

        // Рисуем верхний текст
        if (topText) {
            const topLines = this.wrapText(topText, maxWidth);
            let y = 50;

            for (const line of topLines) {
                this.context.strokeText(line, this.canvas.width / 2, y);
                this.context.fillText(line, this.canvas.width / 2, y);
                y += lineHeight;
            }
        }

        // Рисуем нижний текст
        if (bottomText) {
            const bottomLines = this.wrapText(bottomText, maxWidth);
            let y = this.canvas.height - margin;

            for (let i = bottomLines.length - 1; i >= 0; i--) {
                this.context.strokeText(bottomLines[i], this.canvas.width / 2, y);
                this.context.fillText(bottomLines[i], this.canvas.width / 2, y);
                y -= lineHeight;
            }
        }
    }
}
