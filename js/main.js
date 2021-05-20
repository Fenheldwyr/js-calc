let calc = {
    acc: null, // stores the running total 
    operand: null, // the next number in the calculation
    operator: '', // what operation is to be carried out
    display:'', // a string of digits to be shown on display
    calcDisplay: document.querySelector("#display"), // the actual element that will output to the user
    equalsPressed: false, // tips us off as to whether we need to start a new series of calculations
    isLocked: false, // determines whether further inputs are allowed, e.g. prevent further calculations when user divides by 0
}

// ensure we don't perform arithmetic on strings
function parseNum(inputStr) {
    if (inputStr == '') {
        return 0;
    }
    let num = Number(inputStr);
    // 'return (num || "ERROR")' does not return num when num = 0
    if (typeof(num) === 'number') {
        return num;
    } else {
        return "ERROR";
    }
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
            return "ERROR: division by 0 is undefined!";
        } else {
            return acc / operand;
        }
    }
}

// assigned to operator keys, triggers a calculation
function onOperatorClick(e) {
    // if (calc.isLocked) return;
    const operatorKey = e.target.getAttribute('data-key');
    if (operatorKey == 'AC') {
        clearData(calc);

    } else if ('+-*/'.includes(operatorKey) && !calc.isLocked) {
        // stops calculator from running '=' key logic,
        // where the previous calculation is repeated
        if (calc.equalsPressed) {
            calc.operand = null;
            calc.equalsPressed = false;
            calc.operator = operatorKey;
            return;
        }
        
        // prepare the first input for further calculations
        if (calc.acc === null ) {
            calc.acc = calc.operand;
            // negate the base value if user intends it to be negative
            if (operatorKey == '-') calc.acc = -calc.acc;
            calc.operator = operatorKey;
            displayTotal(calc);
            return;
        }

        calc.acc = calculate(calc.acc, calc.operand, calc.operator);
        // record what calculation we just performed, so pressing '=' lets us 
        // repeat it
        calc.operator = operatorKey;
        displayTotal(calc);

        if (typeof(calc.acc) != "number") {
            calc.isLocked = true;
        }

    } else if (operatorKey == '=' && !calc.isLocked) {
        // nothing to calculate; so don't bother
        if (calc.acc === null ) return;
        // display final result. further presses will repeat the last calculation.
        calc.acc = calculate(calc.acc, calc.operand, calc.operator);
        displayTotal(calc);
        calc.equalsPressed = true;
        
        if (typeof(calc.acc) != "number") {
            calc.isLocked = true;
        }

    } else if (operatorKey == 'DEL' && !calc.isLocked) {
        if (calc.display.length = 0) return;
        calc.display = calc.display.substring(0, calc.display.length - 1);
        calc.calcDisplay.textContent = calc.display;
        calc.operand = parseNum(calc.display);
    }
}

function clearData(calc) {
    calc.acc = null;
    calc.operand = null;
    calc.operator = '';
    calc.display = '';
    calc.calcDisplay.textContent = '';
    calc.equalsPressed = false;
    calc.isLocked = false;
}

function displayTotal(calc) {
    calc.display = "";
    if (typeof(calc.acc) == "number") {
        // prefixing with + drops uneccesary zeroes, which looks better
        calc.calcDisplay.textContent = +calc.acc.toFixed(16);
    } else {
        // displays error message
        calc.calcDisplay.textContent = calc.acc;
    }
}


let numClick = function(e) {
    if (calc.isLocked) return;
    if (calc.equalsPressed) {
        // user entering a new number without pressing an operator first indicates 
        // entirely new calculation is being performed
        clearData(calc);
    }
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

// set up the buttons!
let allNumberButtons = document.querySelectorAll('.number-key');
let allOperatorButtons = document.querySelectorAll('.operator-key');
allNumberButtons.forEach(
    button => button.addEventListener('click', numClick)
    );
allOperatorButtons.forEach(
    button => button.addEventListener('click', onOperatorClick)
    );