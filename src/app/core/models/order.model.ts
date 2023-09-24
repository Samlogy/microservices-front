import { productType } from './product.model';

export interface orderType {
  id?: number;
  status: string;
  totalPrice: number;
  orderDate: string;
  userId: number;
  products: productType[];
}

export interface priceSummaryType {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}
