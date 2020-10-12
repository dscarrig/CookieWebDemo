import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, TODO_JPA_API_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(
    private http: HttpClient
  ) { }

  addUserInfo(username, userInfo) {
    return this.http.post(`${TODO_JPA_API_URL}/users/${username}/account-details/add`, userInfo);
  }

  getUserAddress(username) {
    return this.http.get(`${TODO_JPA_API_URL}/users/${username}/account-details/get-address`);
  }

  getUserCity(username) {
    return this.http.get(`${TODO_JPA_API_URL}/users/${username}/account-details/get-city`);
  }

  getUserState(username) {
    return this.http.get(`${TODO_JPA_API_URL}/users/${username}/account-details/get-state`);
  }

  getUserZipCode(username) {
    return this.http.get(`${TODO_JPA_API_URL}/users/${username}/account-details/get-zip-code`);
  }

  getUserCardNumber(username) {
    return this.http.get(`${TODO_JPA_API_URL}/users/${username}/account-details/get-card-number`);
  }
}
