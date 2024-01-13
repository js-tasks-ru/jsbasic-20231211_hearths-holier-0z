import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.renderMenu();
    this.initEvents();

  }

  renderMenu() {
    const ribbon = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
         ${this.categories.map(category => this.renderCategory(category)).join('')}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    `);

    return ribbon;
  }

  renderCategory(category) {
    return `
      <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
    `;
  }

  initEvents() {
    this.elem.addEventListener('click', (event) => {
      if (event.target.closest('.ribbon__item')) {
        event.preventDefault();
        this.selectCategory(event.target);
      } else if (event.target.closest('.ribbon__arrow_left')) {
          this.scroll(-350);
      } else if (event.target.closest('.ribbon__arrow_right')) {
          this.scroll(350);
      }
    });
  }

  selectCategory(target) {
    const prevActive = this.elem.querySelector('.ribbon__item_active');

    if (prevActive) {
      prevActive.classList.remove('ribbon__item_active');
    }
    target.classList.add('ribbon__item_active');

    const customEvent = new CustomEvent('ribbon-select', {
      detail: target.dataset.id,
      bubbles: true
    });

    this.elem.querySelector('.ribbon__inner').addEventListener('scroll', () => {
      this.toggleArrows();
    });
    this.elem.dispatchEvent(customEvent);
  }
  scroll(distance) {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    ribbonInner.scrollBy(distance, 0);
    this.toggleArrows();
  }

  toggleArrows() {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let scrollLeft = ribbonInner.scrollLeft;
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;

    let leftArrow = this.elem.querySelector('.ribbon__arrow_left');
    let rightArrow = this.elem.querySelector('.ribbon__arrow_right');

    if (scrollLeft === 0) {
      leftArrow.classList.remove('ribbon__arrow_visible');
    } else {
      leftArrow.classList.add('ribbon__arrow_visible');
    }

    if (scrollWidth - scrollLeft - clientWidth < 1) {
      rightArrow.classList.remove('ribbon__arrow_visible');
    } else {
      rightArrow.classList.add('ribbon__arrow_visible');
    }
  }
}
