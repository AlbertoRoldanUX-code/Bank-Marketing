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

//Create cookie message and button
const message = document.createElement('div');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class= "btn btn--close-cookie">Got it!</button>';

//Add class to message
message.classList.add('cookie-message');

//Display cookie message
const header = document.querySelector('.header');
header.append(message);

//Close cookie message when clicking on button
const cookieBtn = document.querySelector('.btn--close-cookie');
cookieBtn.addEventListener('click', function () {
  message.remove();
});

//Add style to message
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

////Implement smooth scrolling for section 1 when clicking on Learn More button
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Smooth scrolling to sections using event delegation:
//1º Add event listener to a common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //2º Determine what element originated the event
  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Implement tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  //Select clicked tab
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active class for tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  //Add active class for tab
  clicked.classList.add('operations__tab--active');

  //Remove content
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  //Display content according to tab selected
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

////////////////////////////////////////////////////////
//Fade out all links in navbar when hovering over one of them
//Select whole nav
const nav = document.querySelector('.nav');

const handelHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    //Select link and its siblings
    const siblings = e.target.closest('nav').querySelectorAll('.nav__link');

    //Select logo
    const logo = e.target.closest('.nav').querySelector('img');

    //Change opacity of siblings
    siblings.forEach(el => {
      if (el !== e.target) el.style.opacity = this;
    });

    //Change opacity of logo
    logo.style.opacity = this;
  }
};

//Passing an "argument" into the handler function
// When hovering
nav.addEventListener('mouseover', handelHover.bind(0.5));

//////////////////////////////
// When the mouse leaves the nav
nav.addEventListener('mouseout', handelHover.bind(1));
