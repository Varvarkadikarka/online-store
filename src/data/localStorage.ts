import { ItemCart } from '../types/types';
import { ITEM } from '../types/constants';
import PRODUCTS from './products';
import { IProduct } from '../types/interfaces';
import { getParamsSpecificValue } from '../helpers/hash';

class LocalStorage {
  private keyName: string;
  private keyOneName: string;
  private products: IProduct[] = [];
  private promoName: string;

  constructor() {
    this.keyName = 'products';
    this.keyOneName = 'quick-product';
    this.promoName = 'promo-codes';
  }

  // ПРОМОКОДЫ

  // vadim
  addPromoCode() {
    const promoCode = getParamsSpecificValue('promo');
    if (!promoCode) {
      return;
    }
    localStorage.setItem(this.promoName, JSON.stringify(promoCode));

    return { promoCode };
  }
  // vadim end

  getPromoCode() {
    const promoCodesInLocalStorage = localStorage.getItem(this.promoName);
    if (promoCodesInLocalStorage !== null) {
      return JSON.parse(promoCodesInLocalStorage);
    }
    return [];
  }

  // ДОБАВЛЕНИЕ ПРОДУКТОВ В КОРЗИНУ

  getProducts() {
    const productsLocalStorage = localStorage.getItem(this.keyName);
    if (productsLocalStorage !== null) {
      return JSON.parse(productsLocalStorage);
    }
    return [];
  }

  putProducts(id: number, price: number) {
    const products = this.getProducts();
    const index = products.findIndex((object: ItemCart) => object.id === id);

    if (index === -1) {
      ITEM.id = id;
      ITEM.price = price;
      products.push(ITEM);
    } else {
      products.splice(index, 1);
    }

    localStorage.setItem(this.keyName, JSON.stringify(products));

    return { products };
  }

  putProductQuick(id: number, price: number) {
    const products = this.getProducts();
    const index = products.findIndex((object: ItemCart) => object.id === id);

    if (index === -1) {
      ITEM.id = id;
      ITEM.price = price;
      products.push(ITEM);
    }

    localStorage.setItem(this.keyName, JSON.stringify(products));

    return { products };
  }

  putOneProductQuick(id: number) {
    const product = id;

    localStorage.setItem(this.keyOneName, JSON.stringify(product));

    return { product };
  }

  clearOneProductQuick() {
    localStorage.removeItem(this.keyOneName);
  }

  clearOLocalStorage() {
    localStorage.removeItem(this.keyName);
  }

  getOneProductQuick() {
    const productsLocalStorage = localStorage.getItem(this.keyOneName);
    if (productsLocalStorage !== null) {
      return JSON.parse(productsLocalStorage);
    }
  }

  putOneTypeProducts(id: string, boolean: boolean) {
    const products = this.getProducts();
    const index = products.findIndex((item: ItemCart) => item.id === +id);
    let fixedPrice: number | null = null;
    PRODUCTS.forEach((item) => {
      if (item.id === +id) fixedPrice = item.price;
    });
    if (boolean) {
      products[index].count = ++products[index].count;
      products[index].price = products[index].price + fixedPrice;
    } else {
      if (fixedPrice) {
        products[index].count = --products[index].count;
        products[index].price = products[index].price - fixedPrice;
      }
    }
    localStorage.setItem(this.keyName, JSON.stringify(products));
    return { products };
  }

  getOneTypeProductsAmount(id: string) {
    const products = this.getProducts();
    const index = products.findIndex((item: ItemCart) => item.id === +id);
    return products[index].count;
  }

  getOneTypeProductPrice(id: string) {
    const products = this.getProducts();
    let oneProductPrice: number | null = null;
    products.forEach((product: IProduct) => {
      if (product.id === +id) oneProductPrice = product.price;
    });
    return String(oneProductPrice);
  }

  getButtonState(id: number) {
    const products = this.getProducts();
    let pushProduct = false;
    const index = products.findIndex((object: ItemCart) => object.id === id);

    if (index !== -1) {
      pushProduct = true;
    } else {
      pushProduct = false;
    }
    return pushProduct;
  }
}

export default LocalStorage;
