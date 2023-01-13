import Component from '../component';

class SuccessPurchase extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderCart() {
    const container = document.createElement('div');
    container.className = 'success-purchase';
    container.id = 'success';

    const htmlTemplate = `
      <div success-purchase__title>ЗАКАЗ УСПЕШНО ОФОРМЛЕН!</div>
    `;

    container.innerHTML = htmlTemplate;

    this.container.append(container);
  }

  render() {
    this.renderCart();
    return this.container;
  }
}

export default SuccessPurchase;
