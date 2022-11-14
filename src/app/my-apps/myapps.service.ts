import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyappsService {

  constructor(private httpClient: HttpClient) { }
  private api_url = api_url;

  /*For get all my-apps of logedIn user*/
  myAllApps(userId: number, appType: number) {
    return this.httpClient.get(api_url + "apps-details/app-details-list/" + userId + "/" + appType);
  }
}
