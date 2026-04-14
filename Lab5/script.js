const difficultySelect = document.getElementById('difficulty');
const colorSelect = document.getElementById('color');
const startBtn = document.getElementById('startBtn');
const menu = document.getElementById('menu');
const gameArea = document.getElementById('gameArea');
const gameOverScreen = document.getElementById('gameOver');
const pixel = document.getElementById('pixel');
const scoreDisplay = document.getElementById('score');
const finalScoreDisplay = document.getElementById('finalScore');
const timeDisplay = document.getElementById('timeDisplay');

let score = 0;
let countdownInterval; 
let timeRemaining;    
let currentX, currentY;

let config = {
    size: 50,
    range: 100,
    time: 4000
};

function checkReadiness() {
    if (difficultySelect.value && colorSelect.value) {
        startBtn.disabled = false;
    }
}

difficultySelect.addEventListener('change', checkReadiness);
colorSelect.addEventListener('change', checkReadiness);

startBtn.addEventListener('click', () => {
    menu.style.display = 'none';
    gameArea.style.display = 'block';

    pixel.style.backgroundColor = colorSelect.value;

    switch (difficultySelect.value) {
        case 'easy':
            config = { size: 40, range: 150, time: 4000 };
            break;
        case 'medium':
            config = { size: 30, range: 300, time: 2000 };
            break;
        case 'hard':
            config = { size: 20, range: 500, time: 1000 };
            break;
    }

    pixel.style.width = `${config.size}px`;
    pixel.style.height = `${config.size}px`;

    currentX = window.innerWidth / 2;
    currentY = window.innerHeight / 2;
    movePixel(currentX, currentY);

    startRound();
});

pixel.addEventListener('click', () => {
    score++;
    scoreDisplay.innerText = score;
    
    calculateNewPosition();
    startRound();
});

function calculateNewPosition() {
    let newX, newY;
    let attempts = 0;
    
    do {
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * (config.range - 50);

        newX = currentX + Math.cos(angle) * distance;
        newY = currentY + Math.sin(angle) * distance;
        attempts++;
        
    } while (
        attempts < 20 && 
        (newX < 0 || newX > window.innerWidth - config.size || 
         newY < 80 || newY > window.innerHeight - config.size) 
    );

    newX = Math.max(0, Math.min(newX, window.innerWidth - config.size));
    newY = Math.max(80, Math.min(newY, window.innerHeight - config.size));

    currentX = newX;
    currentY = newY;
    movePixel(newX, newY);
}

function movePixel(x, y) {
    pixel.style.left = `${x}px`;
    pixel.style.top = `${y}px`;
}
function startRound() {
    clearInterval(countdownInterval);
    
    timeRemaining = config.time;
    
    timeDisplay.innerText = (timeRemaining / 1000).toFixed(1);
    
    countdownInterval = setInterval(() => {
        timeRemaining -= 100;
        timeDisplay.innerText = (timeRemaining / 1000).toFixed(1);

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval); 
            timeDisplay.innerText = "0.0";    
            endGame();                        
        }
    }, 100);
}

function endGame() {
    gameArea.style.display = 'none';
    gameOverScreen.style.display = 'block';
    finalScoreDisplay.innerText = score;
}