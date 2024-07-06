const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Who wrote the novel 1984?",
        answers: [
            { text: "George Orwell", correct: true },
            { text: "J.K. Rowling", correct: false },
            { text: "F. Scott Fitzgerald", correct: false },
            { text: "Ernest Hemingway", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const createQuizButton = document.getElementById("create-quiz-btn");
const createQuizModal = document.getElementById("create-quiz-modal");
const saveQuestionButton = document.getElementById("save-question-btn");
const scoreDisplay = document.getElementById("score-display");
const resetButton = document.getElementById("reset-btn"); // Added reset button

let currentQuestionIndex = 0;
let score = 0; // Variable to track score

// Initialize quiz with default questions
startQuiz();

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    resetButton.style.display = 'none'; // Hide reset button initially
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answerButtonElement.innerHTML = ''; // Clear previous answers

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonElement.appendChild(button);
    });

    nextButton.style.display = 'none'; // Hide next button initially
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        selectedButton.style.backgroundColor = 'green';
        score++; // Increment score for correct answer
    } else {
        selectedButton.style.backgroundColor = 'red';
    }
    nextButton.style.display = 'block'; // Show next button after answering
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        // End of quiz logic
        showScore();
        resetButton.style.display = 'block'; // Show reset button
    }
});

function showScore() {
    scoreDisplay.textContent = `Your Score: ${score} out of ${questions.length}`;
    scoreDisplay.style.display = 'block';
}

resetButton.addEventListener('click', () => {
    startQuiz();
    scoreDisplay.style.display = 'none'; // Hide score display on reset
});

createQuizButton.addEventListener('click', () => {
    createQuizModal.style.display = "block";
});

// Close modal
const closeModal = document.querySelector('.close');
closeModal.addEventListener('click', () => {
    createQuizModal.style.display = "none";
});

// Save new question
saveQuestionButton.addEventListener('click', () => {
    const newQuestion = document.getElementById('new-question').value;
    const newAnswer1 = document.getElementById('new-answer1').value;
    const newAnswer2 = document.getElementById('new-answer2').value;
    const newAnswer3 = document.getElementById('new-answer3').value;
    const newAnswer4 = document.getElementById('new-answer4').value;
    const correctAnswerIndex = document.getElementById('correct-answer').value;

    // Create new question object
    const newQuestionObj = {
        question: newQuestion,
        answers: [
            { text: newAnswer1, correct: correctAnswerIndex === '1' },
            { text: newAnswer2, correct: correctAnswerIndex === '2' },
            { text: newAnswer3, correct: correctAnswerIndex === '3' },
            { text: newAnswer4, correct: correctAnswerIndex === '4' }
        ]
    };

    questions.push(newQuestionObj);
    createQuizModal.style.display = "none"; // Close modal
    alert('Question saved to quiz module!');
});