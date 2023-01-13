import Component from '../component';

class CatalogSort extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderSort() {
    const container = document.createElement('section');
    container.className = 'catalog__sort sort';

    const htmlTemplate = `
      <div class="sort__view-wrap">
        <button class="sort__view sort__view-column active"></button>
        <button class="sort__view sort__view-row"></button>
      </div>
      <label for="sorting" class="sort__label">Сортировать:
        <select class="sort__select-sorting" id="sorting">
          <option value="id" selected>По умолчанию</option>
          <option value="price-descending">Цена ↓</option>
          <option value="price-ascending">Цена ↑</option>
          <option value="name-descending">А - Я</option>
          <option value="name-ascending">Я - А</option>
        </select>
      </label>
    `;

    container.innerHTML = htmlTemplate;

    return container;
  }
}

export default CatalogSort;
