// Below are all of my variables!
var joinUsEl = document.querySelector("#joinus");
var timerEl = document.querySelector("#timer");
var startQuizBtnEl = document.querySelector(".startquiz");
var quizEl = document.querySelector("#quiz");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var welcomeContainer = document.querySelector(".container");
var startDiv = document.querySelector(".startdiv");
var answerMessage = document.querySelector("#answerMessage");
var inputScoreEl = document.querySelector("#inputScore");
var initialsEl = document.querySelector("#initials");
var submitInitialsBtnEl = document.querySelector("#submitInitials");
var userScoreEl = document.querySelector("#score");
var highScoresEl = document.querySelector("#highScores");
var scoresEl = document.querySelector("#scores");
var goBackBtnEl = document.querySelector("#goBack");
var clearScoresBtnEl = document.querySelector("#clearScores");
var viewHScoresBtnEl = document.querySelector("#viewHScores");
var currentQuestion = 0;
var timeGiven = 60;
var secondsElapsed = 0;
var interval;
var score = 0;

// Timer function below .
function startTimer() {
  timerEl.textContent = timeGiven;
  interval = setInterval(function () {
    timeGiven--;
    timerEl.textContent = timeGiven;
    if (timeGiven <= 0) {
      clearInterval(interval);
      timerEl.textContent = 0;
      // execute end game function
      endGame();
    }
  }, 1000);
}

// Render Question function.
function renderQuestion() {
  questionEl.textContent = questions[currentQuestion].title;
  for (i = 0; i < answersEl.children.length; i++) {
    answersEl.children[i].children[0].textContent = `${i + 1}: ${
      questions[currentQuestion].choices[i]
    }`;
  }
}

// Function to run the next question.
function nextQuestion() {
  console.log("Next question function");
  currentQuestion++;
  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    stopTimer();
    if (timeGiven > 0) score += timeGiven;
    userScoreEl.textContent = score;
    hide(quizEl);
    show(inputScoreEl);
    timerEl.textContent = 0;
  }
}

// Function to check your answer.
function checkAnswer(answer) {
  console.log(answer);
  console.log(answer.id);
  if (
    questions[currentQuestion].answer ==
    questions[currentQuestion].choices[answer.id]
  ) {
    score += 5;
    displayMessage("Correct!");
  } else {
    timeGiven -= 10;
    displayMessage("Incorrect!");
  }
}

// Function to display if you got the question right or wrong.
function displayMessage(string) {
  answerMessage.textContent = string;
  setTimeout(function () {
    answerMessage.textContent = "";
  }, 2000);
}

// Function to render the high scores.
function renderHighScores() {
  scoresEl.innerHTML = "";
  show(highScoresEl);
  highScores = JSON.parse(localStorage.getItem("scores"));
  for (let i = 0; i < highScores.length; i++) {
    let scoreItem = document.createElement("div");
    scoreItem.className += "hS";
    console.log(scoreItem);
    scoreItem.setAttribute("style", "background-color:PaleTurquoise;");
    scoreItem.textContent = `${i + 1}. ${highScores[i].username} - ${
      highScores[i].userScore
    }`;
    scoresEl.appendChild(scoreItem);
  }
}

function reset() {
  timeGiven = 60;
  score = 0;
  secondsElapsed = 0;
  currentQuestion = 0;
}
// Function to show and hide certain elements.
function show(element) {
  element.style.display = "inline";
}
function hide(element) {
  element.style.display = "none";
}

// Submit Initials event listener.
submitInitialsBtnEl.addEventListener("click", function () {
  let initValue = initialsEl.value.trim();
  if (initValue) {
    let userScore = { username: initValue, userScore: score };
    initialsEl.value = "";
    highScores = JSON.parse(localStorage.getItem("scores")) || [];
    highScores.push(userScore);
    localStorage.setItem("scores", JSON.stringify(highScores));
    hide(inputScoreEl);
    renderHighScores();
    reset();
  }
});

// Start quiz event listener.
startQuizBtnEl.addEventListener("click", function () {
  startTimer();
  welcomeContainer.style.display = "none";
  startDiv.style.display = "none";
  // quizEl.style.display = "block";
  quizEl.classList.remove("hide");
  renderQuestion();
  show(quizEl);
});

// Stop timer function call.
function stopTimer() {
  clearInterval(interval);
}

function endGame() {
  show(inputScoreEl);
  hide(quizEl);
}

// pull answers and check answers event listener.
answersEl.addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    console.log(e.target);
    checkAnswer(e.target);
    nextQuestion();
  }
});

// High scores button event listener.
viewHScoresBtnEl.addEventListener("click", function () {
  hide(joinUsEl);
  hide(quizEl);
  hide(inputScoreEl);
  hide(startQuizBtnEl);
  hide(viewHScoresBtnEl);
  renderHighScores();
  stopTimer();
  reset();
});

// Go back and clear highscore button event listener.
goBackBtnEl.addEventListener("click", function () {
  hide(highScoresEl);
  show(joinUsEl);
  show(startQuizBtnEl);
  show(viewHScoresBtnEl);
  startDiv.style.display = "block";
});
clearScoresBtnEl.addEventListener("click", function () {
  highScores = [];
  localStorage.setItem("scores", JSON.stringify(highScores));
  renderHighScores();
});
