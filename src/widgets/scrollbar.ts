import { Window, Widget, RoleType } from "../core/ui";
import { Rect, Polygon } from "../core/ui";

class Scrollbar extends Widget {
    private _rect: Rect;
    private _sliderRect: Rect;
    private _upArrow: Polygon;
    private _downArrow: Polygon;
    private _scrollPosition: number = 0;
    private _contentHeight: number;
    private _isDragging: boolean = false;
    private _startY: number = 0;

    private _idleColor: string = "#FFFFFF";
    private _sliderColor: string = "#4682B4";
    private _contentColor: string = "lightgrey";
    private _hoverColor: string = "#A9A9A9"; 
    private _pressedColor: string = "#696969"; 

    constructor(parent: Window, width: number = 20, height: number = 200, contentHeight: number = 1000) {
        super(parent);
        this.width = width;
        this.height = height;
        this._contentHeight = contentHeight;
        this.role = RoleType.scrollbar;
        this.render();
        this.updateScrollPosition(0);
        this.attachEventListeners();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(this.width, this.height).fill(this._idleColor).stroke({ color: 'black', width: 1 });
        this.updateSliderSize();
        this.createArrows();
    }

    updateSliderSize(): void {
        let sliderHeight = Math.max(this.height * (this.height / this._contentHeight), 20);
        this._sliderRect = this._group.rect(this.width, sliderHeight).fill(this._sliderColor).x(0).y(0);
    }

    createArrows(): void {
        this._upArrow = this._group.polygon('0,10 10,0 20,10').fill('#000').move(this.width / 2 - 10, 0);
        this._upArrow.click(() => this.moveSlider(-10));

        this._downArrow = this._group.polygon('0,0 10,10 20,0').fill('#000').move(this.width / 2 - 10, this.height - 10);
        this._downArrow.click(() => this.moveSlider(10));
    }

    moveSlider(amount: number): void {
        let newScrollPosition = this._scrollPosition + amount;
        this.updateScrollPosition(newScrollPosition);
    }

    updateScrollPosition(scrollPosition: number): void {
        this._scrollPosition = Math.max(0, Math.min(scrollPosition, 100));
        let sliderHeight = this._sliderRect.height() as number;
        let maxSliderTop = this.height - sliderHeight;
        let sliderTop = (maxSliderTop * this._scrollPosition) / 100;
        this._sliderRect.y(Math.max(0, Math.min(sliderTop, maxSliderTop)));
    }

    move(x: number, y: number): void {
        this._group.move(x, y);
    }

    setWidth(newWidth: number): void {
        this.width = newWidth;
        this._rect.width(this.width);
        this.updateSliderSize();
    }

    setHeight(newHeight: number): void {
        this.height = newHeight;
        this._rect.height(this.height);
        this.updateSliderSize();
    }

    set contentHeight(newHeight: number) {
        this._contentHeight = newHeight;
        this.updateSliderSize();
    }

    set idleColor(color: string) {
        this._idleColor = color;
        this._rect.fill(color);
    }

    set sliderColor(color: string) {
        this._sliderColor = color;
        this._sliderRect.fill(color);
    }

    set contentColor(color: string) {
        this._contentColor = color;
        this._rect.fill(color);
    }

    attachEventListeners(): void {
        this._sliderRect.on('mousedown', (event: MouseEvent) => this.startDrag(event)); 
        window.addEventListener('mousemove', (event: MouseEvent) => this.onDrag(event)); 
        window.addEventListener('mouseup', (event: MouseEvent) => this.endDrag()); 
    }

    startDrag(event: MouseEvent): void {
        this._isDragging = true;
        this._startY = event.clientY;
        this.pressedState();
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
        this.idleupState();  
    }

    idleupState(): void {
        this._sliderRect.fill(this._sliderColor); 
    }

    idledownState(): void {}

    pressedState(): void {
        this._sliderRect.fill(this._pressedColor);
    }

    pressReleaseState(): void {
        this._sliderRect.fill(this._sliderColor); 
    }

    hoverState(): void {
        this._sliderRect.fill(this._hoverColor);
    }

    hoverPressedState(): void {}

    pressedoutState(): void {}

    moveState(): void {}
    
    keyupState(): void {}
}

export { Scrollbar };
