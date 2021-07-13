const btnStartRecord = document.getElementById('btnStartRecord');
const btnStopRecord = document.getElementById('btnStopRecord');
const texto = document.getElementById('texto');
const btnPlayText = document.getElementById('playText');

let recognition = new webkitSpeechRecognition();
recognition.lang = 'es-ES';
recognition.continuous = true;
recognition.interimResults = false;
 
recognition.onresult = (event) => {
    const results = event.results;
    const frase = results[results.length - 1][0].transcript;
    texto.value += frase;
}
recognition.onend = (event) => {
    console.log('el microfono deja de escuchar');
}

recognition.onerror = (event) => {
    console.log(event.error);
}

btnStartRecord.addEventListener('click', () => {
    recognition.start();
});

btnStopRecord.addEventListener('click', () => {
    recognition.stop();
});
btnPlayText.addEventListener('click', () => {
    leerTexto(texto.value);
});

function leerTexto(texto){
    const speech = new SpeechSynthesisUtterance();
    speech.text = texto;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}