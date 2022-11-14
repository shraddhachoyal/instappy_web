import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_url } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(private httpClient: HttpClient) { }

  /* Used for get top FAQs with limit-4 */
  getPricing() {
    return this.httpClient.get(api_url + "pricing/get_prices/");
  }
}
