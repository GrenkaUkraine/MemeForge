export class FontSettings {
    constructor(fontFamily = 'Arial', fontSize = 20, fontWeight = 'normal', fontColor = 'white') {
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.fontWeight = fontWeight;
        this.fontColor = fontColor;
    }

    static getDefault(fontSize = 20) {
        return new FontSettings('Arial', fontSize, 'normal', 'white');
    }

    applySettings(context) {
        context.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
        context.fillStyle = this.fontColor;
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

    getWidth(context, text) {
        this.applySettings(context);
        const metrics = context.measureText(text);
        return metrics.width;
    }
}
