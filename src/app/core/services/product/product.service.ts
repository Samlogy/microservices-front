import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import productType from '../../models/product.model';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<productType[] | []>();
  constructor(private http: HttpClient) {}

  addProduct(data: productType) {
    return this.http.post(BASE_URL + '/products', data);
  }
  productList() {
    return this.http.get<productType[]>(BASE_URL + '/products');
  }
  getProductById(id: number) {
    return this.http.get<productType>(BASE_URL + `/products/${id}`);
  }
  searchProduct(query: string) {
    return this.http.get<productType[]>(BASE_URL + `/products?${query}`);
  }
}
