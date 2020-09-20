import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, TODO_JPA_API_URL } from '../../app.constants';
import { ShopItem } from '../../shop-item/shop-item.component';

@Injectable({
  providedIn: 'root'
})
export class ShopItemService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveItem(id) {
    return this.http.get<ShopItem>(`${TODO_JPA_API_URL}/items/${id}`);
  }

  retrieveAllItems() {
    return this.http.get<ShopItem[]>(`${TODO_JPA_API_URL}/items`);
  }
}
