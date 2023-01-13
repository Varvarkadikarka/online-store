import Component from '../component';
import Modal from '../../components/modal-form/modal-form';
import LocalStorage from '../../data/localStorage';
import PRODUCTS from '../../data/products';
import CartItem from './cartItem';
import SuccessPurchase from '../modal-form/successPurchase';
import { IProduct, IProductInStorage } from '../../types/interfaces';
import Header from '../header/header';
import { addParams, getParamsSpecificValue } from '../../helpers/hash';
import { promos } from '../../types/constants';
import CartPromos from './cartPromo';
import CartPagination from './cartPagination';
import { countDiscountPrice } from '../../helpers/utils';

class Cart extends Component {
  private modal: Modal;
  private sucessPurchase: SuccessPurchase;
  private localStorage: LocalStorage;
  private products: IProduct[] = [];
  private productsComponents: CartItem[] = [];
  private productsInStore;
  private header: Header;
  private cartPromos: CartPromos;
  private cartPagination: CartPagination;
  private activePromoPriceClass: string;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.modal = new Modal('div', 'container');
    this.sucessPurchase = new SuccessPurchase('div', 'container');
    this.localStorage = new LocalStorage();
    this.getProducts();
    this.productsInStore = this.localStorage.getProducts();
    this.header = new Header();
    this.cartPagination = new CartPagination('div', 'pagination');
    this.cartPromos = new CartPromos('div', 'card__promos');
    this.activePromoPriceClass = this.checkActivatedPromo();
  }

  getProducts() {
    this.products = PRODUCTS;
    this.productsComponents = this.products.map((product) => new CartItem(product));
  }

  getTotalAmount() {
    const totalAmount: number[] = [];
    this.productsInStore.forEach((product: IProductInStorage) => {
      totalAmount.push(product.count);
    });
    return totalAmount.length > 0 ? totalAmount.reduce((a, b) => a + b) : 0;
  }

  getTotalCost() {
    const productsPrices: number[] = [];
    this.productsInStore.forEach((product: IProduct) => {
      productsPrices.push(product.price);
    });
    return productsPrices.length > 0 ? productsPrices.reduce((a, b) => a + b) : 0;
  }

  getPromoSales() {
    const sales = getParamsSpecificValue('promo')?.split('↕') ?? [''];
    const resultArr: number[] = [];
    sales.forEach((value) => {
      if (typeof value === 'string') {
        const promoItem = promos.find((item) => item.name === value) ?? { name: 'fake', value: 0 };
        const promoAmount = promoItem.value;
        resultArr.push(promoAmount);
      }
    });
    if (resultArr.length === 0) {
      return [0];
    }

    return resultArr;
  }

  checkActivatedPromo() {
    const isPromoActive = getParamsSpecificValue('promo');
    if (isPromoActive) {
      return 'active';
    }

    return '';
  }

  renderCart() {
    const container = document.createElement('div');
    container.className = 'cart';
    const productsInCart: number[] = [];
    const filteredItems: CartItem[] = [];

    this.productsInStore.forEach((product: IProduct) => {
      productsInCart.push(product.id);
    });

    this.productsComponents.forEach((product) => {
      if (productsInCart.indexOf(product.getId()) !== -1) {
        filteredItems.push(product);
      }
    });

    const emptyHtml = `
      <div class="cart__empty">КОРЗИНА ПУСТА</div>
    `;

    const promos = this.cartPromos.addPromos();

    const html = `
      <ul class="catalog__list">
        ${filteredItems.map((product) => product.render()).join(' ')}
      </ul>
      <div class="cart__summary">
        <h3 class="cart__title">ИТОГО</h3>
        <div class="cart__amount"><span>Количество товаров:</span>
          <div class="product__price">${this.getTotalAmount()}</div>
        </div>
        <div class="cart__price"><span>Стоимость товаров:</span>
          <div class="cart__price-full ${this.activePromoPriceClass}">${this.getTotalCost()}₽
          <span class="cart__price-discount">${countDiscountPrice(
            this.getTotalCost(),
            this.getPromoSales()
          )} ₽</span>
          </div>
        </div>
          ${promos}
        <div class="cart__promocode">
          <div class="cart__container">
            <input class="cart__input" type="search" placeholder="Введите промокод" value="" type="text">
            <button class="product__button product__button_click cart__promo-add" disabled>Добавить</button>
          </div>
            <div class="cart__promocode-value"></div>
            <div class="cart__promocode-example">Например: "rs", "Student1"</div>
        </div>
        <button class="product__button product__button_cart cart__button" id="buy">
          Купить
        </button>
      </div>
      `;

    if (filteredItems.length === 0) {
      container.innerHTML = emptyHtml;
    } else {
      container.innerHTML = html;
    }

    this.container.append(this.cartPagination.render());
    this.container.append(container);
    this.container.append(this.modal.render());
    this.container.append(this.sucessPurchase.render());
  }

  render() {
    this.renderCart();
    this.eventListener();
    return this.container;
  }

  eventListener() {
    const inputPromo = <HTMLInputElement>this.container.querySelector('.cart__input');
    const addPromo = this.container.querySelector('.cart__promo-add');
    const promoCheckboxs = this.container.querySelectorAll('.filters__input  ');
    const page = getParamsSpecificValue('page') ?? '1';
    const perItem = getParamsSpecificValue('item') ?? '3';
    const pagination = this.container.querySelectorAll('.catalog__item');
    const endInd = +page * +perItem - 1;
    const step = +perItem;

    // Plus/Minus buttons

    this.container.querySelectorAll('button').forEach((el) => {
      el.addEventListener('click', (e) => {
        const target = <HTMLButtonElement>e.target;
        if (target.innerText === '-' || target.innerText === '+') {
          const paramName = target.name;
          const paramValue = target.value;
          addParams(paramName, paramValue);
          this.changePlusMinus(target);
        }
      });
    });

    // Promocode

    inputPromo?.addEventListener('keyup', (e) => {
      const target = <HTMLInputElement>e.target;
      const promoValue = target.value.toLocaleLowerCase();
      const button = <HTMLButtonElement>this.container.querySelector('.cart__promo-add');
      button.disabled = true;
      const index = promos.findIndex((item) => item.name.toLocaleLowerCase() === promoValue);
      if (index !== -1) {
        const promocodeExampleEl = <HTMLDivElement>(
          this.container.querySelector('.cart__promocode-value')
        );
        promocodeExampleEl.innerHTML = `Скидка по промокоду ${promos[index].name} =  ${promos[index].value}%`;

        button.disabled = false;
      }
    });

    addPromo?.addEventListener('click', () => {
      if (inputPromo) {
        addParams('promo', inputPromo.value.toLocaleLowerCase());
        inputPromo.value = '';
      }
    });

    // Checkboxes

    promoCheckboxs.forEach((item) =>
      item.addEventListener('change', (e) => {
        const input = <HTMLInputElement>e.target;
        const name = input.name;
        const value = input.value;
        addParams(name, value);
      })
    );

    // Pagination

    for (let i = 0; i < step; i++) {
      if (pagination[endInd - i]) {
        pagination[endInd - i].classList.toggle('hide');
      }
    }
  }

  changePlusMinus(button: HTMLElement) {
    const counterWrapper = button.closest('.product__count');
    const counter = counterWrapper?.querySelector('.product__count_amount') as HTMLElement;
    const product = button.closest('.cart__row') as HTMLElement;
    const stock = product.querySelector('.product__stock-value') as HTMLButtonElement;

    if (button.classList.value === 'product__count_plus') {
      if (counter && parseInt(counter.innerText) < parseInt(stock.innerText)) {
        counter.innerText = String(this.localStorage.getOneTypeProductsAmount(product.id) + 1);
        this.localStorage.putOneTypeProducts(product.id, true);
        this.header.render();
      }
    }

    if (button.classList.value === 'product__count_minus') {
      if (parseInt(counter.innerText) >= 1) {
        counter.innerText = String(this.localStorage.getOneTypeProductsAmount(product.id) - 1);
        this.localStorage.putOneTypeProducts(product.id, false);
        this.header.render();
      }
      if (parseInt(counter.innerText) < 1) {
        this.localStorage.putProducts(parseInt(product.id), 0);
        this.header.render();
      }
    }
  }
}

export default Cart;
