import { IProduct } from '../types/interfaces';

export function getOptions(array: IProduct[], key: string) {
  return Array.from(new Set(array.map((product) => product[key as keyof IProduct]))).sort();
}

export function countDiscountPrice(fullPrice: number, saleArr: number[]) {
  const sales = saleArr.reduce((acc, item) => acc + item);
  return Math.round(fullPrice - (fullPrice / 100) * sales);
}
