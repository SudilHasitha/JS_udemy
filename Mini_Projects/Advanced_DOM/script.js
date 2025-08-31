'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const bntScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

bntScrollTo.addEventListener('click', (e) => {
  const slcoords = section1.getBoundingClientRect();
  section1.scrollIntoView({behavior: 'smooth'})
})

// document.querySelector('.nav__link').forEach(
//   (el) => {
//     el.addEventListener('click', (e) => {
//       e.preventDefault()
//       const id = this.getAttribute('href');
//       document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//     })
//   }
// )

document.querySelector('.nav__links').addEventListener('click', (e) => {
  e.preventDefault()
  if (e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer =document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Event delegation: add event listener to parent element
tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  // Activate tab
  clicked.classList.add('operations__tab--active');
  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  
  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

//menu fade animation
const nav = document.querySelector('.nav');

const handleHover = function(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    })
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5))

nav.addEventListener('mouseout', handleHover.bind(1))

// Sticky navigation
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entities){
  const [entity] = entities;
  if (!entity.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function(entities, observer) {
  entities.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  })
}

const sectionObserver = new IntersectionObserver(
  revealSection, {
    root: null,
    threshold: 0.15
  }
)
allSections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
  }
)

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function(entities, observer) {
  const [entry] = entities;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
})
imgTargets.forEach((img) => {
  imgObserver.observe(img);
})

// Slider

const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function() {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    })
  }
  createDots();

  const goToSlide = function(slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - slide) * 100}%)`;
    })
  }
  goToSlide(0);

  const nextSlide = () => {
    curSlide = (curSlide + 1) % maxSlide;
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const prevSlide = () => {
    curSlide = (curSlide - 1 + maxSlide) % maxSlide;
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', (e) => {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  })

  const activateDot = function(slide) {
    document.querySelectorAll('.dots__dot').forEach((dot) => {
      dot.classList.remove('dots__dot--active');
    })
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  }
  activateDot(0);

  //se event delegation
  dotContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      curSlide = slide;
      activateDot(slide);
    }
  })
}
slider()