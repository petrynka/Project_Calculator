
function Calculator(){
    this.methods={
        "+": (a,b) => a+b,
        "-": (a,b) => a-b,
        "*": (a,b) => a*b,
        "/": (a,b) => a/b
    }

    this.calculate = function(str){

        let spliced = str.split(" "),
        a = +spliced[0],
        op = spliced[1],
        b = +spliced[2];

        if(!this.methods[op] || isNaN(a) || isNaN(b)){
            return NaN;
        }

        return this.methods[op](a,b);
    }
}

let calc = new Calculator;

console.log(calc.calculate("10 + 20"));
console.log(calc.calculate("20 - 20"));
console.log(calc.calculate("10 * 10"));
console.log(calc.calculate("100 / 20"));