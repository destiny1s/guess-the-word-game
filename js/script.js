//The unordered list where the player’s guessed letters will appear.
const guessedLettersElement = document.querySelector(".guessed-letters");
//The button with the text “Guess!” in it.
const guessLetterButton = document.querySelector(".guess");
//The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter");
//The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display.
const remainingGuessesElement = document.querySelector(".remaining");
//The span inside the paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span");
//The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
//Array that will contain all of the player guesses.
const guessedLetters = [];

//*Write a function to add placeholders for each letter (1)*//
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

//*Add an Event Listener for the Button (1-3)*//
guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    //Grab what was entered in the input
    const guess = letterInput.value;

    letterInput.value = "";
    //Empty message paragraph
    message.innerText = "";

    //Validate Input in the Button Event Handler
    const goodGuess = validateInput(guess);
    console.log(goodGuess);

    if (goodGuess) {
        makeGuess(guess);
    }
});

//*Create a function to check player's input*//
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        //is the input empty?
        message.innerText = "Please enter a letter from A to Z.";
    } else if (input.length > 1) {
        //Did you type more than one letter?
        message.innerText = "Please enter one letter from A to Z.";
    } else if (!input.match(acceptedLetter)) {
        //Did you type a number, special character, or something other than a letter?
        message.innerText = "Please enter one letter from A to Z.";
    } else {
        //We have a single letter
        return input;
    }
};

//*Create a Function to Capture Input*//
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Try again!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};