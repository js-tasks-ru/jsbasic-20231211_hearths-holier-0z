import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filteredProducts = products;
    this.filters = {};
    this.render();
  }

  render() {
    if (!this.elem) {
      this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
          ${this.filteredProducts.map(product => new ProductCard(product).elem.outerHTML).join('')}
        </div>
      </div>
    `);
    } else {
      let innerElem = this.elem.querySelector('.products-grid__inner');
      innerElem.innerHTML = this.filteredProducts.map(product => new ProductCard(product).elem.outerHTML).join('');
    }
  }

  updateFilter(filters) {
    this.filters = {...this.filters, ...filters};

    this.filteredProducts = this.products.filter(product => {
      let passFilter = true;
      if (this.filters.noNuts !== undefined && this.filters.noNuts !== null) {
        if (this.filters.noNuts && (product.nuts === undefined || product.nuts === false)) {
          passFilter = passFilter && true;
        } else if (!this.filters.noNuts) {
          passFilter = passFilter && true;
        } else {
          passFilter = passFilter && false;
        }
      }
      if (this.filters.vegeterianOnly !== undefined && this.filters.vegeterianOnly !== null) {
        if (this.filters.vegeterianOnly && product.vegeterian === true) {
          passFilter = passFilter && true;
        } else if (!this.filters.vegeterianOnly) {
          passFilter = passFilter && true;
        } else {
          passFilter = passFilter && false;
        }
      }
      if (this.filters.maxSpiciness !== undefined && this.filters.maxSpiciness !== null) {
        if (product.spiciness <= this.filters.maxSpiciness) {
          passFilter = passFilter && true;
        } else {
          passFilter = passFilter && false;
        }
      }
      if (this.filters.category) {
        if (product.category === this.filters.category) {
          passFilter = passFilter && true;
        } else {
          passFilter = passFilter && false;
        }
      }
      return passFilter;
    });

    this.render();
  }
}
