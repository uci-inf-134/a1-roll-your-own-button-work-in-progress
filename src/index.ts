import { Window } from "./core/ui"
import { Button } from "./widgets/button"
import { Listbox } from "./widgets/listbox";
import { Heading } from "./widgets/heading";
import { ProgressBar } from "./widgets/progressbar";
import { Scrollbar } from "./widgets/scrollbar";

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

// let inputLabel = document.createElement('label');
// inputLabel.textContent = "Change Button Name:";
// inputLabel.style.position = 'absolute';
// inputLabel.style.left = '12px';
// inputLabel.style.top = '95px';  
// inputLabel.style.color = 'black';
// inputLabel.style.fontSize = '14px';
// document.body.appendChild(inputLabel);


// let inputElement = document.createElement('input');
// inputElement.type = 'text';
// inputElement.style.position = 'absolute';
// inputElement.style.left = '12px';
// inputElement.style.top = '115px';  
// inputElement.style.width = '150px';  
// document.body.appendChild(inputElement);

// let submitButton = document.createElement('button');
// submitButton.textContent = "Update Button Label";
// submitButton.style.position = 'absolute';
// submitButton.style.left = '12px';
// submitButton.style.top = '145px';  
// submitButton.style.width = '150px';
// document.body.appendChild(submitButton);

// submitButton.addEventListener('click', function() {
//     if (inputElement.value) {
//         btn.label = inputElement.value;  
//     }
// });

let btnResp = new Heading(w);
btnResp.text = "No one has clicked me yet :(";
btnResp.tabindex = 3;
btnResp.fontSize = 14;
btnResp.move(10, 100);  

let numClicks = 0;
let maxClicks = 500;  

let f = function(event: any) {
    numClicks++;
    btnResp.text = "Clicked! x" + numClicks;
    let progress = (numClicks / maxClicks) * 100;
    progressBar.updateProgress(progress); 
};
btn.onClick(f);

let listboxHeading = new Heading(w);
listboxHeading.text = "I am currently feeling: Nothing";
listboxHeading.fontSize = 16;
listboxHeading.move(500, 20);

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
listbox.move(500, 50);

let scrollbar = new Scrollbar(w, 20, 300);
scrollbar.move(1000, 10);  
scrollbar.render(); 

let progressBarLabel = new Heading(w);
progressBarLabel.text = "Progress Bar:";
progressBarLabel.fontSize = 14;
progressBarLabel.move(10, 120);

let progressBar = new ProgressBar(w);  
progressBar.setWidth(200);  
progressBar.setHeight(20);        
progressBar.move(10, 140);             
progressBar.updateProgress(50); 

