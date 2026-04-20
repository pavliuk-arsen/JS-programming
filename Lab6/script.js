let allLevels = [];
let currentLevelObj = null;
let activeMoves = new Set();
let seconds = 0;
let timerInterval;

async function loadGameData() {
    try {
        const response = await fetch('levels.json');
        const data = await response.json();
        allLevels = data.levels;
        initLevel(allLevels[0]); 
    } catch (error) {
        console.error("Помилка завантаження JSON. Переконайтеся, що запущено локальний сервер!", error);
    }
}

function initLevel(level) {
    currentLevelObj = level;
    activeMoves.clear();
    seconds = 0;
    
    updateStats();
    renderGrid(JSON.parse(JSON.stringify(level.grid)));
    startTimer();
}

function renderGrid(matrix) {
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    
    matrix.forEach((row, r) => {
        row.forEach((val, c) => {
            const cell = document.createElement('div');
            cell.className = `cell ${val === 1 ? 'on' : 'off'}`;
            cell.dataset.r = r;
            cell.dataset.c = c;
            cell.onclick = () => handleCellClick(r, c);
            gridElement.appendChild(cell);
        });
    });
}

function handleCellClick(r, c) {
    const pos = `${r}-${c}`;
    
    if (activeMoves.has(pos)) {
        activeMoves.delete(pos);
    } else {
        activeMoves.add(pos);
    }

    const deltas = [[0,0], [-1,0], [1,0], [0,-1], [0,1]];
    deltas.forEach(([dr, dc]) => {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < 5 && nc >= 0 && nc < 5) {
            const cell = document.querySelector(`[data-r="${nr}"][data-c="${nc}"]`);
            cell.classList.toggle('on');
            cell.classList.toggle('off');
        }
    });

    updateStats();
    checkWin();
}

function updateStats() {
    document.getElementById('min-moves').textContent = currentLevelObj.minMoves;
    document.getElementById('current-moves').textContent = activeMoves.size;
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        seconds++;
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        document.getElementById('timer').textContent = `${m}:${s}`;
    }, 1000);
}

function restartGame() {
    initLevel(currentLevelObj);
}

function nextLevel() {
    const otherLevels = allLevels.filter(l => l.id !== currentLevelObj.id);
    const randomLevel = otherLevels[Math.floor(Math.random() * otherLevels.length)];
    initLevel(randomLevel);
}

function checkWin() {
    const lightsOn = document.querySelectorAll('.cell.on').length;
    if (lightsOn === 0) {
        clearInterval(timerInterval);
        setTimeout(() => alert("Перемога! Всі лампи вимкнено!"), 100);
    }
}

document.getElementById('btn-restart').onclick = restartGame;
document.getElementById('btn-newgame').onclick = nextLevel;

loadGameData();