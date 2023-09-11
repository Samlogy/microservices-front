export interface signUpType {
  name: string;
  email: string;
  password: string;
}
export interface loginType {
  email: String;
  password: String;
}

export interface productType {
  name: string;
  price: number;
  category: string;
  color: string;
  image: string;
  description: string;
  id: number;
  quantity: undefined | number;
  productId: undefined | number;
}
export interface cartType {
  name: string;
  price: number;
  category: string;
  color: string;
  image: string;
  description: string;
  id: number | undefined;
  quantity: undefined | number;
  productId: number;
  userId: number;
}

export interface priceSummaryType {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}

export interface orderType {
  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: string;
  id: number | undefined;
}
