import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.renderCarousel();
    this.currentSlide = 0;
    this.totalSlides = this.elem.querySelectorAll(".carousel__slide").length;
  }

  renderCarousel() {
    const carousel = createElement(`
      <div class="carousel">
          <div class="carousel__arrow carousel__arrow_right">
              <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </div>
          <div class="carousel__arrow carousel__arrow_left" style="display: none;">
              <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
          </div>
          <div class="carousel__inner">
              ${this.slides.map(slide => this.renderSlide(slide)).join('')}
          </div>
      </div>
    `);

    carousel.addEventListener('click', event => {
      let button = event.target.closest('.carousel__button');

      if (button) {
        let slideId = button.closest('.carousel__slide').dataset.id;
        let customEvent = new CustomEvent("product-add", {
          detail: slideId,
          bubbles: true
        });
        carousel.dispatchEvent(customEvent);
      }

      let arrow = event.target.closest(".carousel__arrow");

      if (arrow && arrow.matches(".carousel__arrow_right")) {
        this.moveCarousel("next");
      } else if (arrow && arrow.matches(".carousel__arrow_left")) {
        this.moveCarousel("prev");
      }
    });

    return carousel;
  }

  renderSlide(slide) {
    return `
      <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
          </div>
      </div>
    `;
  }

  moveCarousel(direction) {
    const carouselInner = this.elem.querySelector(".carousel__inner");
    let slideWidth = carouselInner.offsetWidth;

    if (direction === "next" && this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
    } else if (direction === "prev" && this.currentSlide > 0) {
      this.currentSlide--;
    }

    carouselInner.style.transform = `translateX(-${this.currentSlide * slideWidth}px)`;
    this.updateArrows();
  }

  updateArrows() {
    const prevArrow = this.elem.querySelector('.carousel__arrow_left');
    const nextArrow = this.elem.querySelector('.carousel__arrow_right');

    if (this.currentSlide === 0) {
      prevArrow.style.display = "none";
    } else {
      prevArrow.style.display = "";
    }

    if (this.currentSlide === this.totalSlides - 1) {
      nextArrow.style.display = "none";
    } else {
      nextArrow.style.display = "";
    }
  }
}
