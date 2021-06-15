// import
import click1 from './src/script1.js';
import click2 from './src/script2.js';

// DOM
let formOrder1 = document.querySelector('#order form');
let formCheck2 = document.querySelector('#check form');
let modal = document.querySelector('#modal');
let overlay = document.querySelector('#overlay');
let btnOpenModal1 = document.querySelector('#order form');
let btnOpenModal2 = document.querySelector('#check form');
let btnCloseModal = document.querySelector('#close-modal');

// Event submit
formOrder1.addEventListener('submit', click1);
formCheck2.addEventListener('submit', click2);

// Open Modal
btnOpenModal1.addEventListener('submit', e => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

btnOpenModal2.addEventListener('submit', e => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

// Close modal
let closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Reload
btnCloseModal.addEventListener('click', e => {
  location.reload();
});
