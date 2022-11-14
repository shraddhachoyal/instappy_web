import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Billing } from './billing';
import { api_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillingInfoService {

  constructor(private httpClient: HttpClient) { }

  checkout(billing: Billing) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<Billing[]>(api_url + "instappy_orders/order_post/", billing, httpOptions)
  }
}
