import { Window, Widget } from "../core/ui";
import { Rect, Text } from "../core/ui";

class ProgressBar extends Widget {
    private _rect: Rect;
    private _progressRect: Rect;
    private _progress: number = 0;
    private _text: Text;
    private _fontSize: number = 16;
    private _textColor: string = "#FFFFFF";
    private _barColor: string = "#4682B4";
    private _backgroundColor: string = "silver";

    constructor(parent: Window, width: number = 300, height: number = 40) {
        super(parent);
        this.width = width;
        this.height = height;
        this.render();
        this.updateProgress(0);
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(this.width, this.height).fill(this._backgroundColor);
        this._progressRect = this._group.rect(0, this.height).fill(this._barColor);
        this._text = this._group.text('0%').font({ size: this._fontSize, fill: this._textColor });
        this.positionText();
    }

    updateProgress(progress: number): void {
        this._progress = Math.max(0, Math.min(progress, 100));
        let width = (this.width * this._progress) / 100;
        this._progressRect.width(width);
        this._text.text(`${Math.round(this._progress)}%`);
        this.positionText();
    }

    private positionText() {
        let box = this._text.bbox();
        let textX = +this._rect.x() + (this.width - box.width) / 2; 
        let textY = +this._rect.y() + (this.height - box.height) / 2;
        this._text.move(textX, textY);
    }

    move(x: number, y: number): void {
        this._group.move(x, y);
        this.positionText();  
    }

    setWidth(newWidth: number): void {
        this.width = newWidth;
        this._rect.width(this.width);
        this.updateProgress(this._progress);
    }

    setHeight(newHeight: number): void {
        this.height = newHeight;
        this._rect.height(this.height);
        this.updateProgress(this._progress);
    }

    set fontSize(size: number) {
        this._fontSize = size;
        this._text.font('size', this._fontSize);
        this.positionText();
    }

    set textColor(color: string) {
        this._textColor = color;
        this._text.fill(color);
    }

    set barColor(color: string) {
        this._barColor = color;
        this._progressRect.fill(color);
    }

    set backgroundColor(color: string) {
        this._backgroundColor = color;
        this._rect.fill(color);
    }

    idleupState(): void {}
    idledownState(): void {}
    pressedState(): void {}
    pressReleaseState(): void {}
    hoverState(): void {}
    hoverPressedState(): void {}
    pressedoutState(): void {}
    moveState(): void {}
    keyupState(): void {}
}

export { ProgressBar };
