let startBtn, status, lastTimeEl, bestTimeEl, gameScreen;
let gameState = 'idle';
let startTime = 0;
let bestTime = Infinity;

document.addEventListener('DOMContentLoaded', init);

function init() {
    startBtn = document.getElementById('start-btn');
    status = document.getElementById('status');
    lastTimeEl = document.getElementById('last-time');
    bestTimeEl = document.getElementById('best-time');
    gameScreen = document.getElementById('game-screen');
    
    startBtn.addEventListener('click', startGame);
    gameScreen.addEventListener('click', handleReaction);
}

function startGame() {
    gameState = 'waiting';
    status.textContent = 'Attendez le signal...';
    startBtn.style.display = 'none';
    gameScreen.style.background = '#ffa502';
    
    const waitTime = 2000 + Math.random() * 3000;
    setTimeout(() => {
        if (gameState === 'waiting') {
            gameState = 'signal';
            startTime = performance.now();
            gameScreen.style.background = '#00ff88';
            status.textContent = 'CLIQUEZ!';
        }
    }, waitTime);
}

function handleReaction() {
    if (gameState !== 'signal') {
        status.textContent = 'Trop tôt! Attendez le signal!';
        setTimeout(() => resetGame(), 1500);
        return;
    }
    
    const reactionTime = (performance.now() - startTime) / 1000;
    lastTimeEl.textContent = 'Dernier temps: ' + reactionTime.toFixed(3) + 's';
    
    if (reactionTime < bestTime) {
        bestTime = reactionTime;
        bestTimeEl.textContent = 'Meilleur temps: ' + bestTime.toFixed(3) + 's';
    }
    
    status.textContent = 'Temps: ' + reactionTime.toFixed(3) + 's!';
    resetGame();
}

function resetGame() {
    gameState = 'idle';
    gameScreen.style.background = '';
    status.textContent = 'Cliquez Démarrer pour rejouer!';
    startBtn.style.display = 'block';
}
