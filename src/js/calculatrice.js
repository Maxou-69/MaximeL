const buttons = document.querySelectorAll("button");
const result = document.getElementById("resultat");

function buttonClicked(e) {
  let buttonId = e.target.id;
  const valeur1 = document.getElementById("valeurA").value;
  const valeur2 = document.getElementById("valeurB").value;
  if (buttonId == "+") {
    result.innerHTML = parseInt(valeur1) + parseInt(valeur2);
  }
  if (buttonId == "-") {
    result.innerHTML = parseInt(valeur1) - parseInt(valeur2);
  }
  if (buttonId == "*") {
    result.innerHTML = parseInt(valeur1) * parseInt(valeur2);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", buttonClicked);
});
