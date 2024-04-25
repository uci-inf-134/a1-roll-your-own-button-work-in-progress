import { Window, Widget } from "../core/ui";
import { Rect, Text } from "../core/ui";

class ProgressBar extends Widget {
    private _rect: Rect;
    private _progressRect: Rect;
    private _progress: number = 0;
    private _increment: number = 5;
    private _text: Text;
    private _fontSize: number = 16;
    private _textColor: string = "#FFFFFF";
    private _barColor: string = "#4682B4";
    private _backgroundColor: string = "silver";
    private _listeners: { [event: string]: Function[] } = {};

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
        this.emit('progress', { value: this._progress });
    }

    // requirement 4 & 5
    incrementProgress(value: number): void {
        let newProgress = this._progress + value;
    
        if (newProgress < 0) {
            newProgress = 0;
        } else if (newProgress > 100) {
            newProgress = 100;
        }
    
        this.updateProgress(newProgress);
    
        if (value > 0) {
            console.log('Incremented by ' + value);
            this.emit('stateChange', { newState: 'incremented', increment: value, newProgress: newProgress });
        } else if (value < 0) {
            console.log('Decremented by ' + value);
            this.emit('stateChange', { newState: 'decremented', decrement: value, newProgress: newProgress });
        }
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

    // requirement 1
    setWidth(newWidth: number): void {
        this.width = newWidth;
        this._rect.width(this.width);
        console.log('The new progress bar width is ' + this.width);
        this.updateProgress(this._progress);
    }

    setHeight(newHeight: number): void {
        this.height = newHeight;
        this._rect.height(this.height);
        this.updateProgress(this._progress);
    }

    getWidth(): number {
        console.log('The width is ' + this.width);
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    getIncrement(): number {
        return this.increment;
    }

    // requirement 2
    set increment(value: number) {
        if (value < 0 || value > 100) {
            console.error("invalid.");
            return;
        }
        this._increment = value;
        console.log('Increment value: ' + this._increment);
    }

    // requirement 3
    get increment(): number {
        console.log('Increment value: ' + this._increment);
        return this._increment;
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

    on(event: string, listener: Function): void {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }
        this._listeners[event].push(listener);
    }

    // requirement 6
    private emit(event: string, data: any): void {
        if (this._listeners[event]) {
            this._listeners[event].forEach(listener => listener(data));
        }
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
