import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) { }
  private postUrl = 'https://www.pulpstrategy.com/wp-json/wp/v2/';

  // getSingleTag(name: any) {
  //   return this.httpClient.get(this.postUrl + "tags?post=" + name);
  // }
}
