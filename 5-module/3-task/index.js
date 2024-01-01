function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const carouselInner  =  carousel.querySelector(".carousel__inner");
  const slideWidth = carouselInner.offsetWidth;
  const totalSlides = carousel.querySelectorAll(".carousel__slide").length;
  let currentSlide = 0;

  function updateArrows() {
    const prevArrow = carousel.querySelector('.carousel__arrow_left');
    const nextArrow = carousel.querySelector('.carousel__arrow_right');

    if (currentSlide === 0) {
      prevArrow.style.display = "none";
    } else {
      prevArrow.style.display ="";
    }

    if (currentSlide === totalSlides - 1) {
      nextArrow.style.display = "none";
    } else {
      nextArrow.style.display ="";
    }
  }

  function moveCarousel(direction) {
    if (direction === "next" && currentSlide < totalSlides -1) {
      currentSlide++;
    } else if (direction === "prev" && currentSlide > 0) {
      currentSlide--;
    }

    carouselInner.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    updateArrows();
  }

  carousel.addEventListener("click", (event) => {
    let arrow = event.target.closest(".carousel__arrow");

    if (arrow.matches(".carousel__arrow_right")) {
      moveCarousel("next");
    } else if (arrow.matches(".carousel__arrow_left")) {
      moveCarousel("prev");
    }
  });

  updateArrows();
}
