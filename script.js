var joinUsEl = document.querySelector("#joinus");
var timerEl = document.querySelector("#timer");
var startQuizBtnEl = document.querySelector(".startquiz");
var quizEl = document.querySelector("#quiz");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var currentQuestion = 0;
var timeGiven = 100;
var secondsElapsed = 0;
var interval;

function startTimer() {
  timerEl.textContent = timeGiven;
  interval = setInterval(function () {
    secondsElapsed++;
    timerEl.textContent = timeGiven - secondsElapsed;
    if (secondsElapsed >= timeGiven) {
      currentQ = questions.length;
      nextQuestion();
    }
  }, 1000);
}
startQuizBtnEl.addEventListener("click", function () {
  startTimer();
});

//stops timer
function stopTimer() {
  clearInterval(interval);
}
