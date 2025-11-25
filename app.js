const questions = {
  grammar: [
    { question: "Choose the correct past tense of 'go'.", options: ["Goed", "Went", "Gone", "Going"], answer: 1 },
    { question: "Which is a correct sentence?", options: ["She go to school.", "She goes to school.", "She going to school.", "She goed to school."], answer: 1 }
  ],
  vocabulary: [
    { question: "What is the synonym of 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], answer: 1 },
    { question: "What is the antonym of 'fast'?", options: ["Quick", "Rapid", "Slow", "Swift"], answer: 2 }
  ],
  reading: [
    { question: "In the sentence 'The cat sat on the mat', what is the subject?", options: ["cat", "sat", "mat", "on"], answer: 0 }
  ]
};

let currentCategory = "";
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

document.getElementById("start-btn").onclick = () => {
  currentCategory = document.getElementById("category").value;
  startQuiz();
};

function startQuiz() {
  document.getElementById("category-select").classList.add("hidden");
  document.getElementById("quiz-area").classList.remove("hidden");
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  loadQuestion();
}

function loadQuestion() {
  const categoryQuestions = currentCategory === "mixed" 
    ? Object.values(questions).flat() 
    : questions[currentCategory];

  if (currentQuestionIndex < categoryQuestions.length) {
    const q = categoryQuestions[currentQuestionIndex];
    document.getElementById("question").innerText = q.question;
    document.getElementById("progress").innerText = `Question ${currentQuestionIndex+1} of ${categoryQuestions.length}`;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.innerText = opt;
      btn.onclick = () => checkAnswer(i, q.answer);
      optionsDiv.appendChild(btn);
    });
  } else {
    showReview();
  }
}

function checkAnswer(selected, correct) {
  const feedback = document.getElementById("feedback");
  if (selected === correct) {
    feedback.innerText = "✅ Correct!";
    feedback.className = "correct";
    score++;
  } else {
    feedback.innerText = "❌ Wrong!";
    feedback.className = "wrong";
  }
  userAnswers.push({ question: document.getElementById("question").innerText, selected, correct });
}

document.getElementById("next-btn").onclick = () => {
  currentQuestionIndex++;
  document.getElementById("feedback").innerText = "";
  loadQuestion();
};

function showReview() {
  document.getElementById("quiz-area").classList.add("hidden");
  document.getElementById("review-area").classList.remove("hidden");
  const reviewList = document.getElementById("review-list");
  reviewList.innerHTML = `<p>Your score: ${score}</p>`;
  userAnswers.forEach((ans, i) => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>Q${i+1}:</strong> ${ans.question}<br>
      Your answer: ${questions[currentCategory === "mixed" ? "grammar" : currentCategory][i].options[ans.selected]}<br>
      Correct answer: ${questions[currentCategory === "mixed" ? "grammar" : currentCategory][i].options[ans.correct]}<br><br>`;
    reviewList.appendChild(div);
  });
}
