const drumPadsInfo = [{
  id: "heater-1",
  innerText: "Q",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
}, {
  id: "heater-2",
  innerText: "W",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
}, {
  id: "heater-3",
  innerText: "E",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
}, {
  id: "heater-4",
  innerText: "A",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
}, {
  id: "clap",
  innerText: "S",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
}, {
  id: "open-hh",
  innerText: "D",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
}, {
  id: "kick-n-hat",
  innerText: "Z",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
}, {
  id: "kick",
  innerText: "X",
  src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
}, {
  id: "closed-hh",
  innerText: "C",
  src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
}];

const drumMachine = document.getElementById("drum-machine");
const drumMachineDisplay = document.getElementById("display");

drumPadsInfo.forEach((drumPadInfo) => createDrumPadElem(drumPadInfo));

document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event) {
  const targetAudioElem = document.getElementById(event.key.toUpperCase());

  if (targetAudioElem) {
    targetAudioElem.play();
  }
}

function createDrumPadElem(drumPadInfo) {
  const drumPadButton = document.createElement("button");
  drumPadButton.classList.add("drum-pad");
  drumPadButton.id = drumPadInfo.id;
  drumPadButton.innerText = drumPadInfo.innerText;

  const drumPadAudio = document.createElement("audio");
  drumPadAudio.classList.add("clip");
  drumPadAudio.id = drumPadInfo.innerText;
  drumPadAudio.src = drumPadInfo.src;

  drumPadButton.appendChild(drumPadAudio);
  drumMachine.appendChild(drumPadButton);

  drumPadButton.addEventListener("click", handleDrumPadClick);
  drumPadAudio.addEventListener("play", handleDrumPadPlay);
}

function handleDrumPadPlay(event) {
  drumMachineDisplay.innerText = event.target.id;
}

function handleDrumPadClick(event) {
  const audios = event.target.getElementsByTagName("audio");
  for (const audio of audios) {
    audio.play();
  }
}
