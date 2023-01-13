import { IProduct } from '../../types/interfaces';
import { PageIds } from '../../types/types';
import LocalStorage from '../../data/localStorage';
import Header from '../header/header';
import { ItemCart } from '../../types/types';

class ProductMain {
  private localStorage: LocalStorage;
  private header: Header;
  private labelAdd: string;
  private labelRemove: string;
  private button: HTMLElement | null;

  constructor(private product: IProduct) {
    this.localStorage = new LocalStorage();
    this.header = new Header();
    this.labelAdd = 'Добавить в корзину';
    this.labelRemove = 'Удалить из корзины';
    this.button = document.querySelector('.product__button_cart');
  }

  private getHtmlID = () => `button__${this.product.id}`;

  handleSetLocationStorage(element: HTMLElement, id: number) {
    element.innerHTML = this.localStorage.getButtonState(id) ? this.labelRemove : this.labelAdd;
  }

  changeButtonLabel() {
    const productsStore = this.localStorage.getProducts();
    return productsStore.findIndex((object: ItemCart) => object.id === this.product.id) > -1
      ? this.labelRemove
      : this.labelAdd;
  }

  render() {
    return `
       <li class="catalog__item">
       
        <article class="product product_row" id="${this.product.id}">
          <div class="product__photo">
            <div class="product__photo-main">
              <a class="product__href" href="#${PageIds.ProductPage}?id=${this.product.id}">
                <img src="${this.product.thumbnail}" alt="Product image"
                class="product__img">
              </a>
            </div>
          </div>
          <div class="product__content">
            <div class="product__info">
              <a class="product__href" href="#${PageIds.ProductPage}?id=${this.product.id}">
                <h3 class="product__name">${this.product.title}</h3>
              </a>
              <div class="product__price">${this.product.price} ₽
              </div>
            </div>
            <div class="product__stock">В наличии:
                <span class="product__stock-value">${this.product.stock}</span>
            </div>
            <div class="product__buttons">
              <div class="product__count">
                <button class="product__count_minus">-</button>
                <span class="product__count_amount">1</span>
                <button class="product__count_plus">+</button>
              </div>
              <button class="product__button product__button_cart" id="button__${this.product.id}">
                ${this.changeButtonLabel()}
              </button>
            </div>
          </div> 
        </div>
       </article>
     </li>
    `;
  }

  addEvents() {
    const button = document.getElementById(this.getHtmlID());

    if (button) {
      button.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        this.localStorage.putProducts(this.product.id, this.product.price);
        this.header.render();
        const currentButton = event.target as HTMLElement;
        this.handleSetLocationStorage(currentButton, this.product.id);
      });
    }
  }
}

export default ProductMain;
