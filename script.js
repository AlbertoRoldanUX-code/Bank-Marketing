'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  //Prevent default behaviour when clicking the hyperlink
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////

const message = document.createElement('div');

//Add class to message
message.classList.add('cookie-message');

//Create message
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class= "btn btn--close-cookie">Got it!</button>';

const header = document.querySelector('.header');

//Display cookie message
header.append(message);

//Close cookie message when clicking on button
const cookieBtn = document.querySelector('.btn--close-cookie');

//Remove message when clicking on the button
cookieBtn.addEventListener('click', function () {
  message.remove();
});

////

//Add style to message
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
