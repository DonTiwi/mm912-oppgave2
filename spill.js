let randomNumber = Math.floor(Math.random() * 100) + 1;
let guesses = document.querySelector('#guesses');
let lastResult = document.querySelector('#feedback');
let guessField = document.querySelector('input');
let guessButton = document.querySelector('#guessButton');
let resetButton = document.querySelector('#resetButton');
let guessCount = 0;
let guessCountElement = document.querySelector('#guessCount');

function checkGuess() {
    let userGuess = Number(guessField.value);
    if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.classList.add('correct');
        guesses.textContent = '';
        setGameOver();
    } else if (guessCount === 9) {
        lastResult.textContent = '!!!GAME OVER!!!';
        lastResult.classList.add('game-over');
        setGameOver();
    } else {
        lastResult.textContent = 'Wrong!';
        lastResult.classList.remove('correct', 'game-over');
        if (userGuess < randomNumber) {
            guesses.textContent = 'Last guess was too low!';
        } else if (userGuess > randomNumber) {
            guesses.textContent = 'Last guess was too high!';
        }
        lastResult.classList.add('incorrect');
    }

    guessCount++;
    guessCountElement.textContent = `Guesses: ${guessCount}`;
    guessField.value = '';
    guessField.focus();
}

function setGameOver() {
    guessField.disabled = true;
    guessButton.disabled = true;
    resetButton.disabled = false;
    resetButton.addEventListener('click', resetGame);
    if (lastResult.textContent === 'Congratulations! You got it right!') {
        lastResult.classList.add('correct');
    } else {
        lastResult.classList.remove('correct');
        lastResult.classList.add('game-over');
    }
    lastResult.classList.remove('incorrect');
}

function resetGame() {
    guessCount = 0;
    guessCountElement.textContent = `Guesses: ${guessCount}`;
    guesses.textContent = '';
    lastResult.textContent = '';
    lastResult.classList.remove('correct', 'game-over', 'incorrect');
    resetButton.disabled = true;
    guessButton.disabled = false;
    guessField.disabled = false;
    guessField.value = '';
    guessField.focus();
    randomNumber = Math.floor(Math.random() * 100) + 1;
}

guessButton.addEventListener('click', checkGuess);

guessField.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        checkGuess();
    }
});