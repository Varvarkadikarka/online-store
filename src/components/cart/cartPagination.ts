import Component from '../component';
import { replaceParams, getParamsSpecificValue } from '../../helpers/hash';

class CartPagination extends Component {
  private productsAmount: number | null;
  private productsPerPage: string | null;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.productsAmount = this.getProducts('products').length ?? 0;
    this.productsPerPage = getParamsSpecificValue('item') ?? '3';
  }

  getProducts(keyName: string) {
    const productsLocalStorage = localStorage.getItem(keyName);
    if (productsLocalStorage !== null) {
      return JSON.parse(productsLocalStorage);
    }
    return [];
  }

  addLinks() {
    if (!this.productsAmount || !this.productsPerPage) {
      return '';
    }
    const itemsPerPage = +this.productsPerPage;
    let pages = 0;
    if (this.productsAmount % itemsPerPage === 0) {
      pages = Math.floor(this.productsAmount / itemsPerPage);
    } else {
      pages = Math.floor(this.productsAmount / itemsPerPage) + 1;
    }
    const activePage = getParamsSpecificValue('page');
    if (activePage && +activePage > pages) {
      replaceParams('page', `${pages}`);
    }
    let htmlTemplate = '';
    for (let i = 1; i <= pages; i++) {
      let activeButton = '';
      if (activePage) {
        if (i === +activePage) {
          activeButton = 'active';
        }
      }
      htmlTemplate += `<button class="pagination__button ${activeButton}" name="page" value="${i}">${i}</button> `;
    }

    return htmlTemplate;
  }

  addTemplate() {
    if (this.productsAmount === 0) {
      return '';
    }
    const links = this.addLinks();

    const htmlTemplate = `
        <select class="pagination__select" name="item" style="margin-bottom: 50px">
          <option value="3" selected="">Количетсво товаров на странице:</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <span>= ${this.productsPerPage}</span>
       <span style="display: inline-block; margin-left: 200px">Страницa: </span>
       ${links}
    `;

    return htmlTemplate;
  }

  eventListener() {
    const select = this.container.querySelector('.pagination__select');
    select?.addEventListener('change', (e) => {
      e.preventDefault();
      const select = <HTMLSelectElement>e.target;
      if (select) {
        const name = select.name;
        const value = select.value;
        replaceParams(name, value);
      }
    });
    const buttons = this.container.querySelectorAll('.pagination__button');
    buttons?.forEach((el) =>
      el.addEventListener('click', (e) => {
        // e.preventDefault();
        const select = <HTMLButtonElement>e.target;
        if (select) {
          const name = select.name;
          const value = select.value;
          replaceParams(name, value);
        }
      })
    );
  }

  render() {
    const htmlTemplate = this.addTemplate();
    this.container.innerHTML = htmlTemplate;
    this.eventListener();

    return this.container;
  }
}

export default CartPagination;
