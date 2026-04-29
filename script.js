let startBtn, status, lastTimeEl, bestTimeEl, gameScreen;
let gameState = 'idle';
let startTime = 0;
let bestTime = Infinity;
let fakeButtons = [];
const bluffTexts = ['Attends encore...', 'Faux!', 'Piège?', 'Pas maintenant!', 'Bluff!'];

document.addEventListener('DOMContentLoaded', init);

function init() {
    startBtn = document.getElementById('start-btn');
    status = document.getElementById('status');
    lastTimeEl = document.getElementById('last-time');
    bestTimeEl = document.getElementById('best-time');
    gameScreen = document.getElementById('game-screen');
    
    startBtn.addEventListener('click', startGame);
    randomButtonPos();
    gameScreen.addEventListener('click', handleReaction);
    gameScreen.addEventListener('touchstart', handleReaction, { passive: false });
}
let audioContext;

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}
function randomButtonPos() {
    if (!startBtn) return;
    const x = Math.random() * 60 + 20;
    const y = Math.random() * 30 + 20;
    startBtn.style.position = 'absolute';
    startBtn.style.left = x + '%';
    startBtn.style.top = y + '%';
    startBtn.style.transform = 'translate(-50%, -50%)';
}
function createFakeButton() {
    const btn = document.createElement('button');
    btn.className = 'fake-btn';
    btn.innerText = bluffTexts[Math.floor(Math.random() * bluffTexts.length)];
    btn.style.position = 'absolute';
    btn.style.left = (15 + Math.random() * 70) + '%';
    btn.style.top = (15 + Math.random() * 70) + '%';
    gameScreen.appendChild(btn);
    fakeButtons.push(btn);
}

function clearFakes() {
    fakeButtons.forEach(btn => btn && btn.remove());
    fakeButtons = [];
}

function handleBluff(btn) {
    playTone(350, 0.6, 'sawtooth');
    status.textContent = 'BLUFF! Piège détecté!';
    btn.remove();
    fakeButtons = fakeButtons.filter(b => b !== btn);
    setTimeout(() => resetGame(), 2000);
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
    clearFakes();
    
    const waitTime = 2000 + Math.random() * 3000;
    setTimeout(() => {
        if (gameState === 'waiting') {
            gameState = 'ready';
            status.textContent = 'PRET! Ignorez les boutons pièges!';
            // Add troll buttons
            const numTraps = 2 + Math.floor(Math.random() * 3);
            for(let i = 0; i < numTraps; i++) {
                setTimeout(() => createFakeButton(), i * 500);
            }
            
            setTimeout(() => {
                if (gameState === 'ready') {
                    playTone(1200, 0.5);
                    gameState = 'signal';
                    startTime = performance.now();
                    gameScreen.style.background = '#00ff88';
                    status.textContent = 'CLIQUEZ!';
                    clearFakes();
                }
            }, 2000);
        }
    }, waitTime);
}
function handleGameClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const fakeBtn = e.target.closest('.fake-btn');
    if (fakeBtn) {
        handleBluff(fakeBtn);
        return;
    }
    
    handleReaction(e);
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
