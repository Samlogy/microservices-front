import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

const BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private storageService: StorageService) {}
}
