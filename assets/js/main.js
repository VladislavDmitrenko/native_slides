
'use strict';

let $slides        = $('.slides-item'),
    $indContainer  = $('.indicators'),
    $indItems      = $('.indicators-item'),
    currentSlide  = 0;

const LEFT_ARROW  = 37,
      RIGHT_ARROW = 39,
      SPACE       = 32,
      FA_PAUSE    = '<i class="fas fa-pause"></i>',
      FA_PLAY     = '<i class="fas fa-play"></i>';

$indContainer.css('display', 'flex'); 
$('.controls').css('display', 'block'); 

let gotoSlide = (n) => {
  $($slides[currentSlide]).toggleClass('active');
  $($indItems[currentSlide]).toggleClass('active');
  currentSlide = (n + $slides.length) % $slides.length;
  $($slides[currentSlide]).toggleClass('active');
  $($indItems[currentSlide]).toggleClass('active');
};

let nextSlide = () => {
  gotoSlide(currentSlide + 1);
};

let previousSlide = () => {
  gotoSlide(currentSlide - 1);
};

let pauseSlideShow = () => {
  $pauseBtn.html(FA_PAUSE);
  playbackStatus = false;
  clearInterval(slideInterval);
};

let playSlideShow = () => {
  $pauseBtn.html(FA_PLAY);
  playbackStatus = true;
  slideInterval = setInterval(nextSlide, 2000);
};

let slideInterval = setInterval(nextSlide, 2000);

let playbackStatus = true,
    $pauseBtn = $('.indicators-pause'),
    $nextBtn  = $('.controls-next'),
    $prevBtn  = $('.controls-prev');

let pauseClickHandler = () => {
  playbackStatus ? pauseSlideShow() : playSlideShow();
};

let nextClickHandler = () => {
  pauseSlideShow();
  nextSlide();
};

let prevClickHandler = () => {
  pauseSlideShow();
  previousSlide();
};

$pauseBtn.on('click', pauseClickHandler);
$nextBtn.on('click', nextClickHandler);
$prevBtn.on('click', prevClickHandler);

let indClickHandler = (e) => {
  const target = e.target;
  pauseSlideShow();
  gotoSlide(+target.getAttribute('data-slide-to'));
};

$indContainer.on('click', '.indicators-item', indClickHandler);

let keyControlHandler = (e) => {
  if (e.keyCode === LEFT_ARROW) { prevClickHandler(); }
  if (e.keyCode === RIGHT_ARROW) { nextClickHandler(); }
  if (e.keyCode === SPACE) { pauseClickHandler(); }
};

$(document).on('keydown', keyControlHandler);
