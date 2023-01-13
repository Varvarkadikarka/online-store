export enum PageIds {
  StorePage = 'store',
  CartPage = 'cart',
  ProductPage = 'product-details',
}

export type ItemCart = {
  id: number;
  price: number;
};

export type labelOption = {
  value: string;
  text: string;
};
export type promo = {
  name: string;
  value: number;
};
