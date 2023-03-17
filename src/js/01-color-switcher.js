function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerID = null;
btnStart.disabled = false;

function onStart() {  
  btnStart.disabled = true;
  timerID = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop() {
  clearInterval(timerID);
  btnStart.disabled = false;
}

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);

