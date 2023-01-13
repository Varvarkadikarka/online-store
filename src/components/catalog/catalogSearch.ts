import Component from '../component';

class CatalogSearch extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderSearch() {
    const container = document.createElement('section');
    container.className = 'catalog__search search';

    const htmlTemplate = `
      <input class="search__input" type="search" id="search" placeholder="Какой товар Вас интересует?"
      autocomplete="off">
      <div class="search__result">
        <span class="search__result-text">Товаров найдено:&nbsp;</span>
        <span class="search__result-amount">2</span>
      </div>
    `;

    container.innerHTML = htmlTemplate;

    return container;
  }
}

export default CatalogSearch;
