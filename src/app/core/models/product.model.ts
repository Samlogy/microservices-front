export type productType = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
  category: string;
  userId: number;
};

export type productsListType = {
  totalItems: number;
  products: productType[];
  totalPages: number;
  currentPage: number;
};
