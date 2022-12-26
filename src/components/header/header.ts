import Component from '../component';
import { NavLinks } from '../../constants/constants';

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderHeader() {
    const container = document.createElement('div');
    container.className = 'container  header__container';

    const componentCode = `
    <a class="header__logo" href="#${NavLinks[0].id}">
      <img src="./assets/img/logo/logo.png" alt="Site Logo!" class="header__logo-pic">
    </a>
    <div class="header__order">
      <div class="header__amount">
        <span class="header__sum">10200</span>
        <span class="header__currency">₽</span>
      </div>
      <a class="header__cart header__cart_filled" href="#${NavLinks[1].id}">
        <span class="header__cart-counter">12</span>
      </a>
    </div>
    `;

    container.innerHTML = componentCode;

    this.container.append(container);
  }

  render() {
    this.renderHeader();
    return this.container;
  }
}

export default Header;
