var joinUsEl = document.querySelector("#joinus");
var timerEl = document.querySelector("#timer");
var startQuizBtnEl = document.querySelector(".startquiz");
var quizEl = document.querySelector("#quiz");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var welcomeContainer = document.querySelector(".container");
var startDiv = document.querySelector(".startdiv");
var currentQuestion = 0;
var timeGiven = 100;
var secondsElapsed = 0;
var interval;

// function startTimer() {
//   timerEl.textContent = timeGiven;
//   interval = setInterval(function () {
//     secondsElapsed++;
//     timerEl.textContent = timeGiven - secondsElapsed;
//     if (secondsElapsed >= timeGiven) {
//       currentQ = questions.length;
//       nextQuestion();
//     }
//   }, 1000);
// }
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
startQuizBtnEl.addEventListener("click", function () {
  startTimer();
  welcomeContainer.style.display = "none";
  startDiv.style.display = "none";
  // quizEl.style.display = "block";
  quizEl.classList.remove("hide");
});

//stops timer
function stopTimer() {
  clearInterval(interval);
}

function endGame() {
  console.log("End game function triggered");
}
