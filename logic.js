//Global Variables
//Array of word options, all lowercase

var wordArray=[
"jerome",
"neena",
"darion",
"lou",
"greg",
"jordan",
"jasmine",
"stephen",
"jacob",
"adam",
"rui",
"luis"
];

//Solution will be held here
var chosenWord="";
//This will break the solution into individual letter to be stored in array
var lettersInChosenWord=[];
//This will be the number of blanks we show based on the solution
var numBlanks=0;
//Holds a mix of blank and solved letters 
var blanksAndSuccesses=[];
//Holds all of the wrong guesses
var wrongGuesses=[];

var winCounter=0;
var lossCounter=0;
var numGuesses=9;

//Functions

function startGame(){
	//Reset the guesses back to 0
	numGuesses=9;

	//Solution is chosen randomly from wordList
	chosenWord=wordArray[Math.floor(Math.random() * wordArray.length)]
	//The word is broken into individual letters
	lettersInChosenWord=chosenWord.split("");
	//We count the number of letters in the word.
	numBlanks=lettersInChosenWord.length;

	//We print the solution in console
	console.log(chosenWord)

	//CRITICAL LINE- here we reset the guess and success array at each round
	blanksAndSuccesses=[];
	//CRITICAL LINE- here we reset the wrong guesses from the previous round
	wrongGuesses=[];

	//Fill up the blanksAndSuccesses list with appropriate number of blanks
	//This is based on number of letters in solution
	for (var i=0; i < numBlanks; i++){
		blanksAndSuccesses.push("_");
	}

	//Print the initial blanks in the console
	console.log(blanksAndSuccesses);

	//Reprints the guessesLeft to 9
	document.getElementById("guess-left").innerHTML=numGuesses;

	//Prints the blanks at the beginning of each round in the HTML
	document.getElementById("word-blanks").innerHTML=blanksAndSuccesses;

	//Clears the wrong gueses from the previous round
	document.getElementById("wrong-guesses").innerHTML=wrongGuesses;	
}

//checkLetters function
//It's where we will do all of the comparisons for matches.
//Again, it's not being called here. It's just being made for future use

function checkLetters(letter){

	//This boolean will be toggled based on whether or not a user letter is found anywhere in this word
	var letterInWord=false;

	//Check if a letter exists inside the array at all
	for (var i=0; i < numBlanks; i++){
		if(chosenWord[i] === letter) {
			//If the letter exists then toggle this boolean to true. This will be used in the next step.
			letterInWord=true;
		}
	}
	//If the letter exists somewhere in the word, then figure out exactly where (which indices)
	if (letterInWord){

		//loop through the word
		for (i = 0; i < numBlanks; i++){
			//Populat the blanksAndSuccesses with every instance of the letter
			if(chosenWord[i]===letter){
				//Here we set the specific space in blanks and letter equal to the letter where there is a match
				blanksAndSuccesses[i]=letter;
			}
		}
		console.log(blanksAndSuccesses);
	}

	//If the letter doesn't exist at all...
	else {
		//..then we add the letter to the list of wrong letters, and we subtract one of the guesses
		wrongGuesses.push(letter);
		numGuesses--;
	}
	
}

//roundComplete function
//Here we will have all of the code that needs to be run after each guess is made
function roundComplete(){

	//First, log an initial status update in the console telling us how many wins, losses, and guesses are left
	console.log("WinCount: ") + winCounter + "| LossCount: " + lossCounter + " | GuessCount " +numGuesses);

	//Update the HTML to reflect the new number of guesses. Also update the correct guesses.
	document.getElementById("guesses-left").innerHTML=numGuesses;

	//This will print the array of guesses and blanks onto the page
	document.getElementById("word-blanks").innerHTML=blanksAndSuccesses;

	//This will pring the wrong guesses onto the page
	document.getElementById("wrong-guesses").innerHTML=wrongGuesses;

	//If we have gotten all the letters to match the solution...
	if (lettersInChosenWord.toString()===blanksAndSuccesses.toString()) {
		//..add to the win counter and give the user an alert
		winCounter++;
		alert("YOU WIN!");

		//update the win counter in the HTML and restart the game
		document.getElementById("win-counter").innerHTML=winCounter;
		startGame();
	}	
	//If we've run out of guesses...
	else if (numGuesses===0) {
		//Add to the loss counter
		lossCounter++;
		//Give the user an alert
		alert("You lost");
		//Update the loss counter in the HTML
		document.getElementById("loss-counter").innerHTML=lossCounter;
		//Restart the game
		startGame(); }

}

//Main Process

startGame();

//Then initiate the function for capturing key clicks
document.onkeyup = function(event){
	//Converts all key clicks to lowercase letters.
	var letterGuessed=String.fromCharCode(event.keyCode).toLowerCase();
	//Runs the code to check for correctness
	checkLetters(letterGuessed);
	//Runs the code after each round is done.
	roundComplete();
};


