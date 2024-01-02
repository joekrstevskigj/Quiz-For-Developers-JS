const displayScores = () => {
    //get the element that will hold the scores
    const highscoresDisplay = document.querySelector("#highscores");
    //let's remove scores displayed - if any
    while (highscoresDisplay.firstChild) {
        highscoresDisplay.removeChild(highscoresDisplay.firstChild);
    }

    //get the scores from the local storage
    const scores = JSON.parse(localStorage.getItem("highscoresQuiz")) ?? {};

    //let's get an array of all entries
    const entries = Object.entries(scores);
    //now, let's sort the array by score
    entries.sort((a, b) => b[1] - a[1]);

    //now the scores are ready to be displayed
    entries.forEach(([name, score]) => {
        const entry = document.createElement("li");
        entry.textContent = `${name} - ${score}`;

        highscoresDisplay.appendChild(entry);
    });
};

//START by displaying the scores
displayScores();

//event handler for clear score
document.querySelector("#clear").addEventListener("click", () => {
    localStorage.removeItem("highscoresQuiz");
    //re-render the scores so we can show the user that scores are removed
    displayScores();
});
