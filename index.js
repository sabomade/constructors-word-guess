// -----------------
// VARIABLES
// -----------------
//npm packages
var prompt = require('prompt');
var inquirer = require("inquirer");

// Requiring our Word constructor exported from words.js
var Word = require("./words.js");

//array of secret words to guess
var words = ["bird", "cat", "dog", "hippopotamus", "giraffe", "lion"];
var guesses = 12;

var currentWord;
var wordtoGuess;
var letterstoGuess;
var currentGuess;


// -----------------
// FUNCTIONS
// -----------------
function chooseWord(){
    var chosenWord = words[Math.floor(Math.random() * words.length)];
    chosenWord = chosenWord.split("");
    var wordArr = new Word(chosenWord);
    letterstoGuess = wordArr.word.length;
    return wordArr;
}

function displayWord(){
    wordtoGuess = currentWord.toString()
    console.log(wordtoGuess);
    currentWord.compare = wordtoGuess;
    //console.log("displayWord function")
}

function getUserGuess(){
    //console.log("getUserGuess function" + guesses)
    prompt.start();
    prompt.get("Guess", function(err, res){
        if (err) throw err;
        else{
            if (guesses !== 0){
                //decrease guess count
                guesses--;
            
                //checks if user guess is in the word, changes value word.guessed to true if user guessed correctly
                currentWord.letterGuess(res.Guess);
                wordtoGuess = currentWord.toString();
                //console.log(wordtoGuess);

                //if user has not correctly guessed letter
                if (currentWord.compare === wordtoGuess){
                    console.log("Nope. Try again.", guesses, "guesses remaining");
                    if (guesses === 0){
                        gameOver();
                    }else{
                        displayWord();
                        getUserGuess();
                    }
                }
                //else user guessed correct letter
                else{
                    letterstoGuess--;
                    displayWord();
                    //if all letters guessed
                    if (letterstoGuess === 0){
                        console.log("Congrats you Won!");
                        start();
                    }else{
                        getUserGuess();
                    }
                }
            }
        }
    });

}

function gameOver(){
    console.log("Game Over.");
    start();
}
 

function start(){
    inquirer.prompt({
        name: "option",
        type: "list",
        message: "What would you like to do?",
        choices:["Start a Round of Hangman", "EXIT"]
    }).then(function(answer){
        if(answer.option === "Start a Round of Hangman"){
            guesses = 12;
            currentWord = chooseWord();
            //console.log('currentword:',currentWord);
            displayWord();
            getUserGuess();
        }else if(answer.option === "EXIT"){
            process.exit(128);
        }
    });
}


// -----------------
// MAIN PROCESS
// -----------------
start();