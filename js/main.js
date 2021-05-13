let calc = {
    acc: 0, // stores the running total 
    operand: 0, // the next number in the calculation
    operator: '', // what operation is to be carried out
    display:'', // a string of digits to be shown on display
}

// ensure we don't perform arithmetic on strings
function parseNum(inputStr) {
    if (inputStr == '') {
        return 0;
    }
    let num = Number(inputStr);
    return (num || "ERROR");
}

// logic for calculations contained here along with safeguards for dangerous operations, so we don't e.g. divide by 0
function calculate(acc, operand, operator) {
    if (operator == '+') {
        return acc + operand;
    }
    if (operator == '-') {
        return acc - operand;
    }
    if (operator == '*') {
        return acc * operand;
    }
    if (operator == '/') {
        if (operand == 0) {
            return "ERROR";
        } else {
            return acc / operator;
        }
    }
}

// assigned to operator keys, triggers a calculation
function onOperatorClick(e) {
    // main(calc);
    const operatorKey = e.target.getAttribute('data-key');
    calc.operator = operatorKey;
    console.log(calc.operator);
}

function main(calc) {
    // 
    if (calc.display) {
        calc.operand = parseNum(calc.display);
    } else {
        return;
    }
    // user begins calculation with something like "3-"
    if (calc.operator == '') {
        calc.acc = calc.operand;
        return;
    }
    if (calc.operand != "ERROR" && calc.acc != "ERROR") {
        calc.acc = calculate(calc.acc, calc.operand, calc.operator);
    }
}

let numClick = function(e) {
    // limit number size here to discourage users inputting ridiculously large numbers
    if (calc.display.length <= 8) {
        const num = e.target.getAttribute('data-key');
        // disallow having more than one decimal point in a number
        if (num == '.' && calc.display.includes('.')) return;
        calc.display += num;
    }
    console.log(calc.display);
}

let allNumberButtons = document.querySelectorAll('.number-key');
let allOperatorButtons = document.querySelectorAll('.operator-key');
allNumberButtons.forEach(
    button => button.addEventListener('click', numClick)
    );
allOperatorButtons.forEach(
    button => button.addEventListener('click', onOperatorClick)
    );