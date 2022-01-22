const promoItemSlider = document.querySelector(".promo__item--slider");
if (promoItemSlider) {
  const slidesArray = promoItemSlider.querySelectorAll(".promo__slide");
  const paginationArray = promoItemSlider.querySelectorAll(".pagination__btn");
  const prevSlideBtn = promoItemSlider.querySelector("#slider-btn-prev");
  const nextSlideBtn = promoItemSlider.querySelector("#slider-btn-next");

  const paginationClassCurrent = "pagination__btn--current";
  const slideClassCurrent = "promo__slide--current";

  const numberOfSlides = slidesArray.length;
  let currentSlide = 1;

  // function set slide and pagination by index
  function setSlide(index) {
    currentSlide = index;
    slidesArray.forEach((element) => {
      element.classList.remove(slideClassCurrent);
    });
    paginationArray.forEach((element) => {
      element.classList.remove(paginationClassCurrent);
    });
    slidesArray[index].classList.add(slideClassCurrent);
    paginationArray[index].classList.add(paginationClassCurrent);
  }

  // "who is next" function returns next slide by direction
  function calcNextSlide(isForward) {
    if (currentSlide == 0 && !isForward) {
      return numberOfSlides - 1;
    } else if (currentSlide == numberOfSlides - 1 && isForward) {
      return 0;
    } else if (currentSlide < numberOfSlides - 1 && isForward) {
      return currentSlide + 1;
    } else if (currentSlide > 0 && !isForward) {
      return currentSlide - 1;
    }
  }

  paginationArray.forEach((element, index) => {
    element.addEventListener("click", () => {
      if (index < numberOfSlides) setSlide(index);
    });
  });
  prevSlideBtn.addEventListener("click", () => {
    setSlide(calcNextSlide(false));
  });
  nextSlideBtn.addEventListener("click", () => {
    setSlide(calcNextSlide(true));
  });
}
