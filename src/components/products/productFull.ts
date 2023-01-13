import PRODUCTS from '../../data/products';
import Component from '../component';
import LocalStorage from '../../data/localStorage';
import Header from '../header/header';
import { ItemCart } from '../../types/types';

class ProductFull extends Component {
  private id: number;
  private localStorage: LocalStorage;
  private header: Header;
  private labelAdd: string;
  private labelRemove: string;

  constructor(tagName: string, className: string, id: number) {
    super(tagName, className);
    this.id = id;
    this.localStorage = new LocalStorage();
    this.header = new Header();
    this.labelAdd = 'Добавить в корзину';
    this.labelRemove = 'Удалить из корзины';
  }

  renderProduct() {
    const id = this.id;
    const item = PRODUCTS.filter((item) => {
      return item.id === id;
    })[0];

    return `
    <article class="product" id="${item.id}">
            <div class="product__photo">
              <div class="product__photo-main">
                <img src="${item.thumbnail}" alt="Product image"
                  class="product__img">
              </div>
              <ul class="product__thumbnails">
                <li class="product__thumbnail active">
                  <button class="product__thumbnail-pic"></button>
                </li>
                <li class="product__thumbnail">
                  <button class="product__thumbnail-pic"></button>
                </li>
                <li class="product__thumbnail">
                  <button class="product__thumbnail-pic"></button>
                </li>
              </ul>
            </div>
            <div class="product__content">
              <div class="product__info">
                <h3 class="product__name">${item.title}</h3>
                <div class="product__price active">${item.price} ₽
                  <span class="product__discount-price">50000 ₽</span>
                </div>
              </div>
              <div class="product__full-info">
                <h4 class="product__description">Описание товара:</h4>
                <p class="product__text">${item.description}
                </p>
                <div class="product__stock">В наличии:
                  <span class="product__stock-value">${item.stock}</span>
                </div>
                <div class="product__category">Категория:
                  <span class="product__category-value">${item.category}</span>
                </div>
                <div class="product__color">Цвет:
                  <span class="product__color-value">${item.color}</span>
                </div>
                <div class="product__material">Материал:
                  <span class="product__material-value">${item.material}</span>
                </div>
              </div>
              <div class="product__buttons">
                <button class="product__button product__button_cart">
                  ${this.changeButtonLabel()}
                </button>
                <button class="product__button product__button_click">
                  Купить в один клик
                </button>
              </div>
            </div>
          </article>
    `;
  }

  render() {
    this.container.innerHTML = this.renderProduct();
    this.eventListener();
    return this.container;
  }

  changeButtonLabel() {
    const productsStore = this.localStorage.getProducts();
    const index = productsStore.findIndex((object: ItemCart) => object.id === this.id);
    let activeText = '';

    if (index === -1) {
      activeText = this.labelAdd;
    } else {
      activeText = this.labelRemove;
    }
    return activeText;
  }

  handleSetLocationStorage(element: HTMLElement, id: number) {
    const pushProduct = this.localStorage.getButtonState(id);
    if (pushProduct) {
      element.innerHTML = this.labelRemove;
    } else {
      element.innerHTML = this.labelAdd;
    }
  }

  eventListener() {
    this.container.querySelectorAll('.product__button').forEach((el) => {
      el.addEventListener('click', (event) => {
        const currentButton = <HTMLButtonElement>event.target;
        const id = this.id;
        const item = PRODUCTS.filter((item) => {
          return item.id === id;
        })[0];
        if (
          currentButton.innerText === 'ДОБАВИТЬ В КОРЗИНУ' ||
          currentButton.innerText === 'УДАЛИТЬ ИЗ КОРЗИНЫ'
        ) {
          this.localStorage.putProducts(item.id, item.price);
          this.header.render();
          this.handleSetLocationStorage(currentButton, item.id);
        } else if (currentButton.innerText === 'КУПИТЬ В ОДИН КЛИК') {
          this.localStorage.putProductQuick(item.id, item.price);
          this.header.render();
          this.localStorage.putOneProductQuick(item.id);
          window.location.hash = '#cart?';
        }
      });
    });
  }
}

export default ProductFull;
