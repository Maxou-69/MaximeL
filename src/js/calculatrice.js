let currentInput = "";
let previousInput = "";
let operation = "";
const display = document.getElementById("display");

function toggleInterface() {
  const inputSystem = document.getElementById("inputSystem");
  const calculatorStyle = document.getElementById("calculatorStyle");
  const toggleButton = document.getElementById("toggleButton");

  if (inputSystem.classList.contains("hidden")) {
    inputSystem.classList.remove("hidden");
    calculatorStyle.classList.add("hidden");
    toggleButton.innerText = "Switch to Calculator";
  } else {
    inputSystem.classList.add("hidden");
    calculatorStyle.classList.remove("hidden");
    toggleButton.innerText = "Switch to Input System";
  }
}

function appendToDisplay(value) {
  currentInput += value;
  display.value = currentInput;
}

function performOperation(op) {
  if (currentInput === "") return;
  if (previousInput !== "") calculateResult();
  operation = op;
  previousInput = currentInput;
  currentInput = "";
}

function calculateResult() {
  let result;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(curr)) return;
  switch (operation) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    default:
      return;
  }
  currentInput = result;
  operation = "";
  previousInput = "";
  display.value = result;
}

function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operation = "";
  display.value = "";
}

function performCalculation(op) {
  const valeur1 = parseFloat(document.getElementById("valeurA").value);
  const valeur2 = parseFloat(document.getElementById("valeurB").value);
  let result;
  switch (op) {
    case "+":
      result = valeur1 + valeur2;
      break;
    case "-":
      result = valeur1 - valeur2;
      break;
    case "*":
      result = valeur1 * valeur2;
      break;
    default:
      return;
  }
  document.getElementById("resultat").innerText = result;
}
