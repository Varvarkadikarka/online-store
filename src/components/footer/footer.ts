import Component from '../component';

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
        <a class="footer__link footer__link_github" href="https://github.com/vadim-m" target="_blank"></a>
        <span class="footer__author">@vadim-m</span>
        <a class="footer__link footer__link_github" href="https://github.com/Varvarkadikarka" target="_blank"></a>
        <span class="footer__author">@varvarkadikarka</span>
      </div>
      <a class="footer__link footer__link_rss" href="https://rs.school/js/" target="_blank"></a>
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
