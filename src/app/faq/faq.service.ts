import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
// import { apiURL } from 'src/environments/environment';
import { api_url } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  constructor(private httpClient: HttpClient) { }

  getFaqList(search: any) {
    return this.httpClient.get(api_url + "v1/questions/?search=" + search);
  }

  /* Used for get top FAQs with limit-4 */
  getTopFaqList() {
    return this.httpClient.get(api_url + "v1/get-top-faq/");
  }


}

