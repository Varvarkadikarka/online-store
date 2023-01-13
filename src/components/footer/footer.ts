import Component from '../component';
import { githubHrefVadim, githubHrefVarya, rsHref } from '../../types/constants';

class Footer extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderFooter() {
    const container = document.createElement('div');
    container.className = 'container footer__container';

    const componentCode = `
      <div class="footer__info">© 2022</div>
      <div class="footer__authors">
        <a class="footer__link footer__link_github" href="${githubHrefVadim}" target="_blank"></a>
        <span class="footer__author">@vadim-m</span>
        <a class="footer__link footer__link_github" href="${githubHrefVarya}" target="_blank"></a>
        <span class="footer__author">@varvarkadikarka</span>
      </div>
      <a class="footer__link footer__link_rss" href="${rsHref}" target="_blank"></a>
    `;

    container.innerHTML = componentCode;

    this.container.append(container);
  }

  render() {
    this.renderFooter();
    return this.container;
  }
}

export default Footer;
