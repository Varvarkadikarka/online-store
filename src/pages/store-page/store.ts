import Catalog from '../../components/catalog/catalog';
import Page from '../../components/page';

class StorePage extends Page {
  public catalog: Catalog;

  constructor(className: string) {
    super(className);
    this.catalog = new Catalog('div', 'container');
  }

  render() {
    this.appendBlock(this.catalog.render());
    return this.mainEl;
  }
}

export default StorePage;
