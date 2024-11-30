let bubbleScore = 0;
let timerInterval = 0;
let startTime = 0;

const menu = document.getElementById('menu');
const playButton = document.getElementById('playButton');
const howToPlayButton = document.getElementById('howToPlayButton');
const instructions = document.getElementById('instructions');
const scoreboard = document.getElementById('scoreboard');
const countdown = document.getElementById('countdown');

playButton.addEventListener('click', () => {
    menu.style.display = 'none';
    startCountdown();
});

howToPlayButton.addEventListener('click', () => {
    instructions.style.display = instructions.style.display === 'none' ? 'block' : 'none';
});

function startCountdown() {
    let count = 3;
    countdown.style.display = 'block';
    countdown.textContent = count;

    const countdownInterval = setInterval(() => {
        count--;
        countdown.textContent = count;
        if (count === 0) {
            clearInterval(countdownInterval);
            countdown.style.display = 'none';
            startGame();
        }
    }, 1000);
}

function startGame() {
    bubbleScore = 0; // Reset score
    document.getElementById('bubbleScore').textContent = bubbleScore;
    scoreboard.style.display = 'block';
    createBubbles();
    startTime = Date.now();

    let timeLeft = 30;
    document.getElementById('timer').textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    scoreboard.style.display = 'none';
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    let trophy;
    if (bubbleScore === 20) {
        if (timeTaken <= 15) {
            trophy = 'Gold';
        } else if (timeTaken <= 25) {
            trophy = 'Silver';
        } else if (timeTaken <= 30) {
            trophy = 'Bronze';
        }
    }

    const message = trophy
        ? `Congratulations! You won a ${trophy} trophy by popping all bubbles in ${timeTaken} seconds!`
        : `Game over! You popped ${bubbleScore} bubbles.`;

    alert(message);
    resetGame();
}

function resetGame() {
    document.querySelectorAll('.bubble, .fire').forEach(element => element.remove());
    menu.style.display = 'block';
    bubbleScore=0;
}

document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('bubble')) {
        e.target.remove();
        bubbleScore++;
        document.getElementById('bubbleScore').textContent = bubbleScore;

        // End game if all bubbles are popped early
        if (bubbleScore == 20) {
            endGame();
            bubbleScore == 0;
        }
    }
});

function createBubbles() {
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.top = `${Math.random() * window.innerHeight}px`;
        bubble.style.left = `${Math.random() * window.innerWidth}px`;
        document.body.appendChild(bubble);
    }

    
}
