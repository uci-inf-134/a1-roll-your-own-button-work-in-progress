import { Window } from "./core/ui"
import { Button } from "./widgets/button"
import { Checkbox } from "./widgets/checkbox";
import { Heading } from "./widgets/heading"
import { RadioButtonHandler } from "./widgets/radioButtonHandler";
import { SingleRadioButton } from "./widgets/singleRadioButton";

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

let checkBox = new Checkbox(w);
checkBox.tabindex = 4;
checkBox.label = "boxy";
checkBox.move(20, 200);



let chkResp = new Heading(w);
chkResp.text = "Not checked :(";
chkResp.tabindex = 6;
chkResp.fontSize = 14;
chkResp.move(20, 250);

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

let radio = new RadioButtonHandler(w);
radio.addRadioButton('hallo', w);
radio.move (20, 300);


let checkLabel = document.createElement('label');
checkLabel.textContent = "Change Checkbox Name:";
checkLabel.style.position = 'absolute';
checkLabel.style.left = '12px';
checkLabel.style.top = '400px';  
checkLabel.style.color = 'black';
checkLabel.style.fontSize = '14px';
document.body.appendChild(checkLabel);


let inputCheckLabel = document.createElement('input');
inputCheckLabel.type = 'text';
inputCheckLabel.style.position = 'absolute';
inputCheckLabel.style.left = '12px';
inputCheckLabel.style.top = '450px';  
inputCheckLabel.style.width = '150px';  
document.body.appendChild(inputCheckLabel);

let checkSubmitButton = document.createElement('button');
checkSubmitButton.textContent = "Update Checkbox Label";
checkSubmitButton.style.position = 'absolute';
checkSubmitButton.style.left = '12px';
checkSubmitButton.style.top = '500px';  
checkSubmitButton.style.width = '150px';
document.body.appendChild(checkSubmitButton);

checkSubmitButton.addEventListener('click', function() {
    if (inputCheckLabel.value) {
        checkBox.label = inputCheckLabel.value;  
    }
});
