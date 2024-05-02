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

import { Checkbox } from "./widgets/checkbox";
import { RadioButtonHandler } from "./widgets/radioButtonHandler";
import { SingleRadioButton } from "./widgets/singleRadioButton";


let w = new Window(window.innerHeight - 10, '100%');

let title = new Heading(w);
title.text = "Team WORK IN PROGRESS: Toolkit";
title.fontSize = 28;
title.move(100, 30);

// Button Widget
let btn = new Button(w);
btn.tabindex = 2;
btn.widthSize = 100;
btn.heightSize = 20;
btn.fontSize = 14;
btn.move(100, 100);

let btnResp = new Heading(w);
btnResp.text = "No one has clicked me yet :(";
btnResp.tabindex = 3;
btnResp.fontSize = 16;
btnResp.move(100, 140);

let numClicks = 0;
let f = function(event: any) {
    numClicks++;
    btnResp.text = "Clicked! x" + numClicks;
};
btn.onClick(f);

// Progress Bar Widget
let progressBar = new ProgressBar(w, 300, 20);
progressBar.tabindex = 8;
progressBar.move(100, 300);
progressBar.setWidth(400); // req 1
progressBar.increment = 7; // req 2
progressBar.getIncrement(); // req 3
progressBar.incrementProgress(50); // req 4

// activate req 5 & 6 by clicking on these two buttons
let incrementBtn = new Button(w);
incrementBtn.tabindex = 9;
incrementBtn.move(220, 350);
incrementBtn.label = "+";  
incrementBtn.onClick((event: MouseEvent) => {
    progressBar.incrementProgress(progressBar.increment);  
});

let decrementBtn = new Button(w);
decrementBtn.tabindex = 10;
decrementBtn.move(100, 350);
decrementBtn.label = "-";  
decrementBtn.onClick((event: MouseEvent) => {
    progressBar.incrementProgress(-progressBar.increment);  
});

let progressUpdateHeading = new Heading(w);
progressUpdateHeading.tabindex = 10;
progressUpdateHeading.text = "Progress: 0%";
progressUpdateHeading.move(100, 330);

let stateChangeHeading = new Heading(w);
stateChangeHeading.tabindex = 11;
stateChangeHeading.text = "No changes yet.";
stateChangeHeading.move(400, 330);

progressBar.on('progress', (event: { value: number }) => {
    progressUpdateHeading.text = `Progress: ${event.value}%`;
});

progressBar.on('stateChange', (event: { newState: string, details: any }) => {
    stateChangeHeading.text = `${event.newState}`;
});

// Listbox Widget
let listboxHeading = new Heading(w);
listboxHeading.tabindex = 4;
listboxHeading.text = "I am currently feeling: Nothing";
listboxHeading.fontSize = 16;
listboxHeading.move(600, 100);

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
listbox.move(600, 120);

// Scrollbar Widget
let scrollbar = new Scrollbar(w, 20, 300);
scrollbar.setHeight(500); // req 3
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
scrollbarResp.move(22, 450);

// Textbox Widget

let txt = new Textbox(w);
txt.tabindex = 9;
txt.move(600, 300);
let j = function(event: any) {
    textBoxHeading.text = "This text box says: " + txt.input;
}
txt.onChange(j);

let textBoxHeading = new Heading(w);
textBoxHeading.tabindex = 10;
textBoxHeading.text = "This text box says: [ NOTHING ]";
textBoxHeading.fontSize = 14;
textBoxHeading.move(600, 340);

// Checkbox Widget
var checkboxX:number = 100;
var checkboxY = 450;
let checkBox = new Checkbox(w);
checkBox.tabindex = 12;
checkBox.label = "boxy";
checkBox.move(checkboxX, checkboxY);

let chkResp = new Heading(w);
chkResp.text = "Not checked :(";
chkResp.tabindex = 14;
chkResp.fontSize = 14;
chkResp.move(checkboxX - 5, checkboxY + 40);

let checkFunct = function(event: any){
    if (checkBox.isChecked){
        chkResp.text = "Checked! :)";
    }
    else
    {
        chkResp.text = "Not checked :(";
    }
}
checkBox.onClick(checkFunct);

let checkLabel = document.createElement('label');
checkLabel.tabIndex = 14;
checkLabel.textContent = "Change Checkbox Name:";
checkLabel.style.position = 'absolute';
checkLabel.style.left = '108px';
checkLabel.style.top = '530px';  
checkLabel.style.color = 'black';
checkLabel.style.fontSize = '16px';
document.body.appendChild(checkLabel);


let inputCheckLabel = document.createElement('input');
inputCheckLabel.tabIndex = 16;
inputCheckLabel.type = 'text';
inputCheckLabel.style.position = 'absolute';
inputCheckLabel.style.left = '108px';
inputCheckLabel.style.top = '550px';  
inputCheckLabel.style.width = '150px';  
document.body.appendChild(inputCheckLabel);

let checkSubmitButton = document.createElement('button');
checkSubmitButton.tabIndex = 18;
checkSubmitButton.textContent = "Update Checkbox Label";
checkSubmitButton.style.position = 'absolute';
checkSubmitButton.style.left = '108px';
checkSubmitButton.style.top = '580px';  
checkSubmitButton.style.width = '200px';
document.body.appendChild(checkSubmitButton);

checkSubmitButton.addEventListener('click', function() {
    if (inputCheckLabel.value) {
        checkBox.label = inputCheckLabel.value;  
    }
});


// Radio Button Widget
let radio = new RadioButtonHandler(w);
radio.tabindex = 13;
radio.addRadioButton('hallo', w);
radio.move (600, 430);

let radioLabel = document.createElement('label');
radioLabel.textContent = "Change Selected Radio Button Name:";
radioLabel.tabIndex = 15;
radioLabel.style.position = 'absolute';
radioLabel.style.left = '605px';
radioLabel.style.top = '550px';  
radioLabel.style.color = 'black';
radioLabel.style.fontSize = '16px';
document.body.appendChild(radioLabel);

let inputRadioLabel = document.createElement('input');
inputCheckLabel.tabIndex = 17;
inputRadioLabel.type = 'text';
inputRadioLabel.style.position = 'absolute';
inputRadioLabel.style.left = '605px';
inputRadioLabel.style.top = '580px';  
inputRadioLabel.style.width = '150px';  
document.body.appendChild(inputRadioLabel);

let radioSubmitButton = document.createElement('button');
radioSubmitButton.tabIndex = 19;
radioSubmitButton.textContent = "Update Selected Label";
radioSubmitButton.style.position = 'absolute';
radioSubmitButton.style.left = '605px';
radioSubmitButton.style.top = '610px';  
radioSubmitButton.style.width = '200px';
document.body.appendChild(radioSubmitButton);

radioSubmitButton.addEventListener('click', function(){
    if(inputRadioLabel.value){
        radio.selected.label= inputRadioLabel.value;
    }
});

