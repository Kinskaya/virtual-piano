const KEYS = document.querySelectorAll(".piano-key");
const PIANO = document.getElementById("piano");

const startSound = (event) => {
    playAudioClick(event);
}

const stopSound = (event) => {
   event.target.classList.remove("piano-key-active");
}

const startCorrespondOver = (event) => {
    if (event.target.classList.contains("piano-key")) {
        event.target.classList.add("piano-key-active");
    }
    KEYS.forEach((elem) => {
        elem.addEventListener("mouseover", startSound)
        elem.addEventListener("mouseout", stopSound)
    });
}

const stopCorrespondOver = () => {
    KEYS.forEach((elem) => {
        elem.classList.remove("piano-key-active");
        elem.removeEventListener("mouseover", startSound)
        elem.removeEventListener("mouseout", stopSound)
    });
}

PIANO.addEventListener("mousedown", startCorrespondOver, false);
PIANO.addEventListener("mouseup", stopCorrespondOver);


// Play by keys

function playAudio (event) {
    const audio = document.querySelector(`audio[data-key="${event.code}"]`);
    const key = document.querySelector(`.piano-key[data-key="${event.code}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('piano-key-active');
}

function removeTransition (event) {
    if (event.propertyName !== 'transform') return;
    this.classList.remove('piano-key-active');
}

KEYS.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playAudio);

// Play by click

function playAudioClick (event) {
    if (event.which == 1 || event.which == 2 || event.which == 3) {
        if(event.target.classList.contains('piano-key')) {
            const audio =  document.querySelector(`audio[data-key=` + event.target.dataset.key + `]`);
            if (!audio) return;
            audio.currentTime = 0;
            audio.play();
            event.target.classList.add('piano-key-active');
        }
    }
}
PIANO.addEventListener('mousedown', playAudioClick)

// FullScreen

document.addEventListener("keypress", function(event) {
    if (event.code === "Enter") {
        toggleFullScreen();
    }
}, false);

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

const fullscreen = document.querySelector('.fullscreen')

fullscreen.addEventListener("click", toggleFullScreen)

// Notes/Letters

const buttons = document.querySelectorAll(".btn");

for (let button of buttons) {
    button.addEventListener('click', function() {
        if (this.classList.contains('btn-active')) return;
        buttons.forEach(i => i.classList.remove('btn-active'));
        this.classList.add('btn-active');
        PIANO.classList.toggle('new-style');
    });
};

