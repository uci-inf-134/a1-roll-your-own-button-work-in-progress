import {Window, Widget, RoleType, IdleUpWidgetState, EventArgs, Circle} from "../core/ui";
import {Rect, Text, Box} from "../core/ui";
import { SingleRadioButton } from "./singleRadioButton";

class RadioButtonHandler extends Widget{
    private _rect: Rect;
    private _radioButtons: SingleRadioButton[] = [];
    private _fontSize: number;
    private _defaultWidth: number = 20;
    private _defaultHeight: number = 20;

    private currentSelected: string = 'none';

    constructor(parent: Window)
    {
        super(parent);
        this.height = this._defaultHeight;
        this.width = this._defaultWidth;

        var radio1 = new SingleRadioButton(parent);
        radio1.label = 'default 1';
        radio1.handler = this;
        var radio2 = new SingleRadioButton(parent);
        radio2.label = 'default 2';
        radio2.handler = this;
        
        this.currentSelected = 'default 1'


        this._radioButtons.push(radio1);
        this._radioButtons.push(radio2);

    
        this.role = RoleType.radioButton;

        this.setState(new IdleUpWidgetState());
        this.render();
        this.selectable = false;
    }

    addRadioButton(label: string, parent: Window)
    {
        let newButton = new SingleRadioButton(parent);
        newButton.label = label;
        newButton.handler = this;
        this._radioButtons.push(newButton);
    }
    render(): void 
    {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(this.width, this.height).opacity(0);
        this.outerSvg = this._group;
        for(let i: number = 0; i < this._radioButtons.length; i++)
        {
            let button_y = +this._rect.y() + (i+1)*this.height;
            console.log(button_y)
            this._radioButtons[i].move(+this._rect.x(), button_y);
            this._radioButtons[i].heightSize = this.height;
            this._radioButtons[i].fontSize = this._fontSize;
        }
    }

    override update(): void
    {
        for(let i: number = 0; i < this._radioButtons.length; i++)
            {
                let button_y = +this._rect.y() + (i+1)*this.height;
                this._radioButtons[i].move(+this._rect.x(), button_y);
                this._radioButtons[i].heightSize = this.height;
                this._radioButtons[i].fontSize = this._fontSize;
            }
    }

    public unfillAllExceptSelected(newSelected:string){
        console.log("here");
        this.currentSelected = newSelected;

        for(let i = 0; i < this._radioButtons.length; ++i){
            console.log(this._radioButtons[i].label, this.currentSelected)
            if(this._radioButtons[i].label != this.currentSelected){
                console.log("uncheck", i)
                this._radioButtons[i].uncheck();
            }
        }
    }

    idleupState(): void {
        
    }
    idledownState(): void {
        
    }
    pressedState(): void {
        
    }
    pressReleaseState(): void {
        
    }
    hoverState(): void {
        
    }
    hoverPressedState(): void {
        
    }
    pressedoutState(): void {
        
    }
    moveState(): void {
        
    }
    keyupState(): void {
        
    }

}

export{RadioButtonHandler}