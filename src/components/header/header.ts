import ComponentHF from '../componentHeader';
import { PageLinks } from '../../types/constants';
import LocalStorage from '../../data/localStorage';
import { IProductInStorage } from '../../types/interfaces';

const logo = require('../../assets/img/logo/logo.png');

class Header extends ComponentHF {
  private localStorage: LocalStorage;

  constructor() {
    super();
    this.localStorage = new LocalStorage();
  }

  countPrice() {
    const totalPrice: number[] = [];
    const productsInStorage = this.localStorage.getProducts();
    productsInStorage.forEach((product: IProductInStorage) => {
      totalPrice.push(product.price);
    });
    return totalPrice.length > 0 ? totalPrice.reduce((a: number, b: number) => a + b) : 0;
  }

  countProducts() {
    const totalAmount: number[] = [];
    const productsInStorage = this.localStorage.getProducts();
    productsInStorage.forEach((product: IProductInStorage) => {
      totalAmount.push(product.count);
    });
    return totalAmount.length > 0 ? totalAmount.reduce((a, b) => a + b) : 0;
  }

  render() {
    const oldHeader = document.querySelector(`.header__container`);

    if (oldHeader) {
      oldHeader.remove();
    }

    const container = document.createElement('div');
    container.className = 'container  header__container';

    const componentCode = `
    <a class="header__logo" href="#${PageLinks[0].id}?">
      <img src="${logo}" alt="Site Logo!" class="header__logo-pic">
    </a>
    <div class="header__order">
      <div class="header__amount">
        <span class="header__sum">${this.countPrice()}</span>
        <span class="header__currency">₽</span>
      </div>
      <a class="header__cart header__cart_filled" href="#${PageLinks[1].id}?">
        <span class="header__cart-counter">${this.countProducts()}</span>
      </a>
    </div>
    `;

    container.innerHTML = componentCode;

    this.wrapper.prepend(container);
  }
}

export default Header;
