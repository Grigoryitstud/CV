const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll ('.option');

const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question');
const numberOfAllQuestions = document.getElementById('number-of-all-questions');
      

let indexOfQuestion,
    indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0;

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Якога супрацоуника вы шукаеце?',
        options: [
            'Ведае усё',
            "Жадаючы навучыца фронтэнду",
            "Ведае дзе знайсци працу",
            "Вясёлы хлопец проста патрэбны"
        ],
        rightAnswer: 2
    },
    {
        question: "Перашкодзіць вопыт жыцейски кандыдату?",
        options: [
            "Не мы вырвбляем ЁУ пралажэнне",
            "Не разважали аб гэтым",
            "Не перашкодзиць",
            "УГУ-ГАГА"
        ],
        rightAnswer: 3
    },
    {
        question: "Маеце магчымасць павялічваць складанасць задач?",
        options: [
            "Не нам гэта не патрэбна",
            "Кали можаш штосци навошта вучыць иншае",
            "Я не разумею вас",
            "Шукаем тых хто пройдзе з нами вялики шлях"
        ],
        rightAnswer: 4
    },
    {
        question: "У жыцци и працы ёсць праблемы?",
        options: [
            "Не ёсць лишь ситуации",
            "шмат у нас их",
            "Мы не маем силы вырашыць уси ситуации",
            "У вас амаль атрымалася не вывирайце гэты адказ"
        ],
        rightAnswer: 1
    }
];

numberOfAllQuestions.innerHTML = questions.length; // колич. вопросов


const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // номер вапроса
     // мапим ответы
     
     option1.innerHTML = questions[indexOfQuestion].options[0];
     option2.innerHTML = questions[indexOfQuestion].options[1];
     option3.innerHTML = questions[indexOfQuestion].options[2];
     option4.innerHTML = questions[indexOfQuestion].options[3];

     numberOfQuestion.innerHTML = indexOfPage + 1; 
     indexOfPage++;
};

let completedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; //якорь для проверки одинаковых вопросов

    if(indexOfPage == questions.length){
        quizOver()
    } else{
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            })
            if(hitDuplicate) {
                randomQuestion();
            }else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer - 1) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else{
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disableOptions();
}

for(option of optionElements) {
    option.addEventListener('click' , e => checkAnswer(e));
}

const disableOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer - 1) {
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
        })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')){
        alert('chouse the answer!')
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});




