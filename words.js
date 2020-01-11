//requiring our Letter constructor exported from letters.js
var Letter = require("./letters");

//constructor function for creating words
var Word = function(arrOfChar){
    this.word = [];
    this.compare = "";
    arrOfChar.forEach(char => {
        return this.word.push(new Letter(char, false));
    });

}

//function that returns a string of letters or _ representing the word currently being guessed
Word.prototype.toString = function(){
    var word = [];
    for (let index = 0; index < this.word.length; index++) {
        word.push(this.word[index].display());
    }
    return word.join("");
}

//function that call .guess on each letter in the word
Word.prototype.letterGuess = function(userGuess){
    var wordGuess = [];
    for (let index = 0; index < this.word.length; index++) {
        wordGuess.push(this.word[index].guess(userGuess));
    }
    return wordGuess;
}

//export Word constructor, required in index.js
module.exports = Word;

//test case - yes this works!
// const bird = new Word(['b', 'i', 'r', 'd']);
// console.log(bird);
// console.log(bird.toString());
// console.log(bird.letterGuess('a'));
// console.log(bird+"");
// console.log(bird.letterGuess("b"));
// console.log(bird+"");
