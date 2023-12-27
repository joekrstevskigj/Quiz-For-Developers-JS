//an object for convinience to hold the references for the questions elements.
const questionsSection = {
    "container": document.querySelector("#questions"),
    "title": document.querySelector("#question-title"),
    "choices": document.querySelector("#choices")
}
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

    if(index === correctAnswer)
    {
        //true
        alert("yes");
    }else{
        //guessed wrong
        alert("no!");
    }

    displayNextQuestion();
}

//get the next question and display it.
const displayNextQuestion = () => {
    const nextQuestion = qToPlay.length > 0 ? qToPlay.pop() : null;
    if (nextQuestion === null) {
        //that's it, game's over, show the results
        return;
    }

    correctAnswer = nextQuestion.correct;
    resetQuesionDisplay(questionsSection);
    questionsSection.title.textContent = nextQuestion.title;
    createChoiceChildren(questionsSection.choices, nextQuestion.answers);
};

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