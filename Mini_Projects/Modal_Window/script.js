'use strict';

const model = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.close-modal');
const btnOpen = document.querySelectorAll('.show-modal');

const closeModel = () => {
    model.classList.add('hidden')
    overlay.classList.add('hidden')
}

const openModel = () => {
    model.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

for (let i = 0; i < btnOpen.length; i++)
    btnOpen[i].addEventListener('click', openModel)

btnClose.addEventListener('click', closeModel)

overlay.addEventListener('click', closeModel)

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !model.classList.contains('hidden'))
        closeModel()
})