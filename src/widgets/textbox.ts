// importing local code, code we have written
import { Window, Widget, RoleType } from "../core/ui";
import { IdleUpWidgetState, EventArgs } from "../core/ui";
// importing code from SVG.js library
import { Rect, Text, Box } from "../core/ui";

class Textbox extends Widget {
    private _rect: Rect;
    private _cursor: Rect;
    private _textLeft: Text;
    private _textRight: Text;
    private _input: string;
    private _fontSize: number;
    private _text_x: number;
    private _text_y: number;
    private _focused: boolean = false;
    private _cursorPosition: number;
    private defaultWidth: number = 300;
    private defaultHeight: number = 30;
    private defaultText: string = "";
    private defaultFontSize: number = 16;

    private _fillColor: string = "#FFFFFF";
    private _fillColor_focused: string = "#FFFFFF";
    private _strokeColor: string = "#AAAAAA";
    private _strokeColor_focused: string = "#000000";
    private _fontColor: string = "#000000";

    private fontFamily: string = 'Helvetica';

    constructor(parent:Window) {
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;
        this._cursorPosition = this._input.length;
        // set Aria role
        this.role = RoleType.textbox;
        //TODO:
        // set default state!
        this.setState(new IdleUpWidgetState());
        // render widget
        this.render();
    }

    // Getters and Setters

    // input
    get input() {
        return this._input;
    }

    set input(text:string) {
        this._input = text;
        this.update();
    }

    // width and height
    get widthSize() {
        return this.width;
    }

    set widthSize(size:number) {
        this.width = size;
        this.update();
    }

    get heightSize() {
        return this.height;
    }

    set heightSize(size: number) {
        this.height = size;
        this.update();
    }

    // font
    set fontSize(size:number) {
        this._fontSize = size;
        this.update();
    }

    set font(font:string) {
        this.fontFamily = font;
    }

    // colors
    set color(hex:{ fill?:string, fill_focused?:string, stroke?:string, stroke_focused?:string, text?:string }) {
        this._fillColor = hex.fill ? hex.fill : this._fillColor;
        this._fillColor_focused = hex.fill_focused ? hex.fill_focused : this._fillColor_focused;
        this._strokeColor = hex.stroke ? hex.stroke : this._strokeColor;
        this._strokeColor_focused = hex.stroke_focused ? hex.stroke_focused : this._strokeColor_focused;
        this._fontColor = hex.text ? hex.text : this._fontColor;
        this.idleupState();
    }

    // Helpful Methods

    isFull(): boolean {
        let boxLeft = this._textLeft.bbox();
        let boxRight = this._textRight.bbox();
        let rectSize = +this._rect.x() + this.width;
        let textSize = boxLeft.x + boxLeft.width + boxRight.width + +this._cursor.width();
        if (textSize > rectSize) {
            return true;
        }
        return false;
    }

    moveCursor(position:number): void {
        position = position < 0 ? 0 : position;
        position = position > this._input.length ? this._input.length : position;
        this._cursorPosition = position;
    }

    incrementCursor(amount:number = 1) {
        this._cursorPosition += amount;
        if (this._cursorPosition > this._input.length) this._cursorPosition = this._input.length;
        if (this._cursorPosition < 0) this._cursorPosition = 0;
    }

    decrementCursor(amount:number = 1) {
        this._cursorPosition -= amount;
        if (this._cursorPosition > this._input.length) this._cursorPosition = this._input.length;
        if (this._cursorPosition < 0) this._cursorPosition = 0;
    }

    private positionText(): void {
        if (this._textLeft.text() !== "") {
            let box: Box = this._textLeft.bbox();
            // in TS, the prepending with + performs a type conversion from string to number
            this._text_y = (+this._rect.y() + ((+this._rect.height() / 2)) - (box.height / 2));
            this._textLeft.x(+this._rect.x() + 4);
            if (this._text_y > 0) {
                this._textLeft.y(this._text_y);
            }
            this._textRight.move(+this._textLeft.x() + box.width, this._text_y);
            this._cursor.move(+this._textLeft.x() + box.width, +this._rect.y() + 5);
        }
        else if (this._textRight.text() !== "") {
            let box: Box = this._textRight.bbox();
            // in TS, the prepending with + performs a type conversion from string to number
            this._text_y = (+this._rect.y() + ((+this._rect.height() / 2)) - (box.height / 2));
            this._textRight.x(+this._rect.x() + 4);
            if (this._text_y > 0) {
                this._textRight.y(this._text_y);
            }
            this._cursor.move(+this._textRight.x(), +this._rect.y() + ((+this._rect.height() / 2)) - (+this._cursor.height() / 2));
        }
        else {
            this._cursor.move(+this._rect.x() + 4, +this._rect.y() + ((+this._rect.height() / 2)) - (+this._cursor.height() / 2));
        }
    }

    // Event
    onChange(callback: { (event?: any): void }): void {
        this.attach(callback);
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        // Set the outer svg element 
        this.outerSvg = this._group;
        
        this._rect = this._group.rect(this.width, this.height).fill("#FFFFFF").stroke("#000000");
        this._textLeft = this._group.text(this._input.substring(0, this._cursorPosition));
        this._textRight = this._group.text(this._input.substring(this._cursorPosition));
        this._cursor = this._group.rect(1, 20);

        // Add a transparent rect on top of text to prevent selection cursor
        // this._eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 0);

        this.backcolor = "silver";
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    }

    override update(): void {
        if (this._textLeft) {
            this._textLeft.font({ size: this._fontSize });
            this._textLeft.text(this._input.substring(0, this._cursorPosition)).attr("style", "white-space:pre");
            this._textLeft.font('family', this.fontFamily);
        }

        if (this._textRight) {
            this._textRight.font({ size: this._fontSize });
            this._textRight.text(this._input.substring(this._cursorPosition)).attr("style", "white-space:pre");
            this._textRight.font('family', this.fontFamily);
        }

        if (this._focused) {
            this._rect.stroke("#000000");
            this._cursor.opacity(100);
        }
        else {
            this._rect.stroke("#AAAAAA");
            this._cursor.opacity(0);
        }

        let box = this._textLeft.bbox();
        if (box.height > this.height) this.height = box.height + 5;
        this._cursor.height(this._fontSize);

        this._rect.size(this.width, this.height);
        this.positionText();

        if (this.isFull()) {
            this._input = this._input = this._input.substring(0, this._cursorPosition-1) +
                this._input.substring(this._cursorPosition);
            this.decrementCursor();
            this.update();
        }

        super.update();
        this.raise(new EventArgs(this));
    }

    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        this._rect.fill(this._fillColor).stroke(this._strokeColor);
        this.update();
    }
    idledownState(): void {
        this._focused = false;
        this.update();
    }
    pressedState(): void {
        // throw new Error("Method not implemented.");
    }
    pressReleaseState(): void {
        if (this._focused === false) {
            this._cursorPosition = this._input.length;
        }
        this._focused = true;
        this.update();
    }
    hoverState(): void {
        // throw new Error("Method not implemented.");
    }
    hoverPressedState(): void {
        // throw new Error("Method not implemented.");
    }
    pressedoutState(): void {
        // throw new Error("Method not implemented.");
    }
    moveState(): void {
        // throw new Error("Method not implemented.");
    }
    keyupState(keyEvent?: KeyboardEvent): void {
        if (keyEvent && this._focused) {
            if (keyEvent && keyEvent.key === "Backspace") {
                this._input = this._input.substring(0, this._cursorPosition-1) +
                    this._input.substring(this._cursorPosition);
                this.decrementCursor();
            }
            else if (keyEvent && keyEvent.key === "ArrowLeft") {
                this.decrementCursor();
            }
            else if (keyEvent && keyEvent.key === "ArrowRight") {
                this.incrementCursor();
            }
            else if (keyEvent && keyEvent.key === "ArrowUp") {
                this.moveCursor(0);
            }
            else if (keyEvent && keyEvent.key === "ArrowDown") {
                this.moveCursor(this._input.length);
            }
            else if (keyEvent && keyEvent.key.length === 1) {
                this._input = this._input.substring(0, this._cursorPosition) +
                    keyEvent.key + this._input.substring(this._cursorPosition);
                this.incrementCursor();
            }
            this.update();
        }
    }
}

export {Textbox}