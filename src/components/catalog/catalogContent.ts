import Component from '../component';
import CatalogSearch from './catalogSearch';
import CatalogSort from './catalogSort';
import CatalogList from './catalogList';
import { deleteParams, replaceParams } from '../../helpers/hash';

class CatalogContent extends Component {
  public catalogSearch: CatalogSearch;
  public catalogSort: CatalogSort;
  public catalogList: CatalogList;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.catalogSearch = new CatalogSearch('section', 'catalog__search');
    this.catalogSort = new CatalogSort('section', 'catalog__sort');
    this.catalogList = new CatalogList('section', 'catalog__list-wrap');
  }

  getContentNode() {
    const container = document.createElement('div');
    container.className = 'catalog__content-wrap';

    container.append(this.catalogSearch.render());
    container.append(this.catalogSort.render());
    container.append(this.catalogList.render());

    return container;
  }

  render() {
    this.container.append(this.getContentNode());
    this.eventListener();
    this.catalogSearch.setFoundProductsAmount.call(this);

    return this.container;
  }

  eventListener() {
    this.container.querySelectorAll('.sort__view').forEach((el) => {
      el.addEventListener('click', (e) => {
        const button = <HTMLButtonElement>e.target;
        const value = button.dataset.view;
        if (value) {
          replaceParams('view', value);
        }
      });
    });
    this.container.querySelector('.sort__select')?.addEventListener('input', (e) => {
      const label = <HTMLSelectElement>e.target;
      const value = label.options[label.selectedIndex].value;
      replaceParams('sort', value);
    });
    this.container.querySelector('.search__input')?.addEventListener('search', (e) => {
      e.preventDefault();
      const input = <HTMLInputElement>e.target;
      const value = input.value;
      if (value === '' || value === ' ') {
        deleteParams('search');
      } else {
        replaceParams('search', value.toLocaleLowerCase());
      }
    });
    this.container.querySelector('.search__input-find')?.addEventListener('click', (e) => {
      e.preventDefault();
      const input = <HTMLInputElement>this.container.querySelector('.search__input');
      const searchEvent = new Event('search');
      input.dispatchEvent(searchEvent);
    });
    this.container.querySelector('.search__input-reset')?.addEventListener('click', (e) => {
      e.preventDefault();
      deleteParams('search');
      const input = <HTMLInputElement>this.container.querySelector('.search__input');
      if (input) {
        input.value = '';
      }
    });
  }
}

export default CatalogContent;
