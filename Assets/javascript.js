const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
var timer = 60
var score = 0
let shuffledQuestions, currentQuestionIndex
const finish = document.getElementById('finish')


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})



function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    gameTimer()
}

function gameTimer() {
    var countDown = setInterval(function() {
        timer--;
        document.getElementById("timer").innerText = timer;
        if (timer <= 0 ) {
            clearInterval(countDown);
            nextButton.classList.add('hide');
           
        }  
    }, 1000);
}


function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {

    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
     
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    } else {
        endGame()
        startButton.classList.add('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
        score++
    } else {
        element.classList.add('wrong')
    } 
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')

}






const questions = [
    {
        question: 'what is an ordered list of values?',
        answers: [
            { text: 'boolean', correct: false},
            { text: 'array', correct: true},
            { text: 'this', correct: false},
            { text: 'title', correct: false}
        ]
    },

    {
        question: 'which is NOT part of the 3 fundamentals of coding?',
        answers: [
            { text: 'SQL', correct: true},
            { text: 'html', correct: false},
            { text: 'javascript', correct: false},
            { text: 'css', correct: false}
        ]
    },

    {
        question: 'which describes the structure of a web page?',
        answers: [
            { text: 'javascript', correct: false},
            { text: 'html', correct: true},
            { text: 'css', correct: false},
            { text: 'array', correct: false}
        ]
    },

    {
        question: 'what gives your webpage style?',
        answers: [
            { text: 'web-api', correct: false},
            { text: 'html', correct: false},
            { text: 'addeventlistener', correct: false},
            { text: 'css', correct: true}
        ]
    }
]


