import { Window } from "./core/ui"
import { Button } from "./widgets/button"
import { Listbox } from "./widgets/listbox";
import { Heading } from "./widgets/heading";
import { ProgressBar } from "./widgets/progressbar";
import { Scrollbar } from "./widgets/scrollbar";
import { Textbox } from "./widgets/textbox";

interface ScrollEvent {
    direction: string;
    position: number;
}

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

let f = function(event: any) {
    numClicks++;
    btnResp.text = "Clicked! x" + numClicks + "/500";
};
btn.onClick(f);

let progressBar = new ProgressBar(w, 300, 20);
progressBar.tabindex = 8;
progressBar.move(80, 100);
progressBar.setWidth(400); // req 1
progressBar.increment = 7; // req 2
progressBar.getIncrement(); // req 3
progressBar.incrementProgress(50); // req 4

// activate req 5 & 6 by clicking on these two buttons
let incrementBtn = new Button(w);
incrementBtn.tabindex = 9;
incrementBtn.move(220, 120);
incrementBtn.label = "+";  
incrementBtn.onClick((event: MouseEvent) => {
    progressBar.incrementProgress(progressBar.increment);  
});

let decrementBtn = new Button(w);
decrementBtn.tabindex = 10;
decrementBtn.move(80, 120);
decrementBtn.label = "-";  
decrementBtn.onClick((event: MouseEvent) => {
    progressBar.incrementProgress(-progressBar.increment);  
});

let progressUpdateHeading = new Heading(w);
progressUpdateHeading.tabindex = 10;
progressUpdateHeading.text = "Progress: 0%";
progressUpdateHeading.move(80, 180);

let stateChangeHeading = new Heading(w);
stateChangeHeading.tabindex = 11;
stateChangeHeading.text = "No changes yet.";
stateChangeHeading.move(80, 210);

progressBar.on('progress', (event: { value: number }) => {
    progressUpdateHeading.text = `Progress: ${event.value}%`;
});

progressBar.on('stateChange', (event: { newState: string, details: any }) => {
    stateChangeHeading.text = `${event.newState}`;
});           

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
scrollbar.setHeight(400); // req 3
scrollbar.getPosition(); // req 4
scrollbar.tabindex = 6;
// scroll or click through the scrollbar for req 5
scrollbar.on('scroll', (event: ScrollEvent) => {
    scrollbarResp.text = `Moved ${event.direction} by ${event.position.toFixed(1)}%`;
});


let scrollbarResp = new Heading(w);
scrollbarResp.text = "Scrollbar :]";
scrollbarResp.tabindex = 11;
scrollbarResp.fontSize = 14;
scrollbarResp.move(22, 280);

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