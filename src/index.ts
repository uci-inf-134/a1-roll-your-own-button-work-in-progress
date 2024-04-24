import { Window } from "./core/ui"
import { Button } from "./widgets/button"
import { Listbox } from "./widgets/listbox";
import { Heading } from "./widgets/heading";
import { ProgressBar } from "./widgets/progressbar";
import { Scrollbar } from "./widgets/scrollbar";
import { Textbox } from "./widgets/textbox";

let w = new Window(window.innerHeight - 10, '100%');

let btn = new Button(w);
btn.tabindex = 2;
btn.widthSize = 100;
btn.heightSize = 20;
btn.fontSize = 14;
btn.move(100, 10);

let btnResp = new Heading(w);
btnResp.text = "No one has clicked me yet :(";
btnResp.tabindex = 3;
btnResp.fontSize = 14;
btnResp.move(100, 50);  

let numClicks = 0;
let maxClicks = 500;  

let f = function(event: any) {
    numClicks++;
    btnResp.text = "Clicked! x" + numClicks + "/500";
    let progress = (numClicks / maxClicks) * 100;
    progressBar.updateProgress(progress); 
};
btn.onClick(f);

let progressBar = new ProgressBar(w);  
progressBar.tabindex = 8;   
progressBar.move(100, 76);            

let listboxHeading = new Heading(w);
listboxHeading.tabindex = 4;
listboxHeading.text = "I am currently feeling: Nothing";
listboxHeading.fontSize = 16;
listboxHeading.move(500, 10);

let listbox = new Listbox(w);
listbox.tabindex = 5;
let optionArray = ["Happy :)", "Sad :(", "Neutral :|", "AAAAAAA"];
for (let i = 0; i < optionArray.length; i++) {
    let option = new Button(w);
    let f = function(event: any) {
        listbox.currentSelected = option.label;
        listboxHeading.text = "I am currently feeling: " + option.label;
    }
    option.label = optionArray[i];
    option.onClick(f);
    listbox.addOption(option);
}
listbox.fontSize = 16;
listbox.heightSize = 10;
listbox.widthSize = 250;
listbox.move(500, 30);

let scrollbar = new Scrollbar(w, 20, 300);
scrollbar.tabindex = 6;

let textBoxHeading = new Heading(w);
textBoxHeading.tabindex = 9;
textBoxHeading.text = "This text box says: [ NOTHING ]";
textBoxHeading.fontSize = 14;
textBoxHeading.move(10, 430);

let txt = new Textbox(w);
txt.tabindex = 10;
txt.move(10, 450);
let j = function(event: any) {
    textBoxHeading.text = "This text box says: " + txt.input;
}
txt.onChange(j);