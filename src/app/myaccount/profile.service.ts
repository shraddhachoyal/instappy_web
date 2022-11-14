import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from '../login/register';
import { PasswordChange } from './password-change';
import { Observable } from 'rxjs';
import { apiKey, api_url, countrystatecityURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private httpClient: HttpClient) { }
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private api_url = api_url;
  private apiKey = apiKey;

  getProfileDetails(userId: number) {
    return this.httpClient.get(this.api_url + "webusers/profile-details?uid=" + userId);
  }

  getAllCountries() {
    let headers = new HttpHeaders()
    headers = headers.set('X-CSCAPI-KEY', apiKey)
    return this.httpClient.get(countrystatecityURL, { headers: headers });
  }

  getStateByCountries(cID: any) {
    let headers = new HttpHeaders()
    headers = headers.set('X-CSCAPI-KEY', apiKey)
    return this.httpClient.get(countrystatecityURL + cID + '/states', { headers: headers });
  }

  getCityByState(country: any, state: any) {
    let headers = new HttpHeaders();
    headers = headers.set('X-CSCAPI-KEY', apiKey)
    return this.httpClient.get(countrystatecityURL + country + '/states/' + state + '/cities', { headers: headers });
  }

  upload(file: any): Observable<any> {
    const formData = new FormData();
    formData.append("upload", file, file.name);
    return this.httpClient.post(this.api_url + "fileupload/saveimagesweb/", formData)
  }

  updateProfile(userId: number, register: Register) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // return this.httpClient.post<Register[]>("http://127.0.0.1:8000/api/webusers/update/" + userId + "/", register, httpOptions)
    return this.httpClient.post<Register[]>(api_url + "webusers/update/" + userId + "/", register, httpOptions)
  }

  updatePassword(passwordChange: PasswordChange) {
    return this.httpClient.post<PasswordChange[]>(api_url + 'webusers/update-password', passwordChange, this.httpOptions)
  }
}
