let order = [];
let clickedOrder = [];
let score = 0;

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const elementColors = [green, red, yellow, blue];
const start = document.querySelector('#start');

let lose = () => {
    console.log('errou');
    alert('Você perdeu! Tente novamente.');
    playGame();
}

let setScore = (points) => {
    score = points;
    document.getElementById('score').innerHTML = 'Pontuação ' + score;
}

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    console.log('Order', order);

    for (let i in order) {
        const element = elementColors[order[i]];
        lightColor(element, i);
    }
}

let lightColor = (element, position) => {
    let delay = (250 + (position * 800));

    setTimeout(() => {
        element.classList.add('selected');

        setTimeout(() => {
            element.classList.remove('selected');
        }, 450);
    }, delay);
}

let removeAllLight = () => {
    blue.classList.remove('selected');
    red.classList.remove('selected');
    yellow.classList.remove('selected');
    green.classList.remove('selected');
}

let nextLevel = () => {
    clickedOrder = [];
    detachButtons();
    shuffleOrder();
    atachButtons();
}

let checkOrder = () => {
    for (let i = 0; i < clickedOrder.length; i++) {
        if (clickedOrder[i] !== order[i]) {
            lose();
            return false;
        }
    }

    setScore(++score);

    if (clickedOrder.length == order.length) {
        setTimeout(() => {
            nextLevel();
        }, 1000);
    }

    return true;
}

let clicked = (color) => {
    console.log("Clicou na cor ", color);

    clickedOrder[clickedOrder.length] = color;
    elementColors[color].classList.add('selected');

    setTimeout(() => {
        elementColors[color].classList.remove('selected');
        checkOrder();
    }, 250);
}

let atachButtons = () => {
    green.onclick = () => clicked(0);
    red.onclick = () => clicked(1);
    yellow.onclick = () => clicked(2);
    blue.onclick = () => clicked(3);
}

let detachButtons = () => {
    green.onclick = () => { };
    red.onclick = () => { };
    yellow.onclick = () => { };
    blue.onclick = () => { };
}

let playGame = () => {
    order = [];
    clickedOrder = [];
    removeAllLight();
    score = 0;
    setScore(0);
    //alert('Clique em ok para começar');
    nextLevel();
}

/*for (let i = 0; i < 5; i++) {
    shuffleOrder();
    removeAllLight();
}*/

/*green.addEventListener('click', clicked);
red.addEventListener('click', clicked(1));
yellow.addEventListener('click', clicked(2));
blue.addEventListener('click', clicked(3));*/

start.onclick = () => playGame();