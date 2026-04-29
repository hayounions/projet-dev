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
    gameScreen.addEventListener('touchstart', handleReaction, { passive: false });
}
let audioContext;

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playTone(frequency, duration = 0.2, type = 'sine') {
    initAudio();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}
function startGame() {
    playTone(600, 0.3, 'square');
    gameState = 'waiting';
    status.textContent = 'Attendez le signal...';
    startBtn.style.display = 'none';
    gameScreen.style.background = '#ffa502';
    
    const waitTime = 2000 + Math.random() * 3000;
    setTimeout(() => {
        if (gameState === 'waiting') {
            playTone(1200, 0.5);
            gameState = 'signal';
            startTime = performance.now();
            gameScreen.style.background = '#00ff88';
            status.textContent = 'CLIQUEZ!';
        }
    }, waitTime);
}

function handleReaction(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (gameState !== 'signal') {
        playTone(250, 0.4);
        status.textContent = 'Trop tôt! Attendez le signal!';
        setTimeout(() => resetGame(), 1500);
        return;
    }
    
    const reactionTime = (performance.now() - startTime) / 1000;
    playTone(800, 0.6);
    
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
