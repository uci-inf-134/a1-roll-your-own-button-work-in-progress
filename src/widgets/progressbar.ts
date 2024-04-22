import { Window, Widget, RoleType } from "../core/ui";
import { Rect } from "../core/ui";

class ProgressBar extends Widget {
    private _rect: Rect;
    private _progressRect: Rect;
    private _progress: number = 0;

    constructor(parent: Window, width: number = 100, height: number = 20) {
        super(parent);
        this.width = width;  
        this.height = height;  
        this.render();
        this.updateProgress(0);  
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;
        
        this._rect = this._group.rect(this.width, this.height).fill('silver').opacity(0.3);
        
        this._progressRect = this._group.rect(0, this.height).fill('blue');
    }

    updateProgress(progress: number): void {
        this._progress = Math.max(0, Math.min(progress, 100));  
        let width = (this.width * this._progress) / 100;  
        this._progressRect.width(width);  
    }

    
    setWidth(newWidth: number): void {
        this.width = newWidth;
        this._rect.width(this.width);
        this._progressRect.width((this.width * this._progress) / 100);
    }

    setHeight(newHeight: number): void {
        this.height = newHeight;
        this._rect.height(this.height);
        this._progressRect.height(this.height);
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
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
