import Component from '../component';
const chip = require('../../assets/img/modal-form/sim-card-chip.png');

class Modal extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderCart() {
    const container = document.createElement('div');
    container.className = 'modal-form';
    container.id = 'modal-form';

    const htmlTemplate = `
        <button class="modal-form__close" id="close">×</button>
        <form class="form" id="form">
          <h2 class="modal-form__title">Персональные данные</h2>
          <div class="form__item">
            <input class="form__input" placeholder="Имя и Фамилия" type="text" data-validationType="name">
            <span class="form__error"></span>
          </div>
          <div class="form__item">
            <input class="form__input" placeholder="Номер телефона" type="tel" value="+7" data-validationType="phone" id="tel">
            <span class="form__error"></span>
          </div>
          <div class="form__item">
            <input class="form__input" placeholder="Адрес доставки" type="text" data-validationType="address">
            <span class="form__error"></span>
          </div>
          <div class="form__item">
            <input class="form__input" placeholder="E-mail" type="text" data-validationType="email">
            <span class="form__error"></span>
          </div> 

          <h2 class="modal-form__title">Платежные данные</h2>
          <div class="modal-form__credit-card-sample">
            <img src="${chip}" alt="sim-card-chip" class="modal-form__credit-card-chip"> 
            <div class="modal-form__card-type">МИР</div>
          </div>
          <div class="form__credit-info">
            <div class="form__item">
            <input class="form__input" placeholder="Номер карты" type="text" data-validationType="number" id="number">
            <span class="form__error"></span>
            </div> 
            <div class="form__card">
              <div class="form__item">
                <p>Срок:</p>
                <input class="form__input" placeholder="Месяц/Год" type="text" data-validationType="date" id="date">
                <span class="form__error"></span>
              </div>
              <div class="form__item">
                <p>Код:</p>
                <input class="form__input" placeholder="CVV" type="text" data-validationType="cvv" id="cvv">
                <span class="form__error"></span>
              </div>
            </div>
          </div>
          
          <button class="form__button product__button product__button_cart" id="submit" type="submit">ПОДТВЕРДИТЬ</button> 
        </form>
    `;

    container.innerHTML = htmlTemplate;

    this.container.append(container);
  }

  render() {
    this.renderCart();
    return this.container;
  }
}

export default Modal;
