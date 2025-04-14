let pattern = [2, 2, 4, 3, 2, 1, 2, 4];
let progress = 0; 
let gamePlaying = false;

let tonePlaying = false;
let volume = 0.5;

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

const clueHoldTime = 1000;
const cluePauseTime = 333;
const nextClueWaitTime = 1000;

let guessCounter = 0;


function startGame() {
  
  progress = 0;
  gamePlaying = true;

  startButton.classList.add("hidden");
  stopButton.classList.remove("hidden");
  
  playClueSequence();
}

function stopGame(){

  gamePlaying = false;
  startButton.classList.remove("hidden");
  stopButton.classList.add("hidden");
}

function lightButton(btn){

  if (btn == 1){

    document.getElementById("firstButton").classList.add("lit");
    
  } else if (btn == 2){

    document.getElementById("secButton").classList.add("lit");
    
  } else if (btn == 3){

    document.getElementById("thirdButton").classList.add("lit");
    
  } else {

    document.getElementById("fourthButton").classList.add("lit");
  }
  
}

function clearButton(btn){

  if (btn == 1){

    document.getElementById("firstButton").classList.remove("lit");

  } else if (btn == 2){

    document.getElementById("secButton").classList.remove("lit");
    
  } else if (btn == 3){

    document.getElementById("thirdButton").classList.remove("lit");
    
  } else {

    document.getElementById("fourthButton").classList.remove("lit");
  }
  
}


function playSingleClue(btn){

  if (gamePlaying){
    
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}


function playClueSequence(){

  guessCounter = 0;
  
  context.resume();
  let delay = nextClueWaitTime;

  for(let i = 0; i <= progress; i++){

    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]);
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
}

function loseGame(){

  stopGame();
  alert("You've selected an incorrect button. Game over!");
}

function winGame(){

  stopGame();
  alert("You've won the game!");
}

function guess(btn){

  console.log("user guessed: " + btn);

  if(!gamePlaying){

    return;
  }

  if (btn != pattern[guessCounter]){

    loseGame();
    
  } else if (progress != guessCounter){

    guessCounter++;
    
  } else if (progress != pattern.length - 1){

    progress++;
    playClueSequence();
    
  } else {

    winGame();
  }
}



const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  context.resume()
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    context.resume()
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    context.resume()
    tonePlaying = true
  }
}
function stopTone(){
  g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
}

// Page Initialization
// Init Sound Synthesizer
let AudioContext = window.AudioContext || window.webkitAudioContext 
let context = new AudioContext()
let o = context.createOscillator()
let g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)
