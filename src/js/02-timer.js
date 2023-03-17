import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button');
const sec = document.querySelector('span[data-seconds]');
const min = document.querySelector('span[data-minutes]');
const hour = document.querySelector('span[data-hours]');
const day = document.querySelector('span[data-days]');
let timerId = null;
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {   
    if (selectedDates[0] > new Date()) {
      btnStart.disabled = false;
    } else {
      btnStart.disabled = true;
      Notiflix.Notify.failure("Please choose a date in the future");
    }

    btnStart.addEventListener('click', () => {
      timerId = setInterval(() => {
        const deltaTime = selectedDates[0] - new Date();
        if (deltaTime < 0) {
          clearInterval(timerId);
          return;
    }
        updateTime(convertMs(deltaTime));
        }, 1000);
    });
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateTime({ days, hours, minutes, seconds }) {
  day.textContent = days;
  hour.textContent = hours;
  min.textContent = minutes;
  sec.textContent = seconds;
   
}

flatpickr("#datetime-picker", options);