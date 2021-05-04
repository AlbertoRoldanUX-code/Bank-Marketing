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
document.querySelector('.nav-links').addEventListener('click', function (e) {
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

// When the mouse leaves the nav
nav.addEventListener('mouseout', handelHover.bind(1));

//Implement a sticky navigation using the intersection observer API

//3º Create callback function
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

//2º Create options for observer
const navHeight = nav.getBoundingClientRect().height;
const observerOptions = {
  root: null,
  threshold: [0, 0.2],
  rootMargin: `-${navHeight}px`,
};

//1º Create a new intersection observer
const headerObserver = new IntersectionObserver(stickyNav, observerOptions);
headerObserver.observe(header);
//Revealing elements on scroll
//1º Give sections the class .section--hidden

//2º Remove .section--hidden class as you approach the sections

//2.3º Create callback function
const revealSection = function (entries, observer) {
  const [entry] = entries;

  //Remove class when target is intersecting
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  //Unobserve sections
  observer.unobserve(entry.target);
};

//2.2º Create options for observer
const obsOptions = {
  root: null,
  threshold: 0.15,
};

//2.1º Create a new intersection observer
const sectionObserver = new IntersectionObserver(revealSection, obsOptions);
const allSections = document.querySelectorAll('.section');
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

////////////////////////////////////////////////////////
//Implement lazy loading images strategy
//1º Get placeholders images (of around 15 kilobytes) at reduceimages.com.
//2º Reference placeholder image in the src of img.
//3º Create class of lazy-img {filter: blur(20px)}
//4º Give the images the class of lazy-img
//5º Reference real image in a data-src attribute.
//6º Select all images which have the property of data-src
const imgTargets = document.querySelectorAll('img[data-src]');

//7º Create callback function
const loadImg = function (entries, observer) {
  const [entry] = entries;

  //If they are not intersecting, we want an early return
  if (!entry.isIntersecting) return;
  //8º Replace src attribute for data-src
  entry.target.src = entry.target.dataset.src;
  //9ºRemove lazy-img class.
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

//10º Create image observer
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

//11º Attach imgObserver to all targets
imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////
//Implement slider component
const slider = function () {
  const slides = document.querySelectorAll('.slide');

  //Put all slides side by side
  slides.forEach((s, i) => (s.style.transform = `translateX(${i}00%)`));

  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  let curSlide = 0;
  let maxSlide = slides.length - 1;

  //Create dots
  const dotContainer = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  //Give different background color to dot with active slide
  const activateDot = function (slide) {
    //Select all dots and remove class
    // document
    //   .querySelectorAll('.dots__dot')
    //   .forEach(dot => dot.classList.remove('.dots__dot--active'));

    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    //Give active class to dot with current slide
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //Push slides to the left
  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //Push slides to the right
  const previousSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //Event handlers
  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', previousSlide);

  //Handle keyboard events
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      previousSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  //Make dots work
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      //Go to selected slide
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
