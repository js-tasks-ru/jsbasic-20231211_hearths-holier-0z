import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({steps: 5, value: 3 });
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
    this.productsGrid = null;
    this.onProductAdd = this.onProductAdd.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.onRibbonSelect = this.onRibbonSelect.bind(this);
    this.onNutsCheckboxChange = this.onNutsCheckboxChange.bind(this);
    this.onVegeterianCheckboxChange = this.onVegeterianCheckboxChange.bind(this);
  }

  async render() {
    const carouselHolder = document.querySelector('[data-carousel-holder]');
    const ribbonMenuHolder = document.querySelector('[data-ribbon-holder]');
    const stepSliderHolder = document.querySelector('[data-slider-holder]');
    const cartIconHolder = document.querySelector('[data-cart-icon-holder]');

    carouselHolder.appendChild(this.carousel.elem);
    ribbonMenuHolder.appendChild(this.ribbonMenu.elem);
    stepSliderHolder.appendChild(this.stepSlider.elem);
    cartIconHolder.appendChild(this.cartIcon.elem);

    const products = await this.fetchProductsFromServer();
    await this.renderProductsGrid(products);

    this.updateProductsFilter();

    document.body.addEventListener('product-add', this.onProductAdd);
    this.stepSlider.elem.addEventListener('slider-change', this.onSliderChange);
    this.ribbonMenu.elem.addEventListener('ribbon-select', this.onRibbonSelect);
    document.getElementById('nuts-checkbox').addEventListener('change', this.onNutsCheckboxChange);
    document.getElementById('vegeterian-checkbox').addEventListener('change', this.onVegeterianCheckboxChange);
  }

  async fetchProductsFromServer() {
    try {
      const response = await fetch('products.json');

      if (!response.ok) {
        throw new Error('Ошибка получения данных с сервера');
      }
      const products = await response.json();
      return products;

    } catch (error) {
      console.error('Произошла ошибка:', error);
      return null;
    }
  }

  async renderProductsGrid(products) {
    const productsGridHolder = document.querySelector('[data-products-grid-holder]');
    if (products) {
      this.productsGrid = new ProductsGrid(products);
      productsGridHolder.innerHTML = '';
      productsGridHolder.appendChild(this.productsGrid.elem);
    }
  }

  onProductAdd(event) {
    const productId = event.detail;
    this.cart.addProduct(productId);
  }

  onSliderChange(event) {
    const value = event.detail;
    this.productsGrid.updateFilter({ maxSpiciness: value });
  }

  onRibbonSelect(event) {
    const categoryId = event.detail;
    this.productsGrid.updateFilter({ category: categoryId });
  }

  onNutsCheckboxChange() {
    this.updateProductsFilter();
  }

  onVegeterianCheckboxChange() {
    this.updateProductsFilter();
  }

  updateProductsFilter() {
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
  }
}

