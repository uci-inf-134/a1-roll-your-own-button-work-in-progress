// importing local code, code we have written
import {Window, Widget, RoleType, IdleUpWidgetState} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box} from "../core/ui";

class Checkbox extends Widget{
    private _rect: Rect;
    private _eventrect: Rect;
    private _text: Text;
    private _input: string;
    private _fontsize: number;
    private defaultWidth: number = 20;
    private defaultHeight: number = 20;
    private defaultText: string = "checkbox";
    private defaultFontSize: number = 20;
    private _text_x: number;
    private _text_y: number;
    private fontFamily: string = "Helvetica";

    public checked = false;

    constructor(parent:Window){
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        // set Aria role
        this.role = RoleType.checkbox;
        //TODO:
        // set default state!
        this.setState(new IdleUpWidgetState());
        this.selectable = false;
        // render widget
        this.render();
    }

    get label():string{
        return this._input;
    }

    set label(label: string){
        this._input = label;
        this.update();
    }

    set fontSize(size: number) {
        this.fontSize = size;
        this.update();
    }

    // custom size set
    set widthSize(size: number) {
        this._rect.attr('width', size);
        this.update();
    }

    set heightSize(size: number) {
        this._rect.attr('height', size);
        this.update();
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
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to prevent selection cursor
        this._group.rect(this.width, this.height).opacity(0).attr('id', 0);

        this._rect.stroke('#000000'); //outline
        this._rect.fill('#FFFFFF') // white on the inside
        
        this.backcolor = "silver";
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.outerSvg);
    }

    override update(): void {
        if (this._text) {
            this._text.font({ size: this._fontsize});
            this._text.text(this._input);
            this._text.font('family', this.fontFamily);
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
    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
       this._rect.stroke('#000000');
    }
    idledownState(): void {
        this._rect.stroke('#000000')
    }
    pressedState(): void {
        // add check
        this.checked = true;
        this._rect.stroke('#ADD8E6');
       
    }
    pressReleaseState(): void {
        this._rect.stroke('#000000')
        throw new Error("Method not implemented.");
    } 
    hoverState(): void {
        this._rect.stroke('#000000')
        if(this.checked)
        {
            //check icon will also change color
        }
    }
    hoverPressedState(): void {
        this._rect.stroke('#ADD8E6');
    }
    pressedoutState(): void {
        throw new Error("Method not implemented.");
    }
    moveState(): void {
        throw new Error("Method not implemented.");
    }
    keyupState(): void {
        throw new Error("Method not implemented.");
    }
}

export {Checkbox}