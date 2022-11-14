import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { api_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailVerifyService {

  constructor(private httpClient: HttpClient) { }
  private api_url = api_url;
  // private postUrl = 'http://127.0.0.1:8000/api/webuser/';

  emailVerify(userID: any, token: any) {
    return this.httpClient.get(this.api_url + "webusers/email-verify?uid=" + userID + "&&token=" + token);
  }
}
