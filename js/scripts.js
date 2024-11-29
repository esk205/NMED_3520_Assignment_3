const mode = { action: 'bubble' }; // Default mode
let whiteScore = 0;
let fireScore = 0;
let hoveredFire = null;

// Add random elements (bubbles and fires) to the page
function createElements() {
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.top = `${Math.random() * window.innerHeight}px`;
        bubble.style.left = `${Math.random() * window.innerWidth}px`;
        document.body.appendChild(bubble);
    }

    for (let i = 0; i < 10; i++) {
        const fire = document.createElement('div');
        fire.classList.add('fire');
        fire.style.top = `${Math.random() * window.innerHeight}px`;
        fire.style.left = `${Math.random() * window.innerWidth}px`;
        document.body.appendChild(fire);

        fire.addEventListener('mouseenter', () => {
            hoveredFire = fire;
        });

        fire.addEventListener('mouseleave', () => {
            if (hoveredFire === fire) {
                hoveredFire = null;
            }
        });
    }
}

createElements();

// Handle clicks on bubbles and fires
document.body.addEventListener('click', (e) => {
    const target = e.target;

    if (mode.action === 'bubble' && target.classList.contains('bubble')) {
        target.style.animation = 'dissipate 0.5s forwards';
        setTimeout(() => target.remove(), 500);
        whiteScore++;
        document.getElementById('whiteScore').textContent = whiteScore;
    }

    if (mode.action === 'fire' && target.classList.contains('fire')) {
        popFireBubble(target);
    }
});

// Pop fire bubble logic
function popFireBubble(fireElement) {
    const flames = document.createElement('div');
    flames.classList.add('flames');
    flames.style.top = `${fireElement.offsetTop}px`;
    flames.style.left = `${fireElement.offsetLeft}px`;
    document.body.appendChild(flames);
    fireElement.remove();
    fireScore++;
    document.getElementById('fireScore').textContent = fireScore;
    setTimeout(() => flames.remove(), 1000);
}

// Handle space bar to pop hovered fire bubbles
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && hoveredFire && mode.action === 'fire') {
        popFireBubble(hoveredFire);
        hoveredFire = null;
    }
});

// Toolbar button handlers
document.getElementById('bubbleMode').addEventListener('click', () => {
    mode.action = 'bubble';
    document.getElementById('bubbleMode').classList.add('active');
    document.getElementById('fireMode').classList.remove('active');
});

document.getElementById('fireMode').addEventListener('click', () => {
    mode.action = 'fire';
    document.getElementById('fireMode').classList.add('active');
    document.getElementById('bubbleMode').classList.remove('active');
});