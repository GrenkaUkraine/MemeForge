import { FontSettings } from "../utils/FontSettings.mjs";
import { BaseGenerator } from "./BaseGenerator.mjs";
import { loadImage } from "canvas";

export class DemotivatorGenerator extends BaseGenerator {
    constructor(image, fontSettingsTopText = new FontSettings("serif", 60), fontSettingsBottomText = new FontSettings("Arial", 25, "bold")) {
        super();

        this.image = null;
        this.imagePath = image;
        this.fontSettingsTopText = fontSettingsTopText;
        this.fontSettingsBottomText = fontSettingsBottomText;

        this.borderPadding = 10;
        this.borderWeight = 4;
    }

    async generate(topText, bottomText) {
        this.image = await loadImage(this.imagePath);
        if (!this.image) {
            throw new Error("Image failed to load");
        }

        await this.calculateCanvasSize(topText, bottomText).then(() => {
            this.drawBackground();
            this.drawImage();
            this.drawText(topText, bottomText);
        });
    }

    async calculateCanvasSize(topText, bottomText) {
        const padding = 50;
        const maxDimension = 1000;

        const imageAspectRatio = this.image.width / this.image.height;

        let imageWidth = this.image.width;
        let imageHeight = this.image.height;

        if (imageWidth > maxDimension || imageHeight > maxDimension) {
            if (imageWidth > imageHeight) {
                imageWidth = maxDimension;
                imageHeight = imageWidth / imageAspectRatio;
            } else {
                imageHeight = maxDimension;
                imageWidth = imageHeight * imageAspectRatio;
            }
        }
        
        const lines = this.breakTextIntoLines(bottomText, imageWidth);

        const topTextWidth = this.fontSettingsTopText.getWidth(this.context, topText);
        const bottomTextWidth = this.getMaxBottomTextWidth(lines);

        const maxTextWidth = Math.max(topTextWidth, bottomTextWidth);

        const canvasWidth = Math.max(imageWidth, maxTextWidth) + padding * 2;

        const bottomTextHeight = this.calculateBottomTextHeight(lines);

        const canvasHeight = imageHeight + padding * 2.5 + this.fontSettingsTopText.fontSize + bottomTextHeight;

        if (canvasWidth <= 0 || canvasHeight <= 0) {
            throw new Error("Invalid canvas dimensions");
        }

        this.recreateCanvas(canvasWidth, canvasHeight);
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.padding = padding;
    }

    getMaxBottomTextWidth(lines) {
        let maxWidth = 0;
        lines.forEach(line => {
            const lineWidth = this.fontSettingsBottomText.getWidth(this.context, line);
            maxWidth = Math.max(maxWidth, lineWidth);
        });
        return maxWidth;
    }

    calculateBottomTextHeight(lines) {
        return lines.length * this.fontSettingsBottomText.fontSize; // Высота всех строк
    }

    breakTextIntoLines(text, maxWidth) {
        const words = text.split(" ");
        const lines = [];
        let currentLine = "";

        words.forEach(word => {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const testWidth = this.fontSettingsBottomText.getWidth(this.context, testLine);

            if (testWidth <= maxWidth) {
                currentLine = testLine;
            } else {
                if (currentLine.length > 0) {
                    lines.push(currentLine);
                }
                currentLine = word; // Начинаем новую строку с текущего слова
            }
        });

        if (currentLine.length > 0) {
            lines.push(currentLine); // Добавляем последнюю строку, если есть
        }

        return lines;
    }

    drawBackground() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawImage() {
        const x = (this.canvas.width - this.imageWidth) / 2;
        const y = this.padding;
        this.context.drawImage(this.image, x, y, this.imageWidth, this.imageHeight);

        this.context.strokeStyle = "white";
        this.context.lineWidth = this.borderWeight;
        this.context.strokeRect(x - this.borderPadding, y - this.borderPadding, this.imageWidth + this.borderPadding*2, this.imageHeight + this.borderPadding*2);
    }

    drawText(topText, bottomText) {
        this.context.textAlign = "center";

        this.fontSettingsTopText.applySettings(this.context);
        const topTextHeight = this.imageHeight + this.padding + this.borderPadding + this.borderWeight + this.fontSettingsTopText.fontSize;
        this.context.fillText(topText, this.canvas.width / 2, topTextHeight);

        // Обработка переноса нижнего текста
        const maxBottomTextWidth = this.imageWidth; // Ширина, на которой нужно переносить текст
        const lines = this.breakTextIntoLines(bottomText, maxBottomTextWidth);

        let yOffset = topTextHeight + this.fontSettingsBottomText.fontSize + 10;
        this.fontSettingsBottomText.applySettings(this.context);

        // Рисуем каждую строку нижнего текста
        lines.forEach((line, index) => {
            this.context.fillText(line, this.canvas.width / 2, yOffset + (index * this.fontSettingsBottomText.fontSize));
        });
    }
}
