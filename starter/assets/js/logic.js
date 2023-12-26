//an object for convinience to hold the references for the questions elements.
const questionsSection = {
    "container" : document.querySelector("#questions"),
    "title" : document.querySelector("#question-title"),
    "choices" : document.querySelector("#choices")
}

const init = () => { 

    const onClickStartButton = (e) => {
        //we don't need the event hanlder anymore, so let's remove it.
        e.currentTarget.removeEventListener("click", onClickStartButton);
        
        //hide the start screen, so we can show the questions instead.
        document.getElementById("start-screen").classList.toggle("hide");
        
        //show the section with the questions
        questionsSection.container.classList.toggle("hide");
        questionsSection.title.textContent = "My First Question";
    };

    document.querySelector("#start").addEventListener("click", onClickStartButton);
};

init();