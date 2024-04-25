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
    private _listeners: { [event: string]: Function[] } = {};

    constructor(parent: Window, width: number = 20, height: number = 200, contentHeight: number = 1000) {
        super(parent);
        this.width = width;
        this.height = height;
        console.log('Default height and width set');
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
        this._rect.on('click', (event: MouseEvent) => this.jumpToPosition(event));
    }

    updateSliderSize(): void {
        let sliderHeight = Math.max(this.height * (this.height / this._contentHeight), 20);
        this._sliderRect = this._group.rect(this.width, sliderHeight).fill(this._sliderColor).x(0).y(0);
    }

    // requirement 1
    createArrows(): void {
        this._upArrow = this._group.polygon('0,10 10,0 20,10').fill('#000').move(this.width / 2 - 10, 0);
        this._upArrow.click(() => this.moveSlider(-10));
        this._downArrow = this._group.polygon('0,0 10,10 20,0').fill('#000').move(this.width / 2 - 10, this.height - 10);
        this._downArrow.click(() => this.moveSlider(10));
    }

    // requirement 2
    jumpToPosition(event: MouseEvent): void {
        const rect = this._rect.node.getBoundingClientRect();
        const clickPosition = event.clientY - rect.top;
        const sliderHeight = this._sliderRect.height() as number;
        const newPosition = (clickPosition - sliderHeight / 2) / (this.height - sliderHeight) * 100;
        console.log(`Jumped to ${newPosition.toFixed(1)}% by clicking`);
        this.updateScrollPosition(newPosition);
    }

    moveSlider(amount: number): void {
        let newScrollPosition = this._scrollPosition + amount;
        this.updateScrollPosition(newScrollPosition);
    }

    updateScrollPosition(scrollPosition: number): void {
        let oldPosition = this._scrollPosition;
        this._scrollPosition = Math.max(0, Math.min(scrollPosition, 100));
        let sliderHeight = this._sliderRect.height() as number;
        let maxSliderTop = this.height - sliderHeight;
        let sliderTop = (maxSliderTop * this._scrollPosition) / 100;
        this._sliderRect.y(Math.max(0, Math.min(sliderTop, maxSliderTop)));
        let direction = this._scrollPosition > oldPosition ? 'down' : 'up';
        // requirement 5
        console.log(`Scroll position moved from ${oldPosition.toFixed(1)} to ${this._scrollPosition.toFixed(1)}, direction: ${direction}`);
        this.emit('scroll', { position: this._scrollPosition, direction: direction });
    }

    move(x: number, y: number): void {
        this._group.move(x, y);
    }

    setWidth(newWidth: number): void {
        this.width = newWidth;
        this._rect.width(this.width);
        console.log('Set new width of ', this.width);
        this.recreateComponents();
    }

    // requirement 3
    setHeight(newHeight: number): void {
        this.height = newHeight;
        this._rect.height(this.height); 
        console.log(`Set new height of scrollbar to ${this.height}`);
        this.recreateComponents();
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        console.log('Height of SCROLLBAR: ' + this.height);
        return this.height;
    }

    set contentHeight(newHeight: number) {
        this._contentHeight = newHeight;
        this.updateSliderSize();
        console.log(`Content height set to ${newHeight}`);
    }

    get contentHeight(): number {
        return this.contentHeight;
    }

    // requirement 4
    getPosition(): number {
        console.log('SCROLLBAR Retrieved position of ' + this._scrollPosition);
        return this._scrollPosition;
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

    // when dimensions are changed
    recreateComponents(): void {
        this._sliderRect.remove();
        this._upArrow.remove();
        this._downArrow.remove();
        this._rect.off();  
        this._rect.on('click', (event: MouseEvent) => this.jumpToPosition(event)); 
        this.updateSliderSize();
        this.createArrows();
        this.attachSliderEventListeners();

        console.log(`Scrollbar components recreated due to dimension changes.`);
    }

    attachSliderEventListeners(): void {
        this._sliderRect.on('mousedown', (event: MouseEvent) => this.startDrag(event));
    }

    attachEventListeners(): void {
        this.attachSliderEventListeners();
        window.addEventListener('mousemove', (event: MouseEvent) => this.onDrag(event));
        window.addEventListener('mouseup', (event: MouseEvent) => this.endDrag());
    }

    startDrag(event: MouseEvent): void {
        this._isDragging = true;
        this._startY = event.clientY;
        this.pressedState();
        console.log(`Started dragging at position: ${this._startY}`);
    }

    onDrag(event: MouseEvent): void {
        if (!this._isDragging) return;
        let deltaY = event.clientY - this._startY;
        this._startY = event.clientY;
        let movementPercentage = deltaY / this.height * 100;
        this.updateScrollPosition(this._scrollPosition + movementPercentage);
        console.log(`Dragging: moved ${movementPercentage.toFixed(2)}%`);
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

    on(event: string, listener: Function): void {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }
        this._listeners[event].push(listener);
        console.log(`Event listener for ${event}`);
    }

    private emit(event: string, data: any): void {
        if (this._listeners[event]) {
            this._listeners[event].forEach(listener => listener(data));
        }
    }
}

export { Scrollbar };
