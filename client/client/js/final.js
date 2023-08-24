'use strict';

const card1 = document.querySelector('.card1');

const card2 = document.querySelector('.card2');
const card3 = document.querySelector('.card3');

const forwardArrow = document.querySelectorAll('.forwardArrow');
const backwardArrow = document.querySelectorAll('.backwardArrow');


// 1
forwardArrow[0].addEventListener(`click`, function () {
    card2.classList.add('active');
    card1.classList.remove('active');
})

backwardArrow[0].addEventListener(`click`, function () {
    card3.classList.add('active');
    card1.classList.remove('active');
})



// 2

console.log(card1);
forwardArrow[1].addEventListener(`click`, function () {

    card3.classList.add('active');
    card2.classList.remove('active');
})

backwardArrow[1].addEventListener(`click`, function () {

    card1.classList.add('active');
    card2.classList.remove('active');
})



// 1
forwardArrow[2].addEventListener(`click`, function () {

    card1.classList.add('active');
    card3.classList.remove('active');
})

backwardArrow[2].addEventListener(`click`, function () {
    // card1..toggle('.hidden');
    card2.classList.add('active');
    card3.classList.remove('active');
})




// const scards = document.querySelectorAll('.scard');
let sliderInterval;
const scards = document.querySelectorAll('.card');
function runSlide() {

    sliderInterval = setInterval(() => {
        console.log(`hello`);

        if (scards[0].classList.contains('active')) {
            scards[0].classList.remove('active');
            scards[1].classList.add('active');
        }
        else if (scards[1].classList.contains('active')) {
            scards[1].classList.remove('active');
            scards[2].classList.add('active');
        }
        // else (scards[2].classList.contains('active')) {
        else {
            scards[2].classList.remove('active');
            scards[0].classList.add('active');
        }
    }, 5000)
}

runSlide();

function removeActive() {
    scards.forEach(scard => {
        scard.classList.remove("active")
    })

}

scards.forEach(scard => {
    scard.addEventListener('click', () => {
        console.log(`clicked`);
        clearInterval(sliderInterval)
    })
})