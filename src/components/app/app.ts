import Page from '../page';
import StorePage from '../../pages/store-page/store';
import CartPage from '../../pages/cart-page/cart';
import ProductPage from '../../pages/product-page/product';
import ErrorPage from '../../pages/error-page/error';
import Header from '../header/header';
import Footer from '../footer/footer';
import { PageIds } from '../../types/types';

class App {
  private static container: HTMLElement = document.querySelector('.wrapper') as HTMLElement;
  private static defaultPageId = 'current-page';
  private header: Header;
  private footer: Footer;

  constructor() {
    this.header = new Header('header', 'header');
    this.footer = new Footer('footer', 'footer');
  }

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);

    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    switch (idPage) {
      case PageIds.StorePage:
        page = new StorePage(idPage);
        break;
      case PageIds.CartPage:
        page = new CartPage(idPage);
        break;
      case PageIds.ProductPage:
        page = new ProductPage(idPage);
        break;
      default:
        page = new ErrorPage(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  run() {
    App.container.append(this.header.render());
    App.renderNewPage('store');
    App.container.append(this.footer.render());
    this.enableRouteChange();
  }
}

export default App;
