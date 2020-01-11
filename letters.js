//Constructor function for creating letters
var Letter = function(char, guessed){
    this.char = char;
    this.guessed = guessed;
}

//function to display letter or _ based on this.guessed
Letter.prototype.display = function(){
    if (this.guessed){
        return this.char+ " ";
    }
    return "_ ";
}    
//update this.guessed to true if user guess is correct
Letter.prototype.guess = function(userGuess){
    if(this.char === userGuess){
        return this.guessed = true;
    }
    //return this.guessed = false;
}

//export Letter consturctor, required in word.js
module.exports = Letter;

//test case - yes this works!
// const d = new Letter("d", false);
// console.log(d);
// console.log(d.display());
// console.log(d.guess("a"));
// console.log(d.guess("d"));
// console.log(d.display());
