import productType from './product.model';

export interface orderType {
  id?: number | undefined;
  status?: string;
  totalPrice: number;
  orderDate?: string;
  products: productType[];
  userId: number;
}

// export interface orderDetailsType {
//   id: number;
//   quantity: number;
//   price: number;
//   name: string;
//   productId: number;
//   orderId: number;
//   status?: string;
// }
