let questions = [];
startQuiz();

const questionElement = document.getElementById("question");
const answerbuttons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const heading = document.getElementById("heading");

let currentQuestionIndex = 0;
let score = 0;

async function startQuiz() {
  await fetch(
    "https://quizapi.io/api/v1/questions?apiKey=ZW9Pyi7H4Blq6t1NftyZJs3r8HRsUMKVYUVSubJL&category=code&limit=10"
  )
    .then((res) => {
      return res.json();
    })
    .then((loadedQuestions) => {
      console.log(loadedQuestions);
      questions = loadedQuestions;
    })
    .catch((err) => {
      console.log(err);
    });
  heading.innerHTML = "Simple Quiz";
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  console.log(questions);
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  console.log(currentQuestion);
  let answers = currentQuestion.answers;
  let correctAnswers = currentQuestion.correct_answers;
  let istrue = [];
  for (const key in correctAnswers) {
    istrue.push(correctAnswers[key]);
  }
  console.log(istrue);
  // console.log(answers);
  console.log(correctAnswers);
  let i = 0;
  for (const answer in answers) {
    if (answers[answer]) {
      var button = document.createElement("button");
      button.innerText = answers[answer];
      console.log(i);
      button.dataset.correct = istrue[i];
      button.addEventListener("click", selectAnswer);
      // console.log(istrue[i]);
      i++;
    }
    button.classList.add("btn");
    answerbuttons.appendChild(button);
  }
}

function resetState() {
  nextButton.style.display = "none";
  while (answerbuttons.firstChild) {
    answerbuttons.removeChild(answerbuttons.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  console.log(selectBtn.dataset.correct);
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerbuttons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();

  heading.innerHTML = "Score";
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
