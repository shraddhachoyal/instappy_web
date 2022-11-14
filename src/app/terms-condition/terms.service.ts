import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { api_url } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class TermsService {
  constructor(private httpClient: HttpClient) {
  }
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://127.0.0.1:8000/' }) };

  getTermsandConditions() {
    return this.httpClient.get(api_url + "v1/getTermsandConditions/");
  }


}  