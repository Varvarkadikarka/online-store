import Component from '../component';
import CatalogSearch from './catalogSearch';
import CatalogSort from './catalogSort';
import CatalogList from './catalogList';

class CatalogContent extends Component {
  public catalogSearch: CatalogSearch;
  public catalogSort: CatalogSort;
  public catalogItems: CatalogList;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.catalogSearch = new CatalogSearch('section', 'catalog__search search');
    this.catalogSort = new CatalogSort('section', 'catalog__sort sort');
    this.catalogItems = new CatalogList('section', 'catalog__list-wrap');
  }

  render() {
    this.container.append(this.catalogSearch.renderSearch());
    this.container.append(this.catalogSort.renderSort());
    this.container.append(this.catalogItems.renderItems());
    return this.container;
  }
}

export default CatalogContent;
