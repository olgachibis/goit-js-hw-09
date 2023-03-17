
import Notiflix from 'notiflix';

const form = document.querySelector('form');

const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
}

function submitPromise(event) {
  event.preventDefault();

  let delay = inputDelay.valueAsNumber;
  const step = inputStep.valueAsNumber;
  const amount = inputAmount.valueAsNumber;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
    .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
    });
    
    delay += step;
  }
}

form.addEventListener('submit', submitPromise);
