//GLOBALS
//===================================================================
//Create a variable/array which will hold all words for the game
var wordList = ['apollo', 'jupiter', 'neptune', 'saturn', 'metropolis', 'athens', 
'sparta', 'mars', 'venus', 'krillin'];
var selectedWord = "";
var letters = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

var winCount = 0;
var lossCount = 0;
var guessesLeft = 10;


//FUNCTIONS
//===================================================================

function startGame(){
	selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
	letters = selectedWord.split("");
	numBlanks = letters.length;


	guessesLeft = 10;
	wrongLetters = [];
	blanksAndSuccesses = [];

	for(var i = 0; i<numBlanks; i++){
		blanksAndSuccesses.push("_")
	}

	$("#wordGuess").html(blanksAndSuccesses.join(" "));
	$("#numberLeft").html(guessesLeft);
	$("#numWins").html(winCount);
	$("#numLosses").html(lossCount);
	console.log(selectedWord);
	console.log(letters);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);



}

function checkProcess(letter){

	var isLetterInWord = false;

	for(var i = 0; i<numBlanks; i++){
		if(selectedWord[i] == letter){
			isLetterInWord = true;
		}
	}

	if(isLetterInWord){
		for(var i = 0; i<numBlanks; i++){
		if(selectedWord[i] == letter){
			blanksAndSuccesses[i] = letter;
		}
	}	
	}else{
		wrongLetters.push(letter);
		guessesLeft--;
	}

	console.log(blanksAndSuccesses);

}

function endOfRound(){
	console.log("Win Count: " + winCount + "| Loss Count: " + lossCount + "| Guesses Left: " + guessesLeft);
	$("#wordGuess").html(blanksAndSuccesses.join(" "));
	$("#numWins").html(winCount);
	$("#numLosses").html(lossCount);
	$("#numberLeft").html(guessesLeft);
	$("#numberWrong").html(wrongLetters.join(" "))

	if(letters.toString() == blanksAndSuccesses.toString()) {
		winCount++;
		alert("You Won!");

		$("#numWins").html(winCount);
		startGame();
	} else if(guessesLeft == 0){
		lossCount++;
		alert("You Lost!")
		$("#numLosses").html(lossCount);
		startGame();
	}
}

//MAIN PROCESS
//===================================================================

startGame();

$(document).keyup(function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkProcess(letterGuessed);
	endOfRound();
	console.log(letterGuessed);
});