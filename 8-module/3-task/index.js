export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (cartItem) {
      cartItem.count++;
    } else {
      cartItem = { product, count: 1 };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate();
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    if (cartItem) {
      cartItem.count += amount;
      if (cartItem.count <= 0) {
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
      }
      this.onProductUpdate();
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.count), 0);
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
  }
}

