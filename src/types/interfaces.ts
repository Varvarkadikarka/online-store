export interface IProduct {
  id: number;
  brand: string;
  title: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  material: string;
  color: string;
  top: string;
  thumbnail: string;
  images: string[];
}

export interface IProductInStorage {
  id: number;
  price: number;
  count: number;
}
