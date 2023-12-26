let questions = [
    {
        title: 'Inside which HTML element do we put the JavaScript?',
        a1: "<javascript>",
        a2: "<js>",
        a3: "<scripting>",
        a4: "<script>",
        correct: 3 //index based
    },
    {
        title: 'Where is the correct place to insert a JavaScript?',
        a1: "Both the <head> section and the <body> section are correct",
        a2: "The <head> section.",
        a3: "The <body> section.",
        a4: "Nowhere, you should not use JavaScript.",
        correct: 0//index based
    },
    {
        title: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        a1: '<script name="xxx.js">',
        a2: '<script src="xxx.js">',
        a3: '<script href="xxx.js">',
        a4: '<script file="xxx.js">',
        correct: 1//index based
    },
    {
        title: 'How do you write "Hello World" in an alert box?"?',
        a1: 'msg("Hello World");',
        a2: 'alert("Hello World");',
        a3: 'alertBox("Hello World");',
        a4: 'msgBox("Hello World");',
        correct: 1//index based
    },
    {
        title: 'How to write an IF statement in JavaScript?"?',
        a1: 'if i = 5 then',
        a2: 'if i == 5 then',
        a3: 'if (i == 5)',
        a4: 'if i = 5',
        correct: 2//index based
    },
    {
        title: 'How does a FOR loop start?"?',
        a1: 'for i = 1 to 5',
        a2: 'for (i = 0; i <= 5)',
        a3: 'for (i <= 5; i++)',
        a4: 'for (i = 0; i <= 5; i++)',
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