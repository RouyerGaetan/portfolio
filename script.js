const lines = [
    '> Initialisation du portfolio...',
    '> Initialisation terminée, vous pouvez entrer'
];

const typewriterContainer = document.getElementById('typewriter');
const typeSound = document.getElementById('type-sound');
const enterSection = document.getElementById('enter-section');
const enterBtn = document.getElementById('enter-btn');
const container = document.querySelector('.container');
const introScreen = document.querySelector('.intro-screen');

let currentLine = 0;

function typeLine(text, callback) {
    const p = document.createElement('p');
    const span = document.createElement('span');
    span.classList.add('cursor');
    span.textContent = '_';

    p.classList.add('type-line');
    typewriterContainer.appendChild(p);
    p.appendChild(span);

    let i = 0;
    const interval = setInterval(() => {
        p.textContent = text.slice(0, i + 1);
        p.appendChild(span);

        typeSound.currentTime = 0;
        typeSound.play();

        i++;
        if (i === text.length) {
            clearInterval(interval);
            span.remove();
            if (callback) setTimeout(callback, 500);
        }
    }, 50);
}

function startTyping() {
    typeLine(lines[currentLine], () => {
        currentLine++;
        if (currentLine < lines.length) {
            setTimeout(() => typeLine(lines[currentLine], showButton), 1000);
        }
    });
}

function showButton() {
    enterSection.classList.add('fade-visible');
    enterBtn.focus();
}

enterBtn.addEventListener('click', () => {
    introScreen.style.display = 'none';
    container.classList.remove('hidden');
});

startTyping();