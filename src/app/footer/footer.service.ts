import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { apiURL,api_url} from 'src/environments/environment';
import { Subemail } from './subemail';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  getFooter() {
    throw new Error('Method not implemented.');
  }
  constructor(private httpClient: HttpClient) {
   }
private authUrl = apiURL;
private api_url= api_url;
httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:8000/' }) };
  
   postFooter(subemail:Subemail) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<Subemail[]>(this.api_url + "v1/addSubscribeEmail/",subemail,httpOptions);
}
}
