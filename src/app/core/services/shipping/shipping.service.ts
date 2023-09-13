import { Injectable } from '@angular/core';
import shippingType from '../../models/shipping.model';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  constructor(private http: HttpClient) {}

  addShipping(data: shippingType, userId: number) {
    return this.http.post(BASE_URL + '/shipping/' + userId, data);
  }
}
