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
const qToPlay = getQuestions();
let correctAnswer = -1;

//this resets the elements that holds the elements to empty, so it can host next 
//question.
const resetQuesionDisplay = (display) => {
    display.title.textContent = "";

    while (display.choices.firstChild) {
        display.choices.removeChild(display.choices.firstChild);
    }
}

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

    showResultToQuestion(index === correctAnswer);

    displayNextQuestion();
}

//show result of the user choise
const showResultToQuestion = (isCorrect = false) => {
    resultSection.container.classList.toggle("hide");
    resultSection.result.textContent = isCorrect ? "Correct!" : "Wrong!";
    setTimeout(() => resultSection.container.classList.toggle("hide"), 1500);
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
    questionsSection.container.classList.toggle("hide");//hide the question elements
    //show the submiit high score
    document.querySelector("#end-screen").classList.toggle("hide");

    //for submit, we don't need the remove event listener since we are going to new page
    document.querySelector("#submit").addEventListener("click", ()=> {
        //TODO: save initial and result to local storage using stringify
        window.location.href = "./highscores.html";
    });
}

//event handler for starting the game.
const onClickStartButton = (e) => {
    //we don't need the event hanlder anymore, so let's remove it.
    e.currentTarget.removeEventListener("click", onClickStartButton);

    //hide the start screen, so we can show the questions instead.
    document.getElementById("start-screen").classList.toggle("hide");

    //show the section with the questions
    questionsSection.container.classList.toggle("hide");

    displayNextQuestion();
};

const init = () => {
    document.querySelector("#start").addEventListener("click", onClickStartButton);
};

init();