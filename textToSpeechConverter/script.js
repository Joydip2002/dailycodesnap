const voiceSelect = document.getElementById("voice");
let voices = [];

function loadVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = voices
        .map(v => `<option value="${v.name}">${v.name} (${v.lang})</option>`)
        .join("");
}

speechSynthesis.onvoiceschanged = loadVoices;

function speakText() {
    const text = document.getElementById("text").value.trim();
    if (!text) return alert("Please enter some text!");
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices.find(v => v.name === voiceSelect.value);
    if (selectedVoice) utterance.voice = selectedVoice;
    speechSynthesis.speak(utterance);
}


















