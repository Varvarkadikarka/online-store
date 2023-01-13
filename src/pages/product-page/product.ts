import Page from '../../components/page';
import ProductFull from '../../components/products/productFull';

class ProductPage extends Page {
  private product: ProductFull;
  // ! нужно получить ID и передать в конструктор

  constructor(className: string) {
    super(className);
    this.product = new ProductFull('div', 'container', this.getId() as number);
  }

  getId() {
    const hash = window.location.hash;
    const queries = hash.split('?')[1];
    const searchParams = new URLSearchParams(queries);
    const id = searchParams.get('id');
    if (id) return +id;
  }

  render() {
    this.appendBlock(this.product.render());
    return this.mainEl;
  }
}

export default ProductPage;
