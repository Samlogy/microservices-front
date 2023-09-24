import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productType, productsListType } from '../../models/product.model';

const BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  addProduct(data: productType) {
    return this.http.post(BASE_URL + '/product', data);
  }
  getProductById(id: number) {
    return this.http.get<productType>(BASE_URL + `/product/${id}`);
  }
  productList() {
    return this.http.get<productsListType>(BASE_URL + '/product');
  }
  searchProduct(query: string) {
    return this.http.get<productsListType>(BASE_URL + `/product?${query}`);
  }
}
