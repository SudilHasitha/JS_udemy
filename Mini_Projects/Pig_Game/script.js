'use strict';

const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

let scores = [0,0]
let currentScore = 0;
let activelayer = 0;
diceEl.classList.add('hidden')
player0El.classList.toggle('player--active') 

const resetState = () => {
    score0El.textContent = '0'
    score1El.textContent = '0'
    diceEl.classList.add('hidden')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    btnHold.disabled = false
    btnRoll.disabled = false
    scores = [0,0]
    currentScore = 0;
    activelayer = 0;
}

resetState()

const switchPlayer = (activelayer) => {
    currentScore = 0
    document.getElementById(`current--${activelayer}`).textContent = currentScore
    activelayer = activelayer === 0 ? 1 : 0
    player0El.classList.toggle('player--active')    
    player1El.classList.toggle('player--active')
    return activelayer
}

const displayResult = (dice) => {
    if (dice == 1){
        diceEl.setAttribute('src','dice-1.png')
    }else if(dice == 2){
        diceEl.setAttribute('src','dice-2.png')
    }else if(dice == 3){
        diceEl.setAttribute('src','dice-3.png')
    }else if(dice == 4){
        diceEl.setAttribute('src','dice-4.png')
    }else if(dice == 5){
        diceEl.setAttribute('src','dice-5.png')
    }else{
        diceEl.setAttribute('src','dice-6.png')
    }
} 

btnRoll.addEventListener('click', () => {
    const dice = Math.trunc(Math.random() * 6) + 1
    diceEl.classList.remove('hidden')
    displayResult(dice)
    if(dice !== 1){
        currentScore += dice
        document.getElementById(`current--${activelayer}`).textContent = currentScore
    }else{
        activelayer = switchPlayer(activelayer)
    }
})

btnHold.addEventListener('click', () => {
    scores[activelayer] += currentScore
    document.getElementById(`score--${activelayer}`).textContent = scores[activelayer]

    if(scores[activelayer] >= 100){
        activelayer === 0 ? player0El.classList.add('player--winner') : player1El.classList.add('player--winner')  
        btnHold.disabled = true
        btnRoll.disabled = true
    }

    activelayer = switchPlayer(activelayer)
})

btnNew.addEventListener('click', () => {
    resetState()
})