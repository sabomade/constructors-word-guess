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
    var wordArr = new Word(chosenWord);
    return wordArr;
}

function displayWord(word){
    console.log(word+"");
}

function getUserGuess(word){
    prompt.start();
    prompt.get("Guess", function(err, res){
        if (err) throw err;
        else{
            //decrease guess count
            guesses--;
            console.log(guesses+" guesses left");

            //checks if user guess is in the word, changes value of word
            word.letterGuess(res.Guess);
            //console.log(word);
          
            //checks score
            for (let index = 0; index < word.length; index++) {
                if(res.Guess === word[index].char){
                    correctGuesses++;
                }   
            }
            
            //displays updated word
            displayWord(word);
        }
    });

}

function start(){
    guesses = 12;
    correctGuesses = 0;
    inquirer.prompt({
        name: "option",
        type: "list",
        message: "What would you like to do?",
        choices:["Start a Round of Hangman", "EXIT"]
    }).then(function(answer){
        if(answer.option === "Start a Round of Hangman"){
            currentWord = chooseWord();
            //console.log('currentword:',currentWord);
            displayWord(currentWord);
            if (correctGuesses === currentWord.length){
                return console.log("Congrats!  You Win");
            }else if(guesses <=0 && correctGuesses !== currentWord.length){
                console.log("Better luck next time! Sorry, you lose.");
                start();
            }else{  
                getUserGuess(currentWord);
            }
        }else if(answer.option === "EXIT"){
            process.end(1);
        }
    });
}


// -----------------
// MAIN PROCESS
// -----------------
start();