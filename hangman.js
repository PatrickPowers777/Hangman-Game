var hangman= {
    word:"",
    wordlist: ["princess", "belle", "ariel", "cinderella"],
    fillWordDiv: function (wordToUse) {
        this.word = "";
        for(var i=0; i<this.wordlist[wordToUse].length; i++)
        {
            this.word += "_ ";
        }
        //we want to write to the word div here
        document.getElementById('word').innerHTML = this.word;
    }
};

console.log (hangman.wordlist[0].length);

//want to create the underscores for our hangman word.
//function fillWordDiv(wordToUse){

hangman.fillWordDiv(1);