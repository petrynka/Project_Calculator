let a = "";
let b = "";
let op = "";
let decimalAllowed = true;

const isDigit = ["1","2","3","4","5","6","7","8","9","0","00","."];
const isAction = ["+","-","*","/"];
const MaxDisplayValue = 10;

function updateDisplay(value){
    if (value.length > MaxDisplayValue){
        value = value.slice(0,MaxDisplayValue);
    }
    out.textContent = value;
}

function changePosNeg(num){
    num *= -1;
    return num;
}

const out = document.querySelector(".display");
const body = document.querySelector("body");

const buttons = Array.from(document.querySelectorAll(".btns"));


buttons.forEach(button =>{
    button.addEventListener("click", (e)=>{
        if(e.target.innerText === "AC"){
            a="";
            b="";
            op="";
            out.textContent = "0";
            console.log(a,op,b);
        };
        let key = e.target.innerText;

        if(isDigit.includes(key)){
            if (op === "") { 
                if (a === "0" && key !== "." && key !== "00") {
                    a = key;  
                } else if (a === "0" && key === "00") {
                    return;   
                } else if (a === "" && key === "00") {
                    a = "0";  
                } else {
                    a += key; 
                }
                updateDisplay(a); 
                
                
            } else { 
                if (b === "0" && key !== "." && key !== "00") {
                    b = key;  
                } else if (b === "0" && key === "00") {
                    return;  
                } else if (b === "" && key === "00") {
                    b = "0";  
                } else {
                    b += key;
                }
                updateDisplay(b);
            }
        }else if(isAction.includes(key)){
            if(a !== "" && op !== "" && b !== ""){
                a = calc.calculate(`${a}`+ " " + `${op}` + " " + `${b}`);
                a = Math.round(a*1000000000000)/1000000000000;
                updateDisplay(a);
                op = key;
                b = "";
            } else {
                op = key;
                console.log(a,op,b);
            }
        }else if(e.target.innerText === "="){
            if(a == "" || op == "" || b == ""){
                a = "";
                b = "";
                op = "";
                return out.textContent = "0";
            } else if(a !== "" && op == "/" && b == "0"){
                out.textContent = "ERR"
            }else{
                a = calc.calculate(`${a}`+ " " + `${op}` + " " + `${b}`);
                a = Math.round(a*10000000000)/10000000000;
                updateDisplay(a);
                op = "";
                b = "";
            }
            
        }else if(e.target.innerText == "+/-"){
            if (b !== "" && op !== ""){
                b = changePosNeg(b);
                out.textContent = b;
            } else if (a !== ""){
                a = changePosNeg(a);
                out.textContent = a;
            }
        } else if (e.target.innerText === ".") {
            if (op === "") {  
                if (a !== "" && !a.includes(".")) {
                    a += ".";  
                }
                updateDisplay(a);  
            } else {  
                if (b === "" || b === "0") {  
                    b = "0.";  
                } else if (!b.includes(".")) {  
                    b += ".";  
                }
                updateDisplay(b);  
            }
        } else if(e.target.innerText == "←"){
            if (b !== "" && op !== ""){
                b = b.slice(0,-1);
                out.textContent = b||"0";
            } else if (a !== ""){
                a = a.slice(0,-1);
                out.textContent = a||"0";
            }
        };
    })
});

body.addEventListener("keydown", (event)=>{
    if (event.key == "Backspace"){
        if (b !== "" && op !== ""){
            b = b.slice(0,-1);
            out.textContent = b||"0";
        } else if (a !== ""){
            a = a.slice(0,-1);
            out.textContent = a||"0";
        }
    }
});

body.addEventListener("keypress", (event) => {
    let key = event.key;
    if(isDigit.includes(key)){
        if (op === "") { 
            if (a === "0" && key !== "." && key !== "00") {
                a = key;  
            } else if (a === "0" && key === "00") {
                return;   
            } else if (a === "" && key === "00") {
                a = "0";  
            } else {
                a += key; 
            }
            updateDisplay(a); 
            
            
        } else { 
            if (b === "0" && key !== "." && key !== "00") {
                b = key;  
            } else if (b === "0" && key === "00") {
                return;  
            } else if (b === "" && key === "00") {
                b = "0";  
            } else {
                b += key;
            }
            updateDisplay(b);
        }
    } else if (isAction.includes(key)){
        if(a !== "" && op !== "" && b !== ""){
            a = calc.calculate(`${a}`+ " " + `${op}` + " " + `${b}`);
            a = Math.round(a*1000000000000)/1000000000000;
            updateDisplay(a);
            op = key;
            b = "";
        } else {
            op = key;
            console.log(a,op,b);
        }
    } else if (key === "="){
        if(a == "" || op == "" || b == ""){
            a = "";
            b = "";
            op = "";
            return out.textContent = "0";
        } else if(a !== "" && op == "/" && b == "0"){
            out.textContent = "ERR"
        }else{
            a = calc.calculate(`${a}`+ " " + `${op}` + " " + `${b}`);
            a = Math.round(a*10000000000)/10000000000;
            updateDisplay(a);
            op = "";
            b = "";
        }
    }
});

function Calculator(){
    this.methods={
        "+": (a,b) => a+b,
        "-": (a,b) => a-b,
        "*": (a,b) => a*b,
        "/": (a,b) => a/b
    }

    this.calculate = function(str){

        let spliced = str.split(" ");
        a = +spliced[0];
        op = spliced[1];
        b = +spliced[2];

        if(!this.methods[op] || isNaN(a) || isNaN(b)){
            return NaN;
        }
        

        return this.methods[op](a,b);
    }
}

let calc = new Calculator;

