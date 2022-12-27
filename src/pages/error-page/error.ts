import Page from '../../components/page';

class ErrorPage extends Page {
  static CodeBlock = {
    MainTitle: `
      <div class="error__block">
        <h1 class="error__title">Oops!</h1>
        <h2 class="error__subtitle">YOU'RE LOST...</h2>
        <h3 class="error__code">Error code: 404</h3>
        <button class="button error__button">BACK TO HOMEPAGE</button>
      </div>
    `,
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createBlock(ErrorPage.CodeBlock.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default ErrorPage;
