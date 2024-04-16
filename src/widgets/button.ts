// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box} from "../core/ui";

class Button extends Widget{
    private _rect: Rect;
    private _text: Text;
    private _input: string;
    private _fontSize: number;
    private _text_y: number;
    private _text_x: number;
    private defaultText: string= "Button";
    private defaultFontSize: number = 18;
    private defaultWidth: number = 80;
    private defaultHeight: number = 30;

    private fontFamily: string = 'Helvetica';
    private defaultRadius: number = 10;
  

    constructor(parent:Window){
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

    set fontSize(size:number){
        this._fontSize= size;
        this.update();
    }

    get label(): string {
        return this._input;
    }

    set label(value: string) {
        this._input = value;
        this.update();
    }

    
    // custom size set
    set widthSize(size: number)
    {
        this._rect.attr('width',size);
        this.update();
    }

    set heightSize(size:number)
    {
        this._rect.attr('height', size);
        this.update();
    }

    //get custom size
    get widthSize()
    {
        return this.width;
    }
    get heightSize(){
        return this.height;
    }


    private positionText(){
        let box:Box = this._text.bbox();
        // in TS, the prepending with + performs a type conversion from string to number
        this._text_y = (+this._rect.y() + ((+this._rect.height()/2)) - (box.height/2));
        this._text.x(+this._rect.x() + 4);
        if (this._text_y > 0){
            this._text.y(this._text_y);
        }
    }
    
    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(this.width, this.height);
       
        //custom color w/ rounded edges
        this._rect.fill('#ADD8E6');
        this._rect.radius(this.defaultRadius);
       
        //adjusting text
        this._text = this._group.text(this._input);
        this._text.attr('text-length', this.width);
        this._text.attr('text-align', 'center');
        this._text.font('family', this.fontFamily);

        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to 
        // prevent selection cursor and to handle mouse events
        let eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 0);

        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(eventrect);
    }

    override update(): void {
        if(this._text != null)
            this._text.font('size', this._fontSize);
            this._text.text(this._input);
            
            this.positionText();

        if(this._rect != null)
            this._rect.fill(this.backcolor);
        
        super.update();
    }
    
    pressReleaseState(): void{

        if (this.previousState instanceof PressedWidgetState)
            this.raise(new EventArgs(this));
    }

   
    onClick(callback: { (event?: any): void }): void {
        this.attach(callback);
    }

    
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
        console.log("moveState");
    }
    keyupState(keyEvent?: KeyboardEvent): void {
        console.log("keyupState");
    }
}

export {Button}