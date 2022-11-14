import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('isPurchased', 'false')
    localStorage.removeItem('authUserInfo');
  }

  resetPassword(userID: any, token: any, newpassword: any) {
    const body = { password: newpassword, uid: userID, token: token };
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<any>(api_url + 'webusers/reset-password', body);
  }
}
