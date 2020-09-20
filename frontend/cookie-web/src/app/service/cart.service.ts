import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, TODO_JPA_API_URL } from '../app.constants';
import { ShopItem } from '../shop-item/shop-item.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(
    private http: HttpClient
  ) { }


  addToCart(username, id) {
    return this.http.post(`${TODO_JPA_API_URL}/users/${username}/cart/add`, id)
  }

  retrieveAllFromCart(username) {
    return this.http.get < ShopItem[] >(`${TODO_JPA_API_URL}/users/${username}/cart`)
  }

  deleteFromCart(username, id) {
    return this.http.delete(`${TODO_JPA_API_URL}/users/${username}/cart/delete/${id}`)
  }
}