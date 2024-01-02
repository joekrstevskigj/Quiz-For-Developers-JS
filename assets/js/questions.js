let questions = [
    {
        title: 'Inside which HTML element do we put the JavaScript?',
        answers: ["<javascript>",
            "<js>",
            "<scripting>",
            "<script>"],
        correct: 3 //index based
    },
    {
        title: 'Where is the correct place to insert a JavaScript?',
        answers: ["Both the <head> section and the <body> section are correct",
            "The <head> section.",
            "The <body> section.",
            "Nowhere, you should not use JavaScript."],
        correct: 0//index based
    },
    {
        title: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        answers: ['<script name="xxx.js">',
            '<script src="xxx.js">',
            '<script href="xxx.js">',
            '<script file="xxx.js">'],
        correct: 1//index based
    },
    {
        title: 'How do you write "Hello World" in an alert box?"?',
        answers: ['msg("Hello World");',
            'alert("Hello World");',
            'alertBox("Hello World");',
            'msgBox("Hello World");'],
        correct: 1//index based
    },
    {
        title: 'How to write an IF statement in JavaScript?"?',
        answers: ['if i = 5 then',
            'if i == 5 then',
            'if (i == 5)',
            'if i = 5'],
        correct: 2//index based
    },
    {
        title: 'How does a FOR loop start?"?',
        answers: ['for i = 1 to 5',
            'for (i = 0; i <= 5)',
            'for (i <= 5; i++)',
            'for (i = 0; i <= 5; i++)'],
        correct: 3//index based
    }
];

//a function that will take any given array, and return a new array
//with it's elements position changed. 
const shuffleArray = (array) => {
    const newArray = array.slice();

    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
    }

    return newArray;
}

//call this function to get a new set of question, randomized for 
//every new call
const getQuestions = () => shuffleArray(questions);