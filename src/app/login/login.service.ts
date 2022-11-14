import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Register } from './register';
import { api_url } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) { }
  private api_url = api_url;

  userExists(email: any) {
    return this.httpClient.get(api_url + "webusers/email-exist/" + email);
  }

  resendToken(email: any) {
    return this.httpClient.get(api_url + "webusers/resend-token/" + email + '/');
  }

  userSignUp(register: Register) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<Register[]>(api_url + 'webusers/signup/', register, httpOptions)
  }

  userLogin(register: Register) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<Register[]>(api_url + 'webusers/login/', register, httpOptions)
  }

  forgotPassword(register: Register) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<Register[]>(api_url + 'webusers/forgot-password/', register, httpOptions)
  }

}
