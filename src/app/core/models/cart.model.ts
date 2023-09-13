import productType from './product.model';

export interface cartType {
  id: number | undefined;
  products: productType[];
}

export interface priceSummaryType {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}
