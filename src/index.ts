import { Window } from "./core/ui"
import { Button } from "./widgets/button"
import { Listbox } from "./widgets/listbox";
import { Heading } from "./widgets/heading"
import { Textbox } from "./widgets/textbox";

let w = new Window(window.innerHeight - 10, '100%');

let lbl1 = new Heading(w);
lbl1.text = "Button Demo";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10, 20);

let btn = new Button(w);
btn.tabindex = 2;
btn.widthSize = 100;
btn.heightSize = 20;
btn.fontSize = 14;
btn.move(12, 50);

let inputLabel = document.createElement('label');
inputLabel.textContent = "Change Button Name:";
inputLabel.style.position = 'absolute';
inputLabel.style.left = '12px';
inputLabel.style.top = '95px';  
inputLabel.style.color = 'black';
inputLabel.style.fontSize = '14px';
document.body.appendChild(inputLabel);


let inputElement = document.createElement('input');
inputElement.type = 'text';
inputElement.style.position = 'absolute';
inputElement.style.left = '12px';
inputElement.style.top = '115px';  
inputElement.style.width = '150px';  
document.body.appendChild(inputElement);

let submitButton = document.createElement('button');
submitButton.textContent = "Update Button Label";
submitButton.style.position = 'absolute';
submitButton.style.left = '12px';
submitButton.style.top = '145px';  
submitButton.style.width = '150px';
document.body.appendChild(submitButton);

let btnResp = new Heading(w);
btnResp.text = "No one has clicked me yet :(";
btnResp.tabindex = 3;
btnResp.fontSize = 14;
btnResp.move(10, 180);  

let numClicks = 0;
let f = function(event: any) {
    numClicks++;
    btnResp.text = "Clicked! x" + numClicks;
}
btn.onClick(f);


submitButton.addEventListener('click', function() {
    if (inputElement.value) {
        btn.label = inputElement.value;  
    }
});

let listboxHeading = new Heading(w);
listboxHeading.text = "I am currently feeling: Nothing";
listboxHeading.fontSize = 16;
listboxHeading.move(200, 20);

let listbox = new Listbox(w);
listbox.tabindex = 4;
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
listbox.move(200, 50);

let textBoxHeading = new Heading(w);
textBoxHeading.text = "This text box says: [ NOTHING ]";
textBoxHeading.fontSize = 14;
textBoxHeading.move(10, 230);

let txt = new Textbox(w);
txt.tabindex = 5;
txt.move(10, 250);
let j = function(event: any) {
    textBoxHeading.text = "This text box says: " + txt.input;
}
txt.onChange(j);