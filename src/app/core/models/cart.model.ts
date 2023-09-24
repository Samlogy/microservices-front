import { productType } from './product.model';

export default interface cartType {
  id?: number;
  products: productType[];
}
