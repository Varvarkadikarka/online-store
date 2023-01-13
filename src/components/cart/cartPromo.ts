import Component from '../component';
import { getParamsSpecificValue } from '../../helpers/hash';
import { promos } from '../../types/constants';

class CartPromos extends Component {
  private promos: string[] | null;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.promos = this.getPromos();
  }

  getPromos() {
    const promoParamValude = getParamsSpecificValue('promo');
    if (!promoParamValude) {
      return null;
    }
    return promoParamValude.split('↕');
  }

  addPromos() {
    let htmlTemplate = '';
    if (!this.promos) {
      return '';
    }
    this.promos.forEach((value) => {
      if (typeof value === 'string') {
        const promoItem = promos.find((item) => item.name === value) ?? { name: 'fake', value: 0 };
        const promoAmount = promoItem.value;
        htmlTemplate += `
        <label class="filters__checkbox">
          <input class="filters__input hide" type="checkbox" name="promo" value="${value}"} checked>
          <span class="filters__checkbox-span"></span>Скидка по промокоду ${value} - ${promoAmount}%
        </label>
        `;
      }
    });

    return htmlTemplate;
  }

  render() {
    const htmlTemplate = this.addPromos();
    this.container.innerHTML = htmlTemplate;

    return this.container;
  }
}

export default CartPromos;
