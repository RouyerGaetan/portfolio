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
const ledIndicator = document.getElementById('ledIndicator');
const pokedexInfo = document.getElementById('pokedexInfo');
const powerUpSound = document.getElementById('powerUpSound');
const powerDownSound = document.getElementById('powerDownSound');
const pokedexNumber = document.getElementById('pokedexNumber');
const introSectionWrapper = document.querySelector('.intro-section-wrapper');
const pokedexInstruction = document.getElementById('pokedexInstruction');
const contactSection = document.getElementById('contact');
const footerElement = document.querySelector('footer');

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

            if (contactSection) {
                contactSection.classList.remove('hidden');
            }
            if (footerElement) {
                footerElement.classList.remove('hidden');
            }

            setTimeout(() => {
                container.classList.add('visible');
            }, 50);

        }, 500);

    }, 2500);
}

let isPokedexActive = false; // Indique si le Pokédex est en mode "actif" (avec infos affichées et deux colonnes)

toggleButton.addEventListener('click', () => {
    flash.style.animation = 'none';
    void flash.offsetWidth;
    flash.style.animation = 'flashEffect 0.3s forwards';

    if (isPokedexActive) {
        // État de désactivation : cacher les infos, revenir à 1 colonne
        pokedexPhoto.style.animation = 'crtOff 0.5s forwards';
        pokedexInfo.style.animation = 'crtOff 0.5s forwards';
        pokedexNumber.style.animation = 'crtOff 0.5s forwards';
        ledIndicator.style.display = 'none';

        powerDownSound.currentTime = 0;
        powerDownSound.play();

        // RETIRER la classe pour revenir à l'état initial (1 colonne)
        introSectionWrapper.classList.remove('intro-active');
        document.body.classList.remove('intro-active'); // Si vous avez des styles sur le body aussi

        // Masquer la section intro après la transition du pokedex
        // On attend que la transition du pokedex soit finie pour masquer le texte
        setTimeout(() => {
            document.getElementById('intro').style.display = 'none';
            document.getElementById('intro').style.opacity = 0;
        }, 800); // Un peu moins que la durée de transition (.intro-section-wrapper)

        pokedexInstruction.classList.remove('hidden');

        isPokedexActive = false;
    } else {
        // État d'activation : afficher les infos, passer en 2 colonnes
        pokedexPhoto.style.display = 'block';
        pokedexPhoto.style.animation = 'none';
        void pokedexPhoto.offsetWidth;
        pokedexPhoto.style.animation = 'crtOn 0.5s forwards';

        pokedexInfo.style.display = 'block';
        pokedexInfo.style.animation = 'none';
        void pokedexInfo.offsetWidth;
        pokedexInfo.style.animation = 'crtOn 0.5s forwards';

        pokedexNumber.style.display = 'block';
        pokedexNumber.style.animation = 'none';
        void pokedexNumber.offsetWidth;
        pokedexNumber.style.animation = 'crtOn 0.5s forwards';

        ledIndicator.style.display = 'block';

        powerUpSound.currentTime = 0;
        powerUpSound.play();

        const introSection = document.getElementById('intro');
        introSection.style.display = 'block';

        requestAnimationFrame(() => {
            introSectionWrapper.classList.add('intro-active');
            document.body.classList.add('intro-active');
        });

        pokedexInstruction.classList.add('hidden');

        isPokedexActive = true;
    }
});
