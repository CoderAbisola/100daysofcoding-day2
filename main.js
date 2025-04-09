let firstValue = null;
let currentOperator = null;
let waitingForSecond = false;
let justCalculated = false;

const display = document.querySelector('#display');

function insertValue(value) {
  if (justCalculated) {
    display.value = value;
    firstValue = null;
    currentOperator = null;
    waitingForSecond = false;
    justCalculated = false;
  } else if (waitingForSecond) {
    display.value = value;
    waitingForSecond = false;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = '';
  firstValue = null;
  currentOperator = null;
  waitingForSecond = false;
  justCalculated = false;

  document.querySelectorAll('.operator').forEach(btn => {
    btn.classList.remove('active');
  });
}

function setOperator(operator) {
  const inputValue = parseFloat(display.value);

  document.querySelectorAll('.operator').forEach(btn => {
    btn.classList.remove('active');
  });

  const clickedBtn = Array.from(document.querySelectorAll('.operator')).find(btn => btn.textContent === operator);
  if (clickedBtn) {
    clickedBtn.classList.add('active');
  }

  if (currentOperator && waitingForSecond) {
    currentOperator = operator;
    return;
  }

  if (firstValue === null) {
    firstValue = inputValue;
  } else if (currentOperator) {
    const result = performCalculation(currentOperator, firstValue, inputValue);
    display.value = String(result);
    firstValue = result;
  }

  currentOperator = operator;
  waitingForSecond = true;
  justCalculated = false;
}

function performCalculation(op, a, b) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Error';
    default: return b;
  }
}

function calculateResult() {
  if (currentOperator === null || waitingForSecond) return;

  const inputValue = parseFloat(display.value);
  const result = performCalculation(currentOperator, firstValue, inputValue);

  display.value = String(result);
  firstValue = result;
  currentOperator = null;
  waitingForSecond = false;
  justCalculated = true;

  document.querySelectorAll('.operator').forEach(btn => {
    btn.classList.remove('active');
  });
}

