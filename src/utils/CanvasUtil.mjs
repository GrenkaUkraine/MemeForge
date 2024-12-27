export class CanvasUtils {
    static centerText(context, text, x, y, maxWidth) {
      context.textAlign = 'center';
      context.fillText(text, x, y, maxWidth);
    }
  }
  