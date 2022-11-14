import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  constructor(private httpClient: HttpClient) { }

  //For get All Orderhistory
  getOrderHistories(userID: any) {
    return this.httpClient.get(api_url + 'instappy_orders/order_get/' + userID + '/');
  }

  //For get Order Items details
  getOrderDetails(orderID: any) {
    return this.httpClient.get(api_url + 'instappy_orders/order-get-details/' + orderID + '/');
  }

}
