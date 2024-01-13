import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = this.renderModal();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  renderModal() {
    const modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon">
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);

    document.body.append(modal);
    document.body.classList.add('is-modal-open');

    const closeButton = modal.querySelector('.modal__close');
    closeButton.addEventListener('click', () => this.close());

    document.addEventListener('keydown', this.handleKeyDown);

    return modal;
  }

  setTitle(title) {
    this.modal.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    const modalBody = this.modal.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.append(node);
  }

  open() {
    this.modal.classList.add('open');
  }

  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event)  => {
    console.log(event)
    if (event.code === 'Escape') {
      console.log(event.code === 'Escape')
      this.close();
    }
  }
}
