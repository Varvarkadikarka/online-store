import Page from '../../components/page';
import Cart from '../../components/cart/cart';

class CartPage extends Page {
  private cart: Cart;

  constructor(className: string) {
    super(className);
    this.cart = new Cart('div', 'container');
  }

  render() {
    this.appendBlock(this.cart.render());
    return this.mainEl;
  }
}

export default CartPage;
