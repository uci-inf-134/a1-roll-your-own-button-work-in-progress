import { Window, Widget } from "../core/ui";
import { Rect } from "../core/ui";

class Scrollbar extends Widget {
    private _rect: Rect;
    private _sliderRect: Rect;
    private _scrollPosition: number = 0;
    private _contentRect: Rect;
    private _isDragging: boolean = false;
    private _startY: number = 0;

    constructor(parent: Window, width: number = 100, height: number = 200) {
        super(parent);
        this.width = width;  
        this.height = height;  
        this.render();
        this.updateScrollPosition(0);  
        this.attachEventListeners();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;
        this._rect = this._group.rect(this.width, this.height).fill('white').stroke({color: 'black', width: 1});
        this._contentRect = this._group.rect(this.width - 20, this.height).fill('lightgrey').x(0).y(0);  
        this._sliderRect = this._group.rect(20, this.height / 4).fill('blue').x(this.width - 20).y(0);  
    }

    updateScrollPosition(scrollPosition: number): void {
        this._scrollPosition = Math.max(0, Math.min(scrollPosition, 100));
        let sliderHeight = Number(this._sliderRect.height());  
        if (isNaN(sliderHeight)) {
            console.error('sliderHeight is not a number:', this._sliderRect.height());
            return;
        }
        let maxSliderTop = this.height - sliderHeight;
        let sliderTop = (maxSliderTop * this._scrollPosition) / 100;
        this._sliderRect.y(Math.max(0, Math.min(sliderTop, maxSliderTop)));
    }
    
    attachEventListeners(): void {
        this._rect.on('wheel', (event: Event) => this.onMouseWheel(event as WheelEvent));
        this._sliderRect.on('mousedown', (event: Event) => this.startDrag(event as MouseEvent));
        window.addEventListener('mousemove', (event) => this.onDrag(event as MouseEvent));
        window.addEventListener('mouseup', () => this.endDrag());
    }

    onMouseWheel(event: WheelEvent): void {
        let delta = event.deltaY < 0 ? -5 : 5;
        this.updateScrollPosition(this._scrollPosition + delta);
    }

    startDrag(event: MouseEvent): void {
        this._isDragging = true;
        this._startY = event.clientY;
    }

    onDrag(event: MouseEvent): void {
        if (!this._isDragging) return;
        let deltaY = event.clientY - this._startY;
        this._startY = event.clientY;
        let movementPercentage = deltaY / this.height * 100;
        this.updateScrollPosition(this._scrollPosition + movementPercentage);
    }

    endDrag(): void {
        this._isDragging = false;
    }

    setWidth(newWidth: number): void {
        this.width = newWidth;
        this._rect.width(this.width);
        this._contentRect.width(this.width - 20);
        this.updateScrollPosition(this._scrollPosition);
    }

    setHeight(newHeight: number): void {
        this.height = newHeight;
        this._rect.height(this.height);
        this._sliderRect.height(this.height / 4);
        this.updateScrollPosition(this._scrollPosition);
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

export { Scrollbar };
