import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, TODO_JPA_API_URL } from '../app.constants';
import { AccountDetailItem } from '../my-account/my-account.component';

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

  getUserAccountDetails(username) {
    return this.http.get<AccountDetailItem>(`${TODO_JPA_API_URL}/users/${username}/account-details/get-account-details`);
  }

  getUserAddress(username) {
    return this.http.get<string>(`${TODO_JPA_API_URL}/users/${username}/account-details/get-address`);
  }

  getUserCity(username) {
    return this.http.get<string>(`${TODO_JPA_API_URL}/users/${username}/account-details/get-city`);
  }

  getUserState(username) {
    return this.http.get<string>(`${TODO_JPA_API_URL}/users/${username}/account-details/get-state`);
  }

  getUserZipCode(username) {
    return this.http.get<string>(`${TODO_JPA_API_URL}/users/${username}/account-details/get-zip-code`);
  }

  getUserCardNumber(username) {
    return this.http.get<string>(`${TODO_JPA_API_URL}/users/${username}/account-details/get-card-number`);
  }
}
