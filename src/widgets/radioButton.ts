// importing local code, code we have written
import { Polyline } from "@svgdotjs/svg.js";
import {Window, Widget, RoleType, IdleUpWidgetState, Circle} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box} from "../core/ui";

class RadioButton extends Widget{
    private _circ: Circle;
    private _eventrect: Rect;

    private _text: Text;
    private _input: string;
    private _fontsize: number;
    private defaultWidth: number = 20;
    private defaultHeight: number = 20;
    private defaultText: string = "radio button";
    private defaultFontSize: number = 20;
    private _text_x: number;
    private _text_y: number;
    private fontFamily: string = "Helvetica";

    public checked = false;
    private _checkmark: Polyline;

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
        this._circ.attr('width', size);
        this.update();
    }

    set heightSize(size: number) {
        this._circ.attr('height', size);
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
        this.textBox = this._text.bbox();
        // in TS, the prepending with + performs a type conversion from string to number
        this._text_y = (+this._circ.y() + ((+this._circ.height() / 2)) - (this.textBox.height / 2));
        this._text.x(+this._circ.x() + this.width + 4);
        if (this._text_y > 0) {
            this._text.y(this._text_y);
        }
    }

    render(): void {
        // creating checkbox
        this._group = (this.parent as Window).window.group();
        this._circ = this._group.circle(this.width, this.height);
        this._text = this._group.text(this._input);
        this._circ.stroke('#000000'); //outline
        this._circ.fill('#FFFFFF') // white on the inside

        this._checkmark = this._group.polyline('0,0 6,6 12,-8').fill('none').stroke({ width: 3, color: '#000000' });

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
            this._circ.size(this.width, this.height); 
            this._eventrect.size(this.width, this.height);
           

            if(this.checked)
            {
                let checkmarkX = +this._circ.x() + 3;
                let checkmarkY = +this._circ.y() -4;
                this._checkmark.size(16 * (this.height / this.defaultHeight)).move(checkmarkX, checkmarkY);
                this._checkmark.opacity(1);
            }
            else{
                this._checkmark.opacity(0);
            }
        }

        this.positionText();

        if (this._circ != null) {
            this._circ.fill(this.backcolor);
        }
        
        super.update();
    }

    //onClick event
    onClick(callback: {(event?:any): void}):void
    {
        this.attach(callback);
    }
    
    idleupState(): void {
       this._circ.stroke('#000000');
       if(this.checked)
        {
            this._checkmark.stroke({ width: 3, color: '#000000'})
        }
    }
    idledownState(): void {
        this._circ.stroke('#000000')
        if(this.checked)
        {
            this._checkmark.stroke({ width: 3, color: '#000000'})
        }
    }
    pressedState(): void {
        // add check
        if(this.checked)
        {
            this.checked = false;
        }
        else
        {
            this.checked = true;
        }
        
        this._circ.stroke('#ADD8E6');
        this.update();
       
    }
    pressReleaseState(): void {
        this._circ.stroke('#000000')
    } 
    hoverState(): void {
        this._circ.stroke('#ADD8E6')
        if(this.checked)
        {
            this._checkmark.stroke({ width: 3, color: '#ADD8E6'});
        }
    }
    hoverPressedState(): void {
        this._circ.stroke('#ADD8E6')
        if(this.checked)
        {
            this._checkmark.stroke({ width: 3, color: '#ADD8E6'});
        }
    }
    pressedoutState(): void {
        this._circ.stroke('#ADD8E6');
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
        this._circ.stroke('#B0C4DE');
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

export {RadioButton}