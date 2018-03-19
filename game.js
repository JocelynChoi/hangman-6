var wordsList = ['red', 'blue', 'green', 'yellow'];
        var chosenWord = "";// the computers chosen word
        var lettersinChosenWord = [];//the computers letters in chosen word 
        var numBlanks = 0;//number of spaces for each letter
        var blanksRight = []; //mix of blank and solved
        var wrongGuesses = [];
        var letterGuessed = "";
        var winCounter = 0;
        var numGuesses = 9;

        // startGame() means start and restart setup
        function startGame() {
            
            // Reset the user guesses back to 0.
            numGuesses = 9;
            // Computer chooses new word from array.
            chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
            // The word is "split" into individual letters.
            lettersInChosenWord = chosenWord.split("");
            // We count the number of letters in the word.
            numBlanks = lettersInChosenWord.length;
            // We print the solution in console (for testing).
            console.log(chosenWord);
            
            //Clear blanks and wrong guesses.
            blanksRight = [];
            blanksWrong = [];//
            
            //count the number of blanks needed for the word and push it to the blanks.
            // This is based on number of letters in solution. blanksRight also holds the solution.
            for (var i = 0; i < numBlanks; i++) {
                blanksRight.push("_");
            }

            // the blanks necessary for each word
            console.log(blanksRight);

            // numGuesses = 9
            document.getElementById("guesses-left").innerHTML = numGuesses;

            // Prints the blanks necessar for new word.
            document.getElementById("word-blanks").innerHTML = blanksRight.join(" ");

            // Wrong guesses = no letter/0
            document.getElementById("wrong-guesses").innerHTML = blanksWrong.join(" ");
        }
        
        //this function allows us to check if user letter is in the word
        //if user picks the right letter, it goes to the right blank. if not, numGuesses goes down, and goes to wrong guesses.
        function checkLetters(letter) {
            // a user letter is found anywhere in the word.
            var letterInWord = false;
            // Check if a letter exists inside the array at all.
            for (var i = 0; i < numBlanks; i++) {
                if (chosenWord[i] === letter) {
                    // If the letter exists then toggle this boolean to true.
                    // This will be used in the next step.
                    letterInWord = true;
                }
            }



            // If the letter exists somewhere in the word, where?

            if (letterInWord) {
                // Loop through the word and 
                for (var j = 0; j < numBlanks; j++) {
                    // Populate the blanks 
                    if (chosenWord[j] === letter) {
                        //since blanksRight knows where teh letter goes
                        blanksRight[j] = letter;
                    }
                }
                // Log the current blanks and successes for testing.
                console.log(blanksRight);
            }
            // If the letter is not in the word, ...
            else {
                // Then we add the letter to the list of wrong letters.
                blanksWrong.push(letter);
                // We also subtract one of the guesses.
                numGuesses--;
            }
        }
        // roundComplete() function
        // Here we will have all of the code that needs to be run after each guess is made.
        function roundComplete() {
            // First, log an initial status update in the console
            // telling us how many wins, losses, and guesses are left.
            // HTML UPDATES
            // ============
            // Update the HTML to reflect the new number of guesses.
            document.getElementById("guesses-left").innerHTML = numGuesses;
            // This will print the array of guesses and blanks onto the page.
            document.getElementById("word-blanks").innerHTML = blanksRight.join(" ");
            // This will print the wrong guesses onto the page.
            document.getElementById("wrong-guesses").innerHTML = blanksWrong.join(" ");
            // If our hangman string equals the solution.
            // (meaning that we guessed all the letters to match the solution)...
            if (lettersInChosenWord.toString() === blanksRight.toString()) {
                // Add to the win counter
                winCounter++;
                // Give the user an alert
                alert("Congratulations! You don't hang today!");
                // Update the win counter in the HTML
                document.getElementById("win-counter").innerHTML = winCounter;
                // Restart the game
                startGame();
            }
            // If we've run out of guesses
            else if (numGuesses === 0) {

               
                alert("Prepare for your hanging :(");
                // Update the loss counter in the HTML

                // Restart the game
                startGame();
            }
        }
     
        // Starts the Game by running the startGame() function
        startGame();
        // Then initiates the function for capturing key clicks.
        document.onkeyup = function (event) {
            // Converts all key clicks to lowercase letters.
            letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
            // Runs the code to check for correct guesses.
            checkLetters(letterGuessed);
            // Runs the code that ends each round.
            roundComplete();
        };


