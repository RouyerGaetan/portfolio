const lines = [
    '> Initialisation du portfolio...',
    '> Initialisation terminée.'
];

const typewriterContainer = document.getElementById('typewriter');
const typeSound = document.getElementById('type-sound');
const enterSection = document.getElementById('enter-section');
const container = document.querySelector('.container');
const introScreen = document.querySelector('.intro-screen');
const starterScreen = document.getElementById('starter-screen');
const startScriptBtn = document.getElementById('start-script-btn');
const glitchVideo = document.getElementById('glitch-video');
const toggleButton = document.getElementById('toggleButton');
const pokedexPhoto = document.getElementById('pokedexPhoto');
const flash = document.getElementById('flash');

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
    p.classList.add('type-line');

    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    cursor.textContent = '_';

    p.textContent = '';
    typewriterContainer.appendChild(p);
    p.appendChild(cursor);

    let i = 0;

    playTypingSound();

    const interval = setInterval(() => {
        p.textContent = text.slice(0, i + 1);
        p.appendChild(cursor);

        i++;
        if (i === text.length) {
            clearInterval(interval);
            cursor.remove();
            stopTypingSound();
            if (callback) setTimeout(callback, 1500);
        }
    }, 50);
}

function startTyping() {
    typewriterContainer.innerHTML = ''; // vide proprement

    function typeNext() {
        typeLine(lines[currentLine], () => {
            currentLine++;
            if (currentLine < lines.length) {
                setTimeout(typeNext, 200);
            } else {
                showButton();
            }
        });
    }

    typeNext();
}

function showButton() {
    enterSection.classList.add('fade-visible');

    const enterLine = document.createElement('p');
    enterLine.textContent = '[ Entrer ]';
    enterLine.classList.add('type-line', 'enter-line');
    enterLine.style.cursor = 'pointer';

    // 👇 Clique avec la souris
    enterLine.addEventListener('click', () => {
        lancerTransition();
    });

    // 👇 Appuie sur ENTER
    function handleEnterKey(e) {
        if (e.key === 'Enter') {
            lancerTransition();
            // Nettoie le listener une fois utilisé pour éviter les doublons
            document.removeEventListener('keydown', handleEnterKey);
        }
    }

    document.addEventListener('keydown', handleEnterKey);

    enterSection.appendChild(enterLine);
}

startScriptBtn.addEventListener('click', () => {
    console.log('Démarrage du script...');

    // Débloquer l'audio par un mini son muet
    typeSound.volume = 0;
    typeSound.play()
        .then(() => {
            typeSound.volume = 1;
            setTimeout(() => {
                starterScreen.style.display = 'none';
                introScreen.style.display = 'block';
                startTyping();
            }, 500);
        })
        .catch(e => {
            console.warn('Impossible de lire le son immédiatement :', e);
            starterScreen.style.display = 'none';
            introScreen.style.display = 'block';
            startTyping();
        });
});

function lancerTransition() {
    enterSection.style.display = 'none';
    glitchVideo.classList.remove('hidden');
    glitchVideo.currentTime = 0;
    glitchVideo.play();

    setTimeout(() => {
        glitchVideo.pause();
        glitchVideo.classList.add('hidden');

        introScreen.classList.add('hidden');
        typewriterContainer.innerHTML = '';

        setTimeout(() => {
            introScreen.style.display = 'none';
            container.classList.remove('hidden');
            container.classList.add('fade-in');

            setTimeout(() => {
                container.classList.add('visible');
            }, 50);

        }, 500);

    }, 2500);
}

let isVisible = true;

  toggleButton.addEventListener('click', () => {
    if (isVisible) {
      pokedexPhoto.style.animation = 'crtOff 0.5s forwards';
      flash.style.animation = 'flashEffect 0.3s forwards';
      isVisible = false;
    } else {
      pokedexPhoto.style.display = 'block';
      pokedexPhoto.style.animation = 'crtOn 0.5s forwards';
      isVisible = true;
    }
  });

  pokedexPhoto.addEventListener('animationend', (e) => {
    if (!isVisible && e.animationName === 'crtOff') {
      pokedexPhoto.style.display = 'none';
    }
  });

  flash.addEventListener('animationend', () => {
    flash.style.animation = 'none';
  });