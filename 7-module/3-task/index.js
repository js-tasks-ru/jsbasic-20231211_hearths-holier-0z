export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.renderSlider();
  }

  renderSlider() {
    const slider = document.createElement('div');
    slider.className = 'slider';

    let stepsHTML = '';
    for (let i = 0; i < this.steps; i++) {
      const step = i === this.value ? 'slider__step-active' : '';
      stepsHTML += `<span class="${step}"></span>`;
    }

    slider.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: ${this.value / (this.steps - 1) * 100}%"></div>
      <div class="slider__steps">${stepsHTML}</div>
    `;

    slider.addEventListener('click', (event) => {
      const left = event.clientX - slider.getBoundingClientRect().left;
      const leftRelative = left / slider.offsetWidth;
      let approximateValue = leftRelative * (this.steps - 1);
      let value = Math.round(approximateValue);
      this.value = value;
      this.updateSlider(slider);
      this.emitSliderChangeEvent();
    });

    return slider;
  }

  updateSlider(slider) {
    const thumb = slider.querySelector('.slider__thumb');
    const progress = slider.querySelector('.slider__progress');
    const valueSpan = slider.querySelector('.slider__value');
    const steps = slider.querySelectorAll('.slider__steps span');

    valueSpan.textContent = this.value;
    steps.forEach((step, index) => {
      if (index === this.value) {
        step.classList.add('slider__step-active');
      } else {
        step.classList.remove('slider__step-active');
      }
    });

    const valuePercents = this.value / (this.steps - 1) * 100;
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
  }

  emitSliderChangeEvent() {
    const event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
  }
}
