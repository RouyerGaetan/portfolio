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
const starterScreen = document.getElementById('starter-screen');
const startScriptBtn = document.getElementById('start-script-btn');

let currentLine = 0;

function playTypingSound() {
    if (typeSound.paused) {
        typeSound.loop = true;
        typeSound.currentTime = 0;
        typeSound.play().catch(e => console.warn('Audio bloqué :', e));
    }
}

function stopTypingSound() {
    typeSound.pause();
    typeSound.currentTime = 0;
    typeSound.loop = false;
}

function typeLine(text, callback) {
    const p = document.createElement('p');
    const span = document.createElement('span');
    span.classList.add('cursor');
    span.textContent = '_';

    p.classList.add('type-line');
    typewriterContainer.appendChild(p);
    p.appendChild(span);

    let i = 0;

    playTypingSound();

    const interval = setInterval(() => {
        p.textContent = text.slice(0, i + 1);
        p.appendChild(span);

        i++;
        if (i === text.length) {
            clearInterval(interval);
            span.remove();

            stopTypingSound();

            if (callback) setTimeout(callback, 500);
        }
    }, 50);
}

function startTyping() {
    typeLine(lines[currentLine], () => {
        currentLine++;
        if (currentLine < lines.length) {
            // On démarre le son un peu avant la frappe
            playTypingSound();
            setTimeout(() => {
                typeLine(lines[currentLine], showButton);
            }, 100); // délai ajustable pour synchroniser son et frappe
        }
    });
}

function showButton() {
    enterSection.classList.add('fade-visible');
    enterBtn.focus();
}

startScriptBtn.addEventListener('click', () => {
    console.log('Démarrage du script...');

    // On joue un mini son muet pour débloquer l'audio (avec volume à 0)
    typeSound.volume = 0;
    typeSound.play().then(() => {
        typeSound.volume = 1;

        setTimeout(() => {
            starterScreen.style.display = 'none';
            introScreen.style.display = 'block';
            startTyping();
        }, 500);
    }).catch(e => {
        console.warn('Impossible de lire le son immédiatement :', e);
        starterScreen.style.display = 'none';
        introScreen.style.display = 'block';
        startTyping();
    });
});

enterBtn.addEventListener('click', () => {
    introScreen.style.display = 'none';
    container.classList.remove('hidden');
});
