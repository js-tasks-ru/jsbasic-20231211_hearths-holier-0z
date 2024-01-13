export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.renderSlider();
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');

    this.thumb.ondragstart = () => false;

    this.thumb.addEventListener('pointerdown', this.onPointerDown);
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

  onPointerDown = (event) => {
    event.preventDefault();

    this.elem.classList.add('slider_dragging');

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerMove = (event) => {
    event.preventDefault();
    if (this.elem.classList.contains('slider_dragging')) {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      if (leftRelative < 0) {
        leftRelative = 0;
      }

      if (leftRelative > 1) {
        leftRelative = 1;
      }

      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);

      this.thumb.style.left = `${leftRelative * 100}%`;
      this.progress.style.width = `${leftRelative * 100}%`;

      if (value !== this.value) {
        this.setValue(value);
      }
    }
  }

  onPointerUp = () => {
    this.elem.classList.remove('slider_dragging');
    this.emitSliderChangeEvent();

    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
  }

  setValue(newValue) {
    if (newValue !== this.value) {
      this.value = newValue;
      this.elem.querySelector('.slider__value').textContent = newValue;

      let steps = this.elem.querySelectorAll('.slider__steps span');
      steps.forEach((step, index) => {
        if (index === this.value) {
          step.classList.add('slider__step-active');
        } else {
          step.classList.remove('slider__step-active');
        }
      });

      this.emitSliderChangeEvent();
    }
  }

  emitSliderChangeEvent() {
    const event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
  }
}
