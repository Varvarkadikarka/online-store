import Component from '../component';
import ProductMain from '../products/productMain';
import { IProduct } from '../../types/interfaces';
import PRODUCTS from '../../data/products';

class CatalogList extends Component {
  private error: Error | null = null;
  private products: IProduct[] = [];
  private productsComponents: ProductMain[] = [];

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.getProducts();
  }

  getProducts() {
    this.products = PRODUCTS;
    this.productsComponents = this.products.map((product) => new ProductMain(product));
  }

  renderItems() {
    const container = document.createElement('section');
    container.className = 'catalog__list-wrap';

    const html = `
      <ul class="catalog__list">
        ${this.productsComponents.map((product) => product.render()).join('')}
      </ul>
      `;

    container.innerHTML = html;
    return container;
  }

  addEvents() {
    this.productsComponents.forEach((item) => item.addEvents());
  }
}

export default CatalogList;
