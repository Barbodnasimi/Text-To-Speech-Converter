const textInput = document.querySelector('textarea')
const convertBtn = document.querySelector('button')
const synth = window.speechSynthesis;
const voiceSelect = document.querySelector('#voiceSelect');
let utterance = null;

function populateVoiceList(){
    const voices = synth.getVoices()
    voices.forEach((voice , index) =>{
        const option = document.createElement('option')
        option.value = index
        option.textContent = `${voice.name}-${voice.lang}`
        voiceSelect.append(option)
    })
}

// Fetch voices when the page loads
populateVoiceList();

// Listen for voiceschanged event and update the list
synth.onvoiceschanged = populateVoiceList

convertBtn.addEventListener('click', () => {
    const textToConvert = textInput.value;
    const selectedVoiceIndex = voiceSelect.value

    if (synth.speaking) {
        synth.cancel();
    }

    utterance = new SpeechSynthesisUtterance(textToConvert);
    utterance.voice = synth.getVoices()[selectedVoiceIndex];
    synth.speak(utterance);

});

