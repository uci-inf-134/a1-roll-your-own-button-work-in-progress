// importing local code, code we have written
import { Window, Widget, RoleType } from "../core/ui";
import { IdleUpWidgetState, PressedWidgetState } from "../core/ui";
// importing code from SVG.js library
import { Rect, Text, Box, Polygon } from "../core/ui";
import { Button } from "./button";

class Listbox extends Widget {
    private _rect: Rect;
    private _eventrect: Rect;
    private _downarrow: Polygon;
    private _text: Text;
    private _text_x: number;
    private _text_y: number;
    private _optionButtons: Button[] = [];
    private _fontSize: number;
    private _currentSelected: string;
    private _expanded: boolean = false;
    private defaultWidth: number = 300;
    private defaultHeight: number = 40;
    private defaultText: string = "Please choose an option";
    private defaultFontSize: number = 20;

    private _idleColor: string = "#B0C4DE";
    private _hoverColor: string = "#1E90FF";
    private _pressedColor: string = "#4682B4";
    private _idleColor_arrow: string = "#FFFFFF";
    private _hoverColor_arrow: string = "#FFFFFF";
    private _pressedColor_arrow: string = "#DDDDDD";
    private _textColor: string = "#000000";

    private fontFamily:string = 'Helvetica';

    constructor(parent:Window){
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._currentSelected = this.defaultText;
        this._fontSize = this.defaultFontSize;
        // set Aria role
        this.role = RoleType.listbox;
        //TODO:
        // set default state!
        this.setState(new IdleUpWidgetState());
        // render widget
        this.render();
        this.selectable = false;
    }

    // Getters and Setters

    // currentSelected
    get currentSelected() {
        return this._currentSelected;
    }

    set currentSelected(text:string) {
        this._currentSelected = text;
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

    set fill(hex:{ box?:string, hover?:string, pressed?:string, arrow?:string, arrow_hover?:string, arrow_pressed?:string, text?:string }) {
        this._idleColor = hex.box ? hex.box : this._idleColor;
        this._hoverColor = hex.hover ? hex.hover : this._hoverColor;
        this._pressedColor = hex.pressed ? hex.pressed : this._pressedColor;
        this._idleColor_arrow = hex.arrow ? hex.arrow : this._idleColor_arrow;
        this._hoverColor_arrow = hex.arrow_hover ? hex.arrow_hover : this._hoverColor_arrow;
        this._pressedColor_arrow = hex.arrow_pressed ? hex.arrow_pressed : this._pressedColor_arrow;
        this._textColor = hex.text ? hex.text : this._textColor;
        this.idleupState();
        this.update();
    }

    // Helpful Methods

    addOption(option:Button): void {
        this._optionButtons.push(option);
        this.update();
    }

    private positionText() {
        let box: Box = this._text.bbox();
        // in TS, the prepending with + performs a type conversion from string to number
        this._text_y = (+this._rect.y() + ((+this._rect.height() / 2)) - (box.height / 2));
        this._text.x(+this._rect.x() + 4);
        if (this._text_y > 0) {
            this._text.y(this._text_y);
        }
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        // Set the outer svg element 
        this.outerSvg = this._group;

        // Build the initial dropdown menu
        this._rect = this._group.rect(this.width, this.height);
        this._downarrow = this._group.polygon('0,0 8,16 16,0').fill("#FFF").move((this.width - 24), (this.height - 28));
        this._text = this._group.text(this._currentSelected);

        // Add a transparent rect on top of text to prevent selection cursor
        this._eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 0);

        this._rect.fill("#B0C4DE");
        this.backcolor = "silver";
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this._eventrect);
    }

    override update(): void {
        // Update the option buttons
        for (let i:number = 0; i < this._optionButtons.length; i++) {
            let option_y = this._expanded ? +this._rect.y() + (i+1)*this.height : +this._rect.y();
            this._optionButtons[i].move(+this._rect.x(), option_y);
            this._optionButtons[i].heightSize = this.height;
            this._optionButtons[i].cornerRadius = 0;
            this._optionButtons[i].fontSize = this._fontSize;
        }

        // Update the text on the dropdown button
        if (this._text) {
            this._text.font({ size: this._fontSize });
            this._text.text(this._currentSelected).fill(this._textColor);
            this._text.font('family', this.fontFamily);
            let box: Box = this._text.bbox();
            if (box.height > this.height) { this.height = box.height + 10; }
            if (box.width > this.width) { this.width = box.width + 32; }
            for (let i:number = 0; i < this._optionButtons.length; i++) {
                this._optionButtons[i].widthSize = this.width;
            }
            this._eventrect.size(this.width, this.height);
        }

        this._rect.size(this.width, this.height);
        let downarrow_x = +this._rect.x() + this.width - (this._downarrow.width()*2);
        let downarrow_y = +this._rect.y() + (this.height / 2) - (this._downarrow.width() / 2)
        this._downarrow.size(16 * (this.height / this.defaultHeight)).move(downarrow_x, downarrow_y);
        
        this.positionText();
        this._group.front();
        super.update();
    }

    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        this._rect.fill(this._idleColor);
        this._downarrow.fill(this._idleColor_arrow);
    }
    idledownState(): void {
        this.update();
    }
    pressedState(): void {
        this._rect.fill(this._pressedColor);
        this._downarrow.fill(this._pressedColor_arrow);
    }
    pressReleaseState(): void {
        this._expanded = !this._expanded;
        this._downarrow.rotate(180);
        this.update();
        this.hoverState();
    }
    hoverState(): void {
        this._rect.fill(this._hoverColor);
        this._downarrow.fill(this._hoverColor_arrow);
    }
    hoverPressedState(): void {
        // throw new Error("Method not implemented.");
    }
    pressedoutState(): void {
        this._rect.fill(this._idleColor);
        this._downarrow.fill(this._idleColor_arrow);
    }
    moveState(): void {
        // throw new Error("Method not implemented.");
    }
    keyupState(): void {
        // throw new Error("Method not implemented.");
    }
}

export {Listbox}