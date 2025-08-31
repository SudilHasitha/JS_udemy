'use strict';

let number = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const changeText = (msg,score) => {
    document.querySelector('.message').textContent = msg;
    score--;
    document.querySelector('.score').textContent = score;
    return score
}

document.querySelector('.again').addEventListener('click', () => {
    score = 20;
    number = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.message').textContent = 'Start Guseesing '
    document.querySelector('.number').textContent = '?';
    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
})

document.querySelector('.check').addEventListener('click', () => {
    const guess = Number(document.querySelector('.guess').value);

    if (score >= 1){
        if (!guess){
            document.querySelector('.message').textContent = 'Enter a value '
        }else if (guess === number){
            document.querySelector('.number').textContent = number;
            document.querySelector('.message').textContent = 'Correct Answer'
            document.querySelector('body').style.backgroundColor = 'green';
            document.querySelector('.number').style.width = '30rem';
            highScore = score > highScore ? score : highScore;
            document.querySelector('.highscore').textContent = highScore;
        }else{
            const message = guess < number ? 'Guess is too low': 'Too high!';
            score = changeText(message, score);
        }
    }else{
        document.querySelector('.message').textContent = 'You lost the game';
        document.querySelector('.score').textContent = 0
    }
})
