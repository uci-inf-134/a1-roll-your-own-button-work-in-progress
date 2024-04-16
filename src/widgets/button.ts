// importing local code, code we have written
import { IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import { Window, Widget, RoleType, EventArgs } from "../core/ui";
// importing code from SVG.js library
import { Rect, Text, Box } from "../core/ui";

class Button extends Widget {
    private _rect: Rect;
    private _eventrect: Rect;
    private _text: Text;
    private _input: string;
    private _fontSize: number;
    private _text_x: number;
    private _text_y: number;
    private defaultText: string = "Button";
    private defaultFontSize: number = 20;
    private defaultWidth: number = 100;
    private defaultHeight: number = 40;

    constructor(parent: Window) {
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;
        // set Aria role
        this.role = RoleType.button;
        // render widget
        this.render();
        // set default or starting state
        this.setState(new IdleUpWidgetState());
        // prevent text selection
        this.selectable = false;
    }

    get label(): string {
        return this._input;
    }

    set label(value: string) {
        this._input = value;
        this.update();
    }

    set fontSize(size: number) {
        this._fontSize = size;
        this.update();
    }

    // custom size set
    set widthSize(size: number) {
        this._rect.attr('width', size);
        this.update();
    }

    set heightSize(size: number) {
        this._rect.attr('height', size);
        //this.update();
        this.render();
    }

    //get custom size
    get widthSize() {
        return this.width;
    }

    get heightSize() {
        return this.height;
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
        this._rect = this._group.rect(this.width, this.height).radius(10); // Set radius here for rounded corners
        this._rect.fill("#ADD8E6");
        this._rect.stroke("black");
        this._text = this._group.text(this._input);
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to prevent selection cursor and to handle mouse events
        this._eventrect = this._group.rect(this.width, this.height).opacity(0);
        // register objects that should receive event notifications.
        this.registerEvent(this._eventrect);
    }

    override update(): void {
        if (this._text) {
            this._text.font({ size: this._fontSize });
            this._text.text(this._input);
            let box: Box = this._text.bbox();
            this.width = box.width + 10;
            this._rect.size(this.width, this.height).radius(10); // Ensure the radius is maintained on update
            this._eventrect.size(this.width, this.height);
        }

        this.positionText();

        if (this._rect != null) {
            this._rect.fill(this.backcolor);
        }
        
        super.update();
    }

    pressReleaseState(): void {
        if (this.previousState instanceof PressedWidgetState)
            this.raise(new EventArgs(this));
        this.hoverState();
    }

    //TODO: implement the onClick event using a callback passed as a parameter
    onClick(callback: { (event?: any): void }): void {
        this.attach(callback);
    }

    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        this._rect.fill('#ADD8E6');
    }
    idledownState(): void {
        this._rect.fill('#007BFF');
    }
    pressedState(): void {
        this._rect.fill('#0056B3');
    }
    hoverState(): void {
        this._rect.fill('#87CEFA');
    }
    hoverPressedState(): void {
        this._rect.fill('#4682B4');
    }
    pressedoutState(): void {
        this._rect.fill('#1E90FF');
    }
    moveState(): void {
        this._rect.fill('#B0C4DE');
    }
    keyupState(keyEvent?: KeyboardEvent): void {
        if (keyEvent && keyEvent.key === 'Enter') {
            this.onClick(() => {
                console.log("Button clicked via keyboard");
            });
        }
    }
}

export { Button }