export class FontSettings {
    constructor(
        fontFamily = 'Arial', 
        fontSize = 20, 
        fontWeight = 'normal', 
        fontColor = 'white', 
        strokeColor = 'black', 
        strokeWidth = 0
    ) {
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.fontWeight = fontWeight;
        this.fontColor = fontColor;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
    }

    static getDefault(fontSize = 20, fontWeight = 'normal', fontFamily = 'Arial') {
        return new FontSettings(fontFamily, fontSize, fontWeight, 'white', 'black', 0);
    }

    applySettings(context) {
        context.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
        context.fillStyle = this.fontColor;
        context.strokeStyle = this.strokeColor;
        context.lineWidth = this.strokeWidth;
    }

    setFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
    }

    setFontSize(fontSize) {
        this.fontSize = fontSize;
    }

    setFontWeight(fontWeight) {
        this.fontWeight = fontWeight;
    }

    setFontColor(fontColor) {
        this.fontColor = fontColor;
    }

    setStrokeColor(strokeColor) {
        this.strokeColor = strokeColor;
    }

    setStrokeWidth(strokeWidth) {
        this.strokeWidth = strokeWidth;
    }

    getWidth(context, text) {
        this.applySettings(context);
        const metrics = context.measureText(text);
        return metrics.width;
    }
}
