import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"


let w = new Window(window.innerHeight-10,'100%');

let lbl1= new Heading(w);
lbl1.text = "Button Demo";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10,20);

let btn = new Button(w);
btn.tabindex = 2;
btn.fontSize = 14
btn.move(12, 50)

let btnResp = new Heading(w);
btnResp.text = "No one has clicked me yet :(";
btnResp.tabindex = 3;
btnResp.fontSize = 14;
btnResp.move(10,90);

let numClicks = 0;
let f = function(event:any) {
    numClicks++;
    btnResp.text = "Clicked! x" + numClicks;
}
btn.onClick(f);