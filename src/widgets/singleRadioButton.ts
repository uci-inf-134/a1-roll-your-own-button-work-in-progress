// importing local code, code we have written
import {Window, Widget, RoleType, IdleUpWidgetState, EventArgs, Circle} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box} from "../core/ui";
import { RadioButtonHandler } from "./radioButtonHandler";

class SingleRadioButton extends Widget{
    private _circle: Circle;
    private _eventrect: Rect;


    private _text: Text;
    private _input: string;
    private _fontsize: number;
    private defaultWidth: number = 20;
    private defaultHeight: number = 20;

    private defaultText: string = "radioButton";
    private defaultFontSize: number = 20;
    private _text_x: number;
    private _text_y: number;
    private fontFamily: string = "Helvetica";

    public checked = false;
    private _fillMark: Circle;
    
    //colors
    private _defaultBorder:string = '#000000';
    private _defaultFill: string = '#FFFFFF';
    private _defaultHover: string = '#ADD8E6';
    private _handler: RadioButtonHandler;


    private textBox: Box;
    constructor(parent:Window){
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._input = this.defaultText;
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

    set handler(rbh: RadioButtonHandler){
        this._handler = rbh;
    }

    set label(label: string){
        this._input = label;
        this.update();
    }

    set fontSize(size: number) {
        this._fontsize = size;
        this.update();
    }

    // custom size set
    set widthSize(size: number) {
        this._circle.attr('width', size);
        this.update();
    }

    set heightSize(size: number) {
        this._circle.attr('height', size);
        this.update();
    }

    //get custom size
    get widthSize() {
        return this.width;
    }

    get heightSize() {
        return this.height;
    }

    get isChecked()
    {
        return this.checked;
    }

    uncheck(): void
    {
        this.checked = false;
        this.update();
    }

    private positionText() {
        this.textBox = this._text.bbox();
        // in TS, the prepending with + performs a type conversion from string to number
        this._text_y = (+this._circle.y() + ((+this._circle.height() / 2)) - (this.textBox.height / 2));
        this._text.x(+this._circle.x() + this.width + 4);
        if (this._text_y > 0) {
            this._text.y(this._text_y);
        }
    }

    render(): void {
        // creating checkbox
        this._group = (this.parent as Window).window.group();

        this._circle = this._group.circle(this.width, this.height);
        this._text = this._group.text(this._input);
        this._circle.stroke(this._defaultBorder); //outline
        this._circle.fill(this._defaultFill) // white on the inside

        this._fillMark = this._group.circle(this.width - 5, this.height).fill(this._defaultBorder).stroke({ width: 3, color: '#000000' });

        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to prevent selection cursor
        this._eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 0);
        
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this._eventrect);
        

        
    }

    override update(): void {

        if (this._text) {
            this._text.font({ size: this._fontsize});
            this._text.text(this._input);
            this._text.font('family', this.fontFamily);
            this._circle.size(this.width, this.height); 
            this._eventrect.size(this.width, this.height);
           

            if(this.checked)
            {
                let circleX = +this._circle.x() + 5;
                let circleY = +this._circle.y() + 5;
                this._fillMark.size(10* (this.height / this.defaultHeight)).move(circleX, circleY);
                this._fillMark.opacity(1);
            }
            else{
                this._fillMark.opacity(0);
            }
        }

        this.positionText();

        if (this._circle != null) {
            this._circle.fill(this.backcolor);
        }
        
        super.update();
    }

    //onClick event
    onClick(callback: {(event?:any): void}):void
    {
        this.attach(callback);
    }
    
    idleupState(): void {
       this._circle.stroke(this._defaultBorder);
       if(this.checked)
        {
            this._fillMark.stroke({ width: 3, color: this._defaultBorder})
        }
    }
    idledownState(): void {
        this._circle.stroke(this._defaultBorder)
        if(this.checked)
        {
            this._fillMark.stroke({ width: 3, color: this._defaultBorder})
        }
    }
    pressedState(): void {
        
        
        this._circle.fill('#87CEFA');
       
       
    }
    pressReleaseState(): void {
        
        if(this.checked)
        {
            this.checked = false;
            this.raise(new EventArgs((this)));
        }
        else
        {
            this.checked = true;
            if(this._handler){
                console.log("unfill")
                this._handler.unfillAllExceptSelected(this.label);
            }
            this.raise(new EventArgs((this)));
        }
        this.update();
        
       
        this._circle.stroke('#000000')
        this._circle.fill('#FFFFFF');
    } 
    hoverState(): void {
        this._circle.stroke('#ADD8E6')
        if(this.checked)
        {
            this._fillMark.stroke({ width: 3, color: '#ADD8E6'});
        }
    }
    hoverPressedState(): void {
        this._circle.stroke('#ADD8E6')
        if(this.checked)
        {
            this._fillMark.stroke({ width: 3, color: '#ADD8E6'});
        }
    }
    pressedoutState(): void {
        this._circle.stroke('#ADD8E6');
        if(this.checked)
        {
            this.checked = false;
        }
        else
        {
            this.checked = true;
        }
            
    }
    moveState(): void {
        this._circle.stroke('#B0C4DE');
    }
    keyupState(keyEvent?: KeyboardEvent): void {
        if(keyEvent && keyEvent.key == 'Enter')
        {
            this.onClick(()=>{
                console.log("checkbox clicked via keyboard")
            });
        }
    }
}

export {SingleRadioButton}