import { loadImage } from "canvas";
import { FontSettings } from "../utils/FontSettings.mjs";
import { BaseGenerator } from "./BaseGenerator.mjs";

export class GreatPeopleQuoteGenerator extends BaseGenerator {
    constructor(image,
        fontSettingsTitle = FontSettings.getDefault(36, 'bold'),
        fontSettingsQuote = FontSettings.getDefault(28, 'italic'),
        fontSettingsAuthor = FontSettings.getDefault(20),
        maxQuoteWidth = 650
    ) {
        super();

        this.image = null;
        this.imagePath = image;
        this.fontSettingsTitle = fontSettingsTitle;
        this.fontSettingsQuote = fontSettingsQuote;
        this.fontSettingsAuthor = fontSettingsAuthor;
        this.maxQuoteWidth = maxQuoteWidth;

        this.imageSize = 50;
        this.padding = 30;
        this.gap = 25;
        this.authorMerge = 10;
    }

    async generate(title, quote, author) {
        this.image = await loadImage(this.imagePath);
        if (!this.image) {
            throw new Error("Image failed to load");
        }
        quote = "«" + quote + "».";
        author = "© " + author;

        this.calculateCanvasSize(title, quote, author);

        this.drawBackground();
        this.drawAuthor(author);
        this.drawText(title, quote);
    }

    calculateCanvasSize(title, quote, author) {
        const lines = this.breakTextIntoLines(quote, this.maxQuoteWidth);

        const quoteTextWidth = this.getMaxQuoteTextWidth(lines);
        const quoteTextHeight = this.calculateQuoteTextHeight(lines);

        const titleTextWidth = this.fontSettingsTitle.getWidth(this.context, title);
        const titleTextHeight = this.fontSettingsTitle.fontSize;

        const AuthorTextWidth = this.fontSettingsAuthor.getWidth(this.context, author);
        const AuthorTextHeight = this.fontSettingsAuthor.fontSize;

        const canvasWidth = this.padding * 2 + Math.max(quoteTextWidth, titleTextWidth, this.imageSize + this.authorMerge + AuthorTextWidth);
        const canvasHeight = this.padding * 2 + this.gap * 3 + quoteTextHeight + titleTextHeight + Math.max(AuthorTextHeight, this.imageSize);

        this.recreateCanvas(canvasWidth, canvasHeight);
    }

    getMaxQuoteTextWidth(lines) {
        let maxWidth = 0;
        lines.forEach(line => {
            const lineWidth = this.fontSettingsQuote.getWidth(this.context, line);
            maxWidth = Math.max(maxWidth, lineWidth);
        });
        return maxWidth;
    }

    calculateQuoteTextHeight(lines) {
        return lines.length * this.fontSettingsQuote.fontSize;
    }

    breakTextIntoLines(text, maxWidth) {
        const words = text.split(" ");
        const lines = [];
        let currentLine = "";

        words.forEach(word => {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const testWidth = this.fontSettingsQuote.getWidth(this.context, testLine);

            if (testWidth <= maxWidth) {
                currentLine = testLine;
            } else {
                if (currentLine.length > 0) {
                    lines.push(currentLine);
                }
                currentLine = word;
            }
        });

        if (currentLine.length > 0) {
            lines.push(currentLine);
        }

        return lines;
    }

    drawAuthor(author) {
        this.context.textAlign = "start";
        this.fontSettingsAuthor.applySettings(this.context);
    
        const side = Math.min(this.image.width, this.image.height);
    
        const sx = (this.image.width - side) / 2;
        const sy = (this.image.height - side) / 2;
    
        const dx = this.padding;
        const dy = this.canvas.height - this.padding - this.imageSize;
        const diameter = this.imageSize;
    
        this.context.save();
        this.context.beginPath();
        this.context.arc(
            dx + diameter / 2,
            dy + diameter / 2,
            diameter / 2,
            0, Math.PI * 2
        );
        this.context.closePath();
        this.context.clip();
    
        this.context.drawImage(this.image, sx, sy, side, side, dx, dy, diameter, diameter);
    
        this.context.restore();
        this.context.fillText(
            author,
            dx + diameter + this.authorMerge,
            dy + diameter / 2 + this.fontSettingsAuthor.fontSize / 2.5
        );
    }
    
    drawBackground() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawText(title, quote) {
        this.context.textAlign = "center";

        this.fontSettingsTitle.applySettings(this.context);
        this.context.fillText(title, this.canvas.width / 2, this.fontSettingsTitle.fontSize + this.padding);

        this.context.textAlign = "start";
        const lines = this.breakTextIntoLines(quote, this.canvas.width - this.padding * 2);
        let y = this.fontSettingsTitle.fontSize + this.gap + this.padding + this.fontSettingsQuote.fontSize;

        this.fontSettingsQuote.applySettings(this.context);
        lines.forEach(line => {
            this.context.fillText(line, this.padding, y);
            y += this.fontSettingsQuote.fontSize;
        });
    }
}
