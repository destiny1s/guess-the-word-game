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

let word = "magnolia";
//Array that will contain all of the player guesses.
let guessedLetters = [];
//Global variable for the number of guesses a player can make
let remainingGuesses = 8;

//Add an async function
const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

//*Write a function to add placeholders for each letter (1)*//
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

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


    if (goodGuess) {
        makeGuess(guess);
    }
});

//*Create a function to send a message based on player's input*//
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
        showGuessedLetters();

        updateGuessesRemaining(guess);

        updateWordInProgress(guessedLetters);
    }
};

//*Create a function to show the guessed letters*//
const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";

    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

//*Create a function to update the word in progress*//
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];

    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWon();
};

//*Create a function to count the remaining guesses*//
const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word does not contain the letter ${guess}. Try again!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Letter ${guess} is in the word, good guess!`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

//*Create a Function to Check If the Player Won*//
const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

        startOver();
    }
};

//*Create a function to hide and show elements*//
const startOver = function () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

//*Add a click event to the play again button*//
playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;

    getWord();

    guessLetterButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
});