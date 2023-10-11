  // Quiz questions and answers
  const quizData = [
    {
        question: "Question 1: Who started a fire in the office?",
        options: ["Toby", "Jim", "Ryan", "Pam"],
        answer: "Ryan"
    },
    {
        question: "Question 2: What is the name of Angelas favorite cat?",
        options: ["Puffy", "Sprinkles", "Saweetie", "Twinkie"],
        answer: "Sprinkles"
    },
    {
        question: "Question 3: Who is 'Big Tuna'?",
        options: ["Jim", "Creed", "Andy", "Kelly"],
        answer: "Kelly"
    },
    {
        question: "Question 4: What is Pams favorite flavor of yougurt?",
        options: ["Vanilla", "Peach", "Mixed Berry", "Chocolate"],
        answer: "Mixed Berry"
    }
];

let currentQuestion = 0;
let score = 0;
let countdown = 60;
const countdownDisplay = document.getElementById("countdown");

// Function to load the next question
function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const currentQuizData = quizData[currentQuestion];

    questionElement.innerText = currentQuizData.question;
    optionsElement.innerHTML = "";

    currentQuizData.options.forEach((option, index) => {
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = "option" + (index + 1);
        input.id = "option" + (index + 1);
        const label = document.createElement("label");
        label.htmlFor = "option" + (index + 1);
        label.textContent = option;
        optionsElement.appendChild(input);
        optionsElement.appendChild(label);
        optionsElement.appendChild(document.createElement("br"));
    });
}

// Function to start the timer
function startTimer() {
    const timer = setInterval(() => {
        countdown--;
        countdownDisplay.textContent = countdown + " seconds";
        if (countdown <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

// Function to end the quiz
function endQuiz() {
    document.getElementById("quiz").style.display = "none";
    const resultElement = document.getElementById("result");
    resultElement.textContent = "Quiz completed! Your score is: " + score;
}

// Function to check the selected answer
function checkAnswer() {
    const selectedOption = document.querySelector("input[name=answer]:checked");
    if (!selectedOption) return;

    const userAnswer = selectedOption.value;
    const currentQuizData = quizData[currentQuestion];

    if (userAnswer === currentQuizData.answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

// "Submit" button
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", checkAnswer);

// Start the quiz
const startButton = document.getElementById("start");
startButton.addEventListener("click", () => {
    startButton.style.display = "none"; // Hide the start button
    loadQuestion(); // Load the first question
    startTimer(); // Start the timer
});