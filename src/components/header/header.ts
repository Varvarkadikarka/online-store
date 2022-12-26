import Component from '../component';
import { NavLinks } from '../../constants/constants';

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderHeader() {
    const container = document.createElement('div');
    container.className = 'container';

    const pageLink = document.createElement('div');
    pageLink.className = 'header__nav';

    container.append(pageLink);

    NavLinks.forEach((link) => {
      const linkHTML = document.createElement('a');
      linkHTML.href = `#${link.id}`;

      linkHTML.innerText = link.text;
      pageLink.append(linkHTML);
    });

    this.container.append(container);
  }

  render() {
    this.renderHeader();
    return this.container;
  }
}

export default Header;
