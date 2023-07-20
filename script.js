'use strict'

const textarea = document.querySelector('textarea');
const btn = document.querySelector('button');
const voiceList = document.querySelector('select');
let isSpeaking = true;

function voices() {
    for (let voice of speechSynthesis.getVoices()) {
        const selected = voice.name === "Google US English" ? 'selected' : '';
        const option = `<option value ="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML('beforeend', option)
    }
}
speechSynthesis.addEventListener('voiceschanged', voices)

function convertText(text) {
    const talk = new SpeechSynthesisUtterance(text);
    for (let voice of speechSynthesis.getVoices()) {
        if (voice.name === voiceList.value) {
            talk.voice = voice;
        }
    }
    speechSynthesis.speak(talk)
}

btn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('working');

    if (textarea.value !== '') {
        if (!speechSynthesis.speaking) {
            convertText(textarea.value)
        }
        if (isSpeaking) {
            isSpeaking = false;
            btn.innerText = 'Pause Speech';
            speechSynthesis.resume();
        } else {
            isSpeaking = true;
            btn.innerText = 'Resume Speech';
            speechSynthesis.pause();
        }
        setInterval(() => {
            if (!speechSynthesis.speaking && !isSpeaking) {
                isSpeaking = true;
                btn.innerText = 'Convert Text To Speech';
            }
        })
    } else {
        btn.innerText = 'Convert Text To Speech';
    }
})