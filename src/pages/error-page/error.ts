import Page from '../../components/page';
import Error from '../../components/error/error';

class ErrorPage extends Page {
  private error: Error;

  constructor(className: string) {
    super(className);
    this.error = new Error('div', 'container');
  }

  render() {
    this.appendBlock(this.error.render());
    return this.mainEl;
  }
}

export default ErrorPage;
