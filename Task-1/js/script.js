const questions = [
  { question: "What is 3 + 5?", options: ["7", "8", "9", "10"], correct: 1 },
  { question: "What is 12 - 4?", options: ["6", "7", "8", "9"], correct: 2 },
  { question: "What is 6 x 7?", options: ["42", "40", "48", "45"], correct: 0 },
  { question: "What is 9 ÷ 3?", options: ["3", "4", "2", "5"], correct: 0 },
  {
    question: "What is 15 + 10?",
    options: ["20", "25", "30", "35"],
    correct: 1,
  },
  { question: "What is 18 ÷ 2?", options: ["7", "8", "9", "10"], correct: 2 },
  { question: "What is 5 x 5?", options: ["20", "25", "30", "35"], correct: 1 },
  { question: "What is 14 - 6?", options: ["7", "8", "9", "10"], correct: 1 },
  { question: "What is 8 + 6?", options: ["12", "13", "14", "15"], correct: 2 },
  { question: "What is 16 ÷ 4?", options: ["3", "4", "5", "6"], correct: 1 },
];

let queIndex = 0;
let score = 0;
let ans = new Array(questions.length).fill(null);
let count = 11;
let countdown;

const questionsElement = document.querySelector(".question");
const optionsElement = document.querySelector(".options");
const progressBar = document.querySelector(".progress");
const nextBtn = document.getElementById("nextBtn");
const rocket = document.querySelector(".rocket");
const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result");
const scoreElement = document.getElementById("score");
const progressSegments = document.querySelectorAll(".progress-segment");
const dark = document.getElementById("Dark-theme-btn");
const light = document.getElementById("Light-theme-btn");

const timeLeft = document.querySelector(".time-left");
const timeDiv = document.querySelector(".timer-div");

const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/388");

function assignClassToNumbers() {
  const numbers = document.querySelectorAll(".number");
  numbers.forEach((number, i) => {
    number.classList.remove("active", "correct", "incorrect");
    if (i === queIndex) {
      number.classList.add("active");
    } else if (ans[i] !== null) {
      if (ans[i] === questions[i].correct) {
        number.classList.add("correct");
      } else {
        number.classList.add("incorrect");
      }
    }
  });
}

function updateProgressBar() {
  const progressPercentage = (queIndex + 1) * 10;

  if (queIndex < 11) {
    rocket.style.left = `${progressPercentage - 12}%`;
  }

  progressSegments.forEach((segment, index) => {
    if (index < queIndex) {
      if (ans[index] === questions[index].correct) {
        segment.style.backgroundColor = "#28a745";
      } else {
        segment.style.backgroundColor = "#dc3545";
      }
    }
  });
}

function displayQuestion() {
  const question = questions[queIndex];
  questionsElement.textContent = `${queIndex + 1}. ${question.question}`;

  optionsElement.innerHTML = "";
  question.options.forEach((option, i) => {
    const button = document.createElement("div");
    button.className = "option";
    button.textContent = option;
    button.addEventListener("click", () => selectOption(i));
    optionsElement.appendChild(button);
  });

  if (queIndex === questions.length - 1) {
    nextBtn.textContent = "Submit";
  } else {
    nextBtn.textContent = "Next";
  }

  nextBtn.disabled = ans[queIndex] === null;
  updateProgressBar();
  assignClassToNumbers();
}

function selectOption(index) {
  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.classList.remove("selected");
  });
  audio.play();
  options[index].classList.add("selected");
  ans[queIndex] = index;
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  audio.play();
  if (queIndex < questions.length - 1) {
    queIndex++;
    displayQuestion();
    count = 11;
    timerDisplay();
    clearInterval(countdown);
  } else {
    queIndex++;
    updateProgressBar();
    calculateScore();
    assignClassToNumbers();
  }
});

const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

function displayNext() {
  if (ans[queIndex] === null) {
    ans[queIndex] = -1;
  }

  if (queIndex < questions.length - 1) {
    queIndex++;
    displayQuestion();
    count = 11;
    clearInterval(countdown);
    updateProgressBar();
    assignClassToNumbers();
    timerDisplay();
  } else {
    queIndex++;
    updateProgressBar();
    calculateScore();
    assignClassToNumbers();
  }
}

function calculateScore() {
  clearInterval(countdown);
  timeDiv.style.display = "none";

  score = ans.reduce((result, answer, index) => {
    if (answer === questions[index].correct) {
      return result + 1;
    } else {
      return result;
    }
  }, 0);

  questionContainer.style.display = "none";

  const reviewContainer = document.createElement("div");
  reviewContainer.className = "review-container";

  const reviewTitle = document.createElement("h2");
  reviewTitle.textContent = "Quiz Review";
  reviewContainer.appendChild(reviewTitle);

  const scoreDisplay = document.createElement("p");
  if (score === 10) {
    scoreDisplay.textContent = `You got ${score} out of 10 questions correct! - Congratulations! You got a perfect score! 🎉`;
  } else {
    scoreDisplay.textContent = `You got ${score} out of 10 questions correct!`;
  }
  reviewContainer.appendChild(scoreDisplay);

  questions.forEach((q, index) => {
    const questionReview = document.createElement("div");
    questionReview.className = "question-review";

    const questionText = document.createElement("p");
    questionText.className = "question-text";
    questionText.innerHTML = `<strong>Q${index + 1}: ${q.question}</strong>`;
    questionReview.appendChild(questionText);

    const userAnswer = document.createElement("p");
    userAnswer.textContent = `Your Answer: ${
      ans[index] !== -1 ? q.options[ans[index]] : "No answer"
    }`;
    if (ans[index] === q.correct) {
      userAnswer.style.color = "green";
    } else {
      userAnswer.style.color = "red";
    }
    questionReview.appendChild(userAnswer);

    const correctAnswer = document.createElement("p");
    correctAnswer.textContent = `Correct Answer: ${q.options[q.correct]}`;
    correctAnswer.style.color = "blue";
    questionReview.appendChild(correctAnswer);

    reviewContainer.appendChild(questionReview);
  });

  resultContainer.innerHTML = "";
  resultContainer.appendChild(reviewContainer);
  resultContainer.style.display = "block";
}

dark.addEventListener("click", () => {
  audio.play();
  document.documentElement.style.setProperty("--background-colour", "#555555");
});

light.addEventListener("click", () => {
  audio.play();
  document.documentElement.style.setProperty(
    "--background-colour",
    "rgba(255, 255, 255)"
  );
});

displayQuestion();
clearInterval(countdown);

timerDisplay();
