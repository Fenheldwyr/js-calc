let calc = {
    acc: null, // stores the running total 
    operand: null, // the next number in the calculation
    operator: '', // what operation is to be carried out
    display:'', // a string of digits to be shown on display
    calcDisplay: document.querySelector("#display"),
    equalsPressed: false,
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
            return acc / operand;
        }
    }
}

// assigned to operator keys, triggers a calculation
function onOperatorClick(e) {
    const operatorKey = e.target.getAttribute('data-key');
    if (operatorKey == 'AC') {
        clearData(calc);
    } else if (operatorKey != '=') {
        if (calc.equalsPressed) {
            calc.operand = null;
            calc.equalsPressed = false;
            calc.operator = operatorKey;
            return;
        }
        
        if (calc.acc === null) {
            calc.acc = calc.operand;
            if (operatorKey == '-') calc.acc = -calc.acc;
            calc.operator = operatorKey;
            displayTotal(calc);
            return;
        }

        calc.acc = calculate(calc.acc, calc.operand, calc.operator);
        calc.operator = operatorKey;
        displayTotal(calc);
        
    } else if (operatorKey == '=') {
        if (calc.acc === null ) return;
        calc.acc = calculate(calc.acc, calc.operand, calc.operator);
        displayTotal(calc);
        calc.equalsPressed = true;
    }
}

function clearData(calc) {
    calc.acc = null;
    calc.operand = null;
    calc.operator = '';
    calc.display = '';
    calc.calcDisplay.textContent = '';
    calc.equalsPressed = false;
}

function displayTotal(calc) {
    calc.display = "";
    calc.calcDisplay.textContent = calc.acc;
}

let numClick = function(e) {
    // limit number size here to discourage users inputting ridiculously large numbers
    if (calc.display.length <= 8) {
        const num = e.target.getAttribute('data-key');
        // disallow having more than one decimal point in a number
        if (num == '.' && calc.display.includes('.')) return;
        calc.display += num;
    }
    calc.calcDisplay.textContent = calc.display;
    calc.operand = parseNum(calc.display);
}

let allNumberButtons = document.querySelectorAll('.number-key');
let allOperatorButtons = document.querySelectorAll('.operator-key');
allNumberButtons.forEach(
    button => button.addEventListener('click', numClick)
    );
allOperatorButtons.forEach(
    button => button.addEventListener('click', onOperatorClick)
    );