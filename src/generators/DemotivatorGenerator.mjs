import { FontSettings } from "../utils/FontSettings.mjs";
import { BaseGenerator } from "./BaseGenerator.mjs";
import { loadImage } from 'canvas';

export class DemotivatorGenerator extends BaseGenerator {
    constructor(image, fontSettingsTopText = FontSettings.getDefault(25), fontSettingsBottomText = FontSettings.getDefault()) {
        super();
        this.image = null;
        this.imagePath = image;
        this.fontSettingsTopText = fontSettingsTopText;
        this.fontSettingsBottomText = fontSettingsBottomText;
    }

    async generate(topText, bottomText) {
        this.image = await loadImage(this.imagePath);

        this.calculateCanvasSize();

        this.drawImage();
        this.drawText(topText, bottomText);
    }

    drawImage() {
        this.context.drawImage(this.image, 100, 100, 600, 400);
    }

    drawText(topText, bottomText) {
        this.context.textAlign = 'center';

        this.fontSettingsTopText.applySettings(this.context);
        this.context.fillText(topText, this.canvas.width / 2, 520);

        this.fontSettingsBottomText.applySettings(this.context);
        this.context.fillText(bottomText, this.canvas.width / 2, 560);
    }

    calculateCanvasSize() {
        const imageWidth = this.image.width;
        const imageHeight = this.image.height;
    
        const maxWidth = Math.max(
            imageWidth,
            this.fontSettingsTopText.getWidth(this.context, "Top text"),
            this.fontSettingsBottomText.getWidth(this.context, "Bottom text")
        );
        const maxHeight = imageHeight + 120;
    
        this.recreateCanvas(maxWidth, maxHeight);
    }    
}