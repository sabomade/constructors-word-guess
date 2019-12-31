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
var correctGuesses = 0;

// -----------------
// FUNCTIONS
// -----------------
function chooseWord(){
    var chosenWord = words[Math.floor(Math.random() * words.length)];
    chosenWord = chosenWord.split("");
    wordArr = new Word(chosenWord);
    return wordArr;
}

function displayWord(word){
    console.log(word+"");
}

function getUserGuess(word){
    if(correctGuesses === word.length){
        //game over - you win
        console.log("Congrats! You've won!");

        //inquire if user would like to play another round?
        start();
    }else if (guesses >0 && correctGuesses !== word.length){
        prompt.start();
        prompt.get(["Guess a Letter:"], function(err, res){
            if (err) throw err;
            else{
                //decrease guess count
                guesses--;

                //checks if user guess is correct (true) or not (false)
                //console.log(word.letterGuess(res));
                let val = word.letterGuess(res);
                
                //variable check if user guess is true or false 
                let isTrue = false;
                val.forEach(letter => {
                    if (letter === true){
                        return isTrue = true;
                    }
                    return isTrue;
                });
                if (isTrue){
                    correctGuesses++;
                    console.log("Congrats! You guessed correctly.");
                    displayWord(word);
                    
                    //prompt new guess from user
                    getUserGuess(word);
                }else{
                    //if false write message to screen
                    console.log("Sorry, try again!");
                    displayWord(word);

                    //prompt new guess from user
                    getUserGuess(word);
                }
            }
        });
    }else if (guesses <=0 && correctGuesses !== word.length) {
        //game over - no more guesses left
        console.log("Sorry you ran out of guesses");

        //inquire if user would like to play another round?
        start();
    }
}

function start(){
    inquirer.prompt({
        name: "option",
        type: "list",
        message: "What would you like to do?",
        choices:["Start a Round of Hangman", "EXIT"]
    }).then(function(answer){
        if(answer.option === "Start a Round of Hangman"){
            currentWord = chooseWord();
            displayWord(currentWord);
            getUserGuess(currentWord);
        }else if(answer.option === "EXIT"){
            process.end(1);
        }
    });
}


// -----------------
// MAIN PROCESS
// -----------------
start();