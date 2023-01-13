import { IProduct } from '../../types/interfaces';
import { PageIds } from '../../types/types';
import LocalStorage from '../../data/localStorage';

class CartItem {
  private container: HTMLElement;
  private localStorage: LocalStorage;

  constructor(private product: IProduct) {
    this.container = document.querySelector('.cart') as HTMLElement;
    this.localStorage = new LocalStorage();
  }

  getId() {
    return this.product.id;
  }

  render() {
    return `
       <li class="catalog__item hide">
        <article class="product product_row cart__row" id="${this.product.id}">
          <div class="product__photo cart__photo">
            <div class="product__photo-main">
              <a class="product__href" href="#${PageIds.ProductPage}?id=${this.product.id}">
                <img src="${this.product.thumbnail}" alt="Product image"
                class="product__img">
              </a>
            </div>
          </div>
          <div class="product__content cart__content">
            <div class="product__info">
              <a class="product__href" href="#${PageIds.ProductPage}?id=${this.product.id}">
                <h3 class="product__name">${this.product.title}</h3>
              </a>
              <div class="product__category cart__category">Категория:
                  <span class="product__category-value">${this.product.category}</span>
              </div>
              <div class="product__color cart__color">Цвет:
                  <span class="product__color-value">${this.product.color}</span>
                </div>
              <div class="product__material cart__material">Материал:
                  <span class="product__material-value">${this.product.material}</span>
                </div>  
            </div>
          </div> 
          <div class="cart__item-price">
            <div class="product__stock">В наличии:
                  <span class="product__stock-value">${this.product.stock}</span>
                </div>
            <div class="product__buttons cart__buttons">
            <div class="product__count">
              <button class="product__count_minus">-</button>
              <span class="product__count_amount">${this.localStorage.getOneTypeProductsAmount(
                String(this.product.id)
              )}</span>
              <button class="product__count_plus">+</button>
            </div>
            </div>
            <div class="product__price">${this.localStorage.getOneTypeProductPrice(
              String(this.product.id)
            )} ₽
            </div>
          </div>
        </div>
       </article>
       </br>
     </li>
    `;
  }
}

export default CartItem;
