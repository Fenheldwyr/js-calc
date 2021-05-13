let calc = {
    acc: 0,
    operand: null,
    operator: '',
    display:'',
}

function parseNum(inputStr) {
    if (inputStr == '') {
        return 0;
    }
    let num = Number(inputStr);
    return (num || "ERROR");
}

function setOperator(operator) {
    if (operator == '+' || operator == '-') {
        if (calc.operator != '') {
            calc.operand = parseNum(calc.display);
        }
        calc.operator = operator;
    }

    calc.display = calc.acc;
}

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

function main(calc) {
    while (calc.acc != "ERROR") {

    }
}

// calc.acc = calculate(calc.acc, calc.operand, calc.operator);
