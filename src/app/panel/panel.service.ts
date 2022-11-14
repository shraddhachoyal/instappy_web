import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Myapp } from './myapp';
import { apiURL, api_url } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  constructor(private httpClient: HttpClient) { }
  apiURL = "http://52.10.50.94/api/";

  upload(file: any): Observable<any> {
    const formData = new FormData();
    formData.append("upload", file, file.name);
    return this.httpClient.post(api_url + "fileupload/saveimagesweb/", formData)
  }

  createApp(myapp: Myapp) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<Myapp[]>(api_url + 'apps-details/add-app-details/', myapp, httpOptions)
  }

  getBanners(app_uid: any) {
    return this.httpClient.get(api_url + "apps-details/app-banner-list/" + app_uid + "/");
  }
  getCategories(app_uid: any) {
    return this.httpClient.get(api_url + "apps-details/consumer-category-list/" + app_uid + "/");
  }
}
