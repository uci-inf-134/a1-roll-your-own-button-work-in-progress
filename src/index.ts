import { Window } from "./core/ui"
import { Button } from "./widgets/button"
import { Heading } from "./widgets/heading"

let w = new Window(window.innerHeight - 10, '100%');

let lbl1 = new Heading(w);
lbl1.text = "Button Demo";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10, 20);

let btn = new Button(w);
btn.tabindex = 2;
btn.fontSize = 14;
btn.move(12, 50);

let inputLabel = document.createElement('label');
inputLabel.textContent = "Change Button Name:";
inputLabel.style.position = 'absolute';
inputLabel.style.left = '20px';
inputLabel.style.top = '105px';  
inputLabel.style.color = 'black';
inputLabel.style.fontSize = '14px';
document.body.appendChild(inputLabel);


let inputElement = document.createElement('input');
inputElement.type = 'text';
inputElement.style.position = 'absolute';
inputElement.style.left = '20px';
inputElement.style.top = '125px';  
inputElement.style.width = '150px';  
document.body.appendChild(inputElement);

let submitButton = document.createElement('button');
submitButton.textContent = "Update Button Label";
submitButton.style.position = 'absolute';
submitButton.style.left = '20px';
submitButton.style.top = '150px';  
submitButton.style.width = '150px';
document.body.appendChild(submitButton);

let btnResp = new Heading(w);
btnResp.text = "No one has clicked me yet :(";
btnResp.tabindex = 3;
btnResp.fontSize = 14;
btnResp.move(8, 180);  

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
