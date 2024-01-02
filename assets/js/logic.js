//an object for convinience to hold the references for the questions elements.
const questionsSection = {
    "container": document.querySelector("#questions"),
    "title": document.querySelector("#question-title"),
    "choices": document.querySelector("#choices")
}
//same, for the result elements
const resultSection = {
    "container": document.querySelector("#divResult"),
    "result": document.querySelector("#result")
};
//timer display
const timeDisplay = document.querySelector("#time");
//display final score
const scoreDisplay = document.querySelector("#final-score");

//create sound files
let soundCorrect = new Audio("./assets/sfx/correct.wav");
let soundWrong = new Audio("./assets/sfx/incorrect.wav");

//declare vars to be used troughout
const qToPlay = getQuestions();
let correctAnswer = -1, timeLeft = 0, timerID = 0, score = 0;

//set the timer 10 seconds for each question. There can be different number of questions
//avalible, so this way we are keeping it about the same difficulty per number of questions
timeLeft = 10 * qToPlay.length;

//removes all children from the parent container which hosts the questions,so it can
//be populated with new ones
const resetQuesionDisplay = (display) => {
    display.title.textContent = "";

    while (display.choices.firstChild) {
        display.choices.removeChild(display.choices.firstChild);
    }
}

//adds the question and it's choices
const createChoiceChildren = (parent, choices) => {
    for (let i = 0; i < choices.length; i++) {
        const choice = document.createElement("button");
        choice.dataset.index = i.toString();
        choice.textContent = choices[i];
        choice.addEventListener('click', onClickChoice);

        parent.appendChild(choice);
    }
}

//event handler for answering the question
const onClickChoice = (e) => {
    const index = parseInt(e.currentTarget.dataset.index);

    //showResultToQuestion returns true if the game is not over yet
    //if the time has run out, then no need for next question, already it went to end screen.
    if(showResultToQuestion(index === correctAnswer)) displayNextQuestion();
}

//show result of the user choise
const showResultToQuestion = (isCorrect = false) => {
    resultSection.container.classList.toggle("hide");

    setTimeout(() => resultSection.container.classList.toggle("hide"), 1500);

    if (isCorrect) {
        resultSection.result.textContent = "Correct!"
        score += 10;
        soundCorrect.play();
    } else {
        resultSection.result.textContent = "Wrong!";
        timeLeft -= 10;
        soundWrong.play();
        //give feedback to user right away that the timer goes down
        timeDisplay.textContent = timeLeft.toString();

        if (timeLeft <= 0) {
            timeDisplay.textContent = "0";
            showEndGameScreen();
            return false;
        }
    }
    return true;
}

//get the next question and display it.
const displayNextQuestion = () => {
    const nextQuestion = qToPlay.length > 0 ? qToPlay.pop() : null;

    //if no more questions, then the game is finished
    if (nextQuestion === null) {
        showEndGameScreen();
        return;
    }

    correctAnswer = nextQuestion.correct;
    resetQuesionDisplay(questionsSection);
    questionsSection.title.textContent = nextQuestion.title;
    createChoiceChildren(questionsSection.choices, nextQuestion.answers);
};

//end game, either the timer runs up or questions are finished
const showEndGameScreen = () => {
    clearInterval(timerID); //stop the timer

    //display the score
    scoreDisplay.textContent = score.toString();

    questionsSection.container.classList.toggle("hide");//hide the question elements
    //show the submiit high score
    document.querySelector("#end-screen").classList.toggle("hide");

    //for submit, we don't need the remove event listener since we are going to new page
    document.querySelector("#submit").addEventListener("click", () => {
        //get an instance of the local storage, if exsists, if not create new
        let local = JSON.parse(localStorage.getItem("highscoresQuiz")) ?? {};
        local[document.querySelector("#initials").value.toString()] = score.toString();

        //now, convert back to string so we can save the score and displayed it on the next screen
        localStorage.setItem("highscoresQuiz", JSON.stringify(local));
        window.location.href = "./highscores.html";
    });
}

//it's called every second by setInterval
const timerControl = () => {
    timeLeft--;
    timeDisplay.textContent = timeLeft.toString();
    if (timeLeft <= 0) {
        showEndGameScreen();
    }
}

//event handler for starting the game.
const onClickStartButton = (e) => {
    //we don't need the event hanlder anymore, so let's remove it.
    e.currentTarget.removeEventListener("click", onClickStartButton);

    //hide the start screen, so we can show the questions instead.
    document.getElementById("start-screen").classList.toggle("hide");

    //show the section with the questions
    questionsSection.container.classList.toggle("hide");

    //set the ticking timer for one second, and keep his id so we can stop it when not neede anymore
    timerID = setInterval(timerControl, 1000);

    displayNextQuestion();
};

const init = () => {
    //display current total time
    timeDisplay.textContent = timeLeft.toString();

    document.querySelector("#start").addEventListener("click", onClickStartButton);
};

init();