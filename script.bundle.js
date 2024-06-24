document.addEventListener("DOMContentLoaded", () => {
  setupPopupEvents();
  setupQuiz();
});

function setupPopupEvents() {
  const loginPopup = document.getElementById("popup-login"),
        loginButton = document.querySelector(".header__login"),
        closeLoginButton = document.getElementById("close-login"),
        
        formPopup = document.getElementById("popup-form"),
        formButton = document.querySelector(".button__form"),
        closeFormButton = document.getElementById("close-login");


  loginButton.addEventListener("click", () => { loginPopup.style.display = "flex"; });
  formButton.addEventListener("click", () => { formPopup.style.display = "flex"; });

  closeLoginButton.addEventListener("click", () => { loginPopup.style.display = "none"; });
  closeFormButton.addEventListener("click", () => { formPopup.style.display = "none"; });


  window.addEventListener("click", (event) => {
    if (event.target === loginPopup) loginPopup.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === formPopup) formPopup.style.display = "none";
  });

}




const quizData = [
  {question:"1. My favourite sport …… tennis.",answers:[{id:"1",value:"a) are",correct:!1},{id:"2",value:"b) is",correct:!0},{id:"3",value:"c) be",correct:!1}]},
  {question:"2. Roberto is Italian. He’s …… Italy",answers:[{id:"4",value:"a) from",correct:!0},{id:"5",value:"b) to",correct:!1},{id:"6",value:"c) at",correct:!1}]},
  {question:"3. …… you help me, please?",answers:[{id:"7",value:"a) Have",correct:!1},{id:"8",value:"b) Do",correct:!1},{id:"9",value:"c) Can",correct:!0}]},
  {question:"4. Kiev is the …… of Ukraine.",answers:[{id:"10",value:"a) country",correct:!1},{id:"11",value:"b) nationality",correct:!1},{id:"12",value:"c) capital",correct:!0}]},
  {question:"5. I leave for work …… quarter past eight.",answers:[{id:"13",value:"a) in",correct:!1},{id:"14",value:"b) at",correct:!0},{id:"15",value:"c) on",correct:!1}]},
  {question:"6. The doctor told me that I …… smoke.",answers:[{id:"16",value:"a) must not",correct:!0},{id:"17",value:"b) won`t",correct:!1},{id:"18",value:"c) doesn`t have",correct:!1}]},
  {question:"7. …… that man in the red hat?",answers:[{id:"19",value:"a) Whose",correct:!1},{id:"20",value:"b) Who",correct:!1},{id:"21",value:"c) Who`s",correct:!0}]},
  {question:"8. Is …… your new car? It’s great!",answers:[{id:"22",value:"a) these",correct:!1},{id:"23",value:"b) that",correct:!0},{id:"24",value:"c) there",correct:!1}]},
  {question:"9. This letter is for Tom. Give it to …… ",answers:[{id:"25",value:"a) him",correct:!0},{id:"26",value:"b) he",correct:!1},{id:"27",value:"c) his",correct:!1}]},
  {question:"10. We …… to school every day.",answers:[{id:"28",value:"a) went",correct:!1},{id:"29",value:"b) goes",correct:!1},{id:"30",value:"c) go",correct:!0}]},
  {question:"11. She often …… fish because it’s good for her.",answers:[{id:"31",value:"a) eats",correct:!0},{id:"32",value:"b) eat",correct:!1},{id:"33",value:"c) eates",correct:!1}]},
  {question:"12. She …… a letter at the moment.",answers:[{id:"34",value:"a) write",correct:!1},{id:"35",value:"b) is writing",correct:!0},{id:"36",value:"c) writes",correct:!1}]},
  {question:"13. What …… on Saturdays?",answers:[{id:"37",value:"a) are you doing",correct:!1},{id:"38",value:"b) do you",correct:!1},{id:"39",value:"c) do you do",correct:!0}]},
  {question:"14. Look at Jane! She …… a red dress today!",answers:[{id:"40",value:"a) wearing",correct:!1},{id:"41",value:"b) is wearing",correct:!0},{id:"42",value:"c) is wear",correct:!1}]},
  {question:"15. Yesterday we …… to the cinema and saw a great film.",answers:[{id:"43",value:"a) go",correct:!1},{id:"44",value:"b) gone have",correct:!1},{id:"45",value:"c) went",correct:!0}]},
  {question:"16. When …… Rome? Last summer or last winter?",answers:[{id:"46",value:"a) did you visit",correct:!0},{id:"47",value:"b) are you visiting",correct:!1},{id:"48",value:"c) do you visit",correct:!1}]},
  {question:"17. London is …… than New York.",answers:[{id:"49",value:"a) noisiest",correct:!1},{id:"50",value:"b) noisy",correct:!1},{id:"51",value:"c) noisier",correct:!0}]},
  {question:"18. Paris is the …… city I’ve ever seen.",answers:[{id:"52",value:"a) beautiful",correct:!1},{id:"53",value:"b) more beautiful",correct:!1},{id:"54",value:"c) most beautiful",correct:!0}]},
  {question:"19. …… your homework yet?",answers:[{id:"55",value:"a) Do you finish",correct:!1},{id:"56",value:"b) Have you finished",correct:!0},{id:"57",value:"c) Are you finishing",correct:!1}]},
  {question:"20. …… you help me with my project, please?",answers:[{id:"58",value:"a) Will",correct:!0},{id:"59",value:"b) Do",correct:!1},{id:"60",value:"c) Are",correct:!1}]}
];

let userAnswers = {};

function setupQuiz() {
  const quizElement = document.getElementById("quiz"),
        questionsElement = document.getElementById("questions"),
        indicatorElement = document.getElementById("indicator"),
        resultsElement = document.getElementById("results"),
        nextButton = document.getElementById("button-next"),
        formButton = document.getElementById("button-form"),
        messageElement = document.getElementById("message"),
        messageContentElement = document.getElementById("message-content"),
        testBodyElement = document.getElementById("test-body");

  quizElement.addEventListener("click", (event) => handleQuizClick(event, questionsElement, indicatorElement, resultsElement, nextButton, formButton, messageElement, messageContentElement, testBodyElement));

  displayQuestion(0, questionsElement);
}

function handleQuizClick(event, questionsElement, indicatorElement, resultsElement, nextButton, formButton, messageElement, messageContentElement, testBodyElement) {
  if (event.target.classList.contains("button__answer")) {
    const currentStep = questionsElement.dataset.currentStep;
    userAnswers[currentStep] = event.target.dataset.id;
    document.querySelectorAll(".button__answer").forEach((button) => button.classList.remove("selected"));
    event.target.classList.add("selected");
    nextButton.disabled = false;
  }

  if (event.target.classList.contains("button__next")) {
    const nextStep = Number(questionsElement.dataset.currentStep) + 1;
    if (quizData.length === nextStep) {
      showResults(questionsElement, indicatorElement, resultsElement, nextButton, formButton, messageElement, messageContentElement, testBodyElement);
    } else {
      displayQuestion(nextStep, questionsElement);
    }
    nextButton.disabled = true;
  }



  if (event.target.classList.contains("button__restart")) {
    restartQuiz(questionsElement, indicatorElement, resultsElement, nextButton, formButton, messageElement, testBodyElement);
  }

}

function displayQuestion(step, questionsElement) {
  updateIndicator(step + 1);
  questionsElement.dataset.currentStep = step;
  questionsElement.innerHTML = `
    <div class="quiz__questions-body questions-body">
      <div class="questions-body__question">${quizData[step].question}</div >
      <ul class="questions-body__answer">
        ${quizData[step].answers.map((answer) => `
          <li>
            <button class="button__answer" data-id=${answer.id}>${answer.value}</button>
          </li>
        `).join("")}
      </ul>
    </div > `;
}

function showResults(questionsElement, indicatorElement, resultsElement, nextButton, formButton, messageElement, messageContentElement, testBodyElement) {
  questionsElement.classList.add("questions--hidden");
  indicatorElement.classList.add("indicator--hidden");
  resultsElement.classList.add("results--visible");
  nextButton.classList.add("button__next--hidden");


  formButton.classList.add("button__restart--visible");


  let resultsHtml = "";
  quizData.forEach((questionData, questionIndex) => {
    resultsHtml += `
      <div class="quiz__results-body results-body">
        <div class="results-body__question">${questionData.question}</div>
        <ul class="results-body__answer">
          ${questionData.answers.map((answer) => `
            <li class="${getAnswerClass(answer, questionIndex)}">${answer.value}</li>
          `).join("")}
        </ul>
      </div>`;
  });
  resultsElement.innerHTML = resultsHtml;

  const correctAnswersCount = Object.values(userAnswers).filter((answerId, questionIndex) => quizData[questionIndex].answers.find((answer) => answer.id === answerId && answer.correct)).length;

  if (correctAnswersCount === quizData.length) {
    messageContentElement.textContent = "Вітаємо! Ваш рівень англійської: Intermediate. Хочете покращити свої навички? Зареєструйтесь і пройдіть курс вивчення мови! Зареєструйтесь і оберіть інтенсивність курсу, яка підходить вам";
  } else if (correctAnswersCount > quizData.length / 2) {
    messageContentElement.textContent = "Хороший результат! Ваш рівень англійської: Elementary. Пропонуємо підвищити ваш рівень за допомогою нашого курсу. Зареєструйтесь і оберіть інтенсивність курсу, яка підходить вам!";
  } else {
    messageContentElement.textContent = "Ваш рівень англійської: Beginner. Пропонуємо покращити ваші навички за допомогою нашого курсу вивчення мови. Зареєструйтесь і оберіть інтенсивність курсу, яка підходить вам!";
  }

  messageElement.style.display = "block";
  testBodyElement.classList.add("hidden");
}

function getAnswerClass(answer, questionIndex) {
  let answerClass = "";
  if (answer.correct) {
    answerClass = "answer--valid";
  } else if (answer.id === userAnswers[questionIndex]) {
    answerClass = "answer--invalid";
  }
  return answerClass;
}

function updateIndicator(step) {
  const indicatorElement = document.getElementById("indicator");
  indicatorElement.innerHTML = `${step}/${quizData.length}`;
}

