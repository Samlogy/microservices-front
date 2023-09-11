export interface orderType {
  id?: number;
  status: string;
  totalPrice: number;
  orderDate: string;
  userId: number;
  orders: orderDetailsType[] | [];
}

export interface orderDetailsType {
  id: number;
  quantity: number;
  price: number;
  name: string;
  productId: number;
  orderId: number;
}
