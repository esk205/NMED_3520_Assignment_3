let bubbleScore = 0;
let timerInterval = 0;
let startTime = 0;
let fishIntervals = []; // Array to store interval IDs

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

function createFish() {
    // Create fish in intervals
    for (let j = 0; j < 5; j++) { 
        const intervalId = setInterval(() => {
            for (let i = 0; i < 5; i++) { // Number of fish per interval
                const fish = document.createElement('img');
                fish.classList.add('fish');
                fish.src = 'imgs/fish.webp'; // Replace with the URL of your fish image
                fish.alt = 'A swimming fish';
                fish.style.position = 'absolute';
                fish.style.top = `${Math.random() * window.innerHeight * 0.8}px`; // Keep fish within visible bounds
                fish.style.left = Math.random() < 0.5 ? '-100px' : `${window.innerWidth + 100}px`; // Start off-screen
                fish.dataset.direction = fish.style.left === '-100px' ? 'right' : 'left'; // Save direction as a data attribute

                fish.style.transform = fish.dataset.direction === 'right' ? 'scaleX(1)' : 'scaleX(-1)'; // Flip fish for direction
                document.body.appendChild(fish);

                animateFish(fish);
            }
        }, 1000);

        // Store interval ID to manage later
        fishIntervals.push(intervalId);
    }
}

function animateFish(fish) {
    const direction = fish.dataset.direction;

    // Reverse the direction logic
    const startPos = direction === 'right' ? window.innerWidth + 100 : -100;
    const endPos = direction === 'right' ? -100 : window.innerWidth + 100;

    const duration = 5000 + Math.random() * 5000; // Random duration between 5-10 seconds

    // Animate fish
    const startTime = performance.now();

    function moveFish(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Cap progress at 1
        const currentPos = startPos + progress * (endPos - startPos);

        fish.style.left = `${currentPos}px`;

        if (progress < 1) {
            requestAnimationFrame(moveFish); // Continue animation
        } else {
            fish.remove(); // Remove fish when animation is complete
        }
    }
    requestAnimationFrame(moveFish);
}

function startGame() {
    bubbleScore = 0; // Reset score
    document.getElementById('bubbleScore').textContent = bubbleScore;
    scoreboard.style.display = 'block';
    createBubbles();
    createFish(); // Add fish at the start of the game
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
    // Clear all intervals to stop fish creation
    fishIntervals.forEach(intervalId => clearInterval(intervalId));
    fishIntervals = []; // Reset the intervals array

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
        }
    } else if (e.target.classList.contains('fish')) {
        e.target.remove();
        bubbleScore--;
        document.getElementById('bubbleScore').textContent = bubbleScore;
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
// Add CSS styles for fish images
const style = document.createElement('style');
style.textContent = `
    .fish {
        width: 50px; /* Adjust size as needed */
        height: auto; /* Maintain aspect ratio */
        pointer-events: all; /* Ensure fish are clickable */
        transition: none; /* Disable CSS transitions for JS animations */
    }
`;
document.head.appendChild(style);