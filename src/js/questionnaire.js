const questionnaire = [
  {
    qlabel: "Quelle est mon secteur d'activité?",
    qid: 1,
    reponses: [
      { rlabel: "La cybersécurité", rid: 1 },
      { rlabel: "La patisserie", rid: 2 },
    ],
  },
  {
    qlabel: "Quel est l'outil de gestion de repo que j'utilise?",
    qid: 2,
    reponses: [
      { rlabel: "Git", rid: 1 },
      { rlabel: "Katia", rid: 2 },
    ],
  },
  {
    qlabel: "Quel est mon éditeur de texte favoris?",
    qid: 3,
    reponses: [
      { rlabel: "Vs Code", rid: 1 },
      { rlabel: "Vim", rid: 2 },
    ],
  },
];

const questionContainer = document.getElementById("question-container");
const messageContainer = document.getElementById("message-container");

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "questionnaire.html") {
    let currentQuestionIndex = 0;
    let reponses = "";

    function displayQuestion(index) {
      const question = questionnaire[index];
      questionContainer.innerHTML = `
      <h2 class="text-xl font-bold mb-4">${question.qlabel}</h2>
      ${question.reponses
        .map(
          (reponse) => `
        <a class="btn w-full bg-blue-500 text-white p-2 rounded mb-2" data-qid="${question.qid}" data-rid="${reponse.rid}">
          ${reponse.rlabel}
        </a>
      `
        )
        .join("")}
    `;
    }

    questionContainer.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        const qid = event.target.getAttribute("data-qid");
        const rid = event.target.getAttribute("data-rid");
        reponses += `A${qid}_${rid}`;

        currentQuestionIndex++;
        if (currentQuestionIndex < questionnaire.length) {
          displayQuestion(currentQuestionIndex);
        } else {
          checkResponses();
        }
      }
    });

    function checkResponses() {
      const pageName = `${reponses}.html`;
      fetch(pageName)
        .then((response) => {
          if (response.ok) {
            window.location.href = pageName;
          } else {
            messageContainer.textContent =
              "Suite à vos réponses, vous ne souhaitez pas être contacté.";
          }
        })
        .catch(() => {
          messageContainer.textContent =
            "Suite à vos réponses, vous ne souhaitez pas être contacté.";
        });
    }

    displayQuestion(currentQuestionIndex);
  }
  document
    .getElementById("brute-force-button")
    .addEventListener("click", () => {
      function bruteForceCheck(
        questionnaire,
        index,
        currentCombination,
        responseString
      ) {
        if (index === questionnaire.length) {
          checkResponsePage(responseString);
          return;
        }

        const question = questionnaire[index];
        for (const reponse of question.reponses) {
          const newCombination = [...currentCombination, reponse];
          const newResponseString =
            responseString + `A${question.qid}_${reponse.rid}`;
          bruteForceCheck(
            questionnaire,
            index + 1,
            newCombination,
            newResponseString
          );
        }
      }

      function checkResponsePage(responseString) {
        const pageName = `${responseString}.html`;
        fetch(pageName)
          .then((response) => {
            if (response.ok) {
              document.getElementById(
                "message-container"
              ).textContent = `Valid combination found: ${responseString}`;
              window.location.href = pageName;
            }
          })
          .catch(() => {});
      }

      bruteForceCheck(questionnaire, 0, [], "");
    });
});
