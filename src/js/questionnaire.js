const questions = [
  {
    question: "Forme de la terre",
    reponses: [
      {
        valeur: "ronde",
        status: true,
      },
      {
        valeur: "plate",
        status: false,
      },
    ],
  },
  {
    question: "Quoi",
    reponses: [
      {
        valeur: "?",
        status: false,
      },
      {
        valeur: "feur",
        status: true,
      },
    ],
  },
];

const quizz = document.getElementById("questions");
questions.forEach((el) => {
  quizz.innerHTML += "<div>";
  quizz.innerHTML += `<h2>${el.question}</h2>`;
  el.reponses.forEach((rep) => {
    quizz.innerHTML += `<button id=${rep.status}>${rep.valeur}</button>`;
  });
  quizz.innerHTML += "</div>";
});

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.id == "true") {
      alert("Bonne reponse");
    } else {
      alert("Mauvaise reponse");
    }
  });
});
