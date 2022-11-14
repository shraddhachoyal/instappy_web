import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { apiURL } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private httpClient: HttpClient) { }

  private blogUrl = 'https://www.pulpstrategy.com/';

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://127.0.0.1:8000/' }) };

  /*For get all blogs according to category ID*/
  getBlogList(catID: any) {
    return this.httpClient.get(this.blogUrl + "wp-json/wp/v2/posts?_embed&per_page=100&categories=" + catID);
  }


  /*For get latest one blogs for show blog detail on blog page*/
  newestBlog() {
    return this.httpClient.get(this.blogUrl + "wp-json/wp/v2/posts?_embed&per_page=1&order=desc")
  }

  /*For Get all categories*/
  getCategory() {
    return this.httpClient.get(this.blogUrl + "wp-json/wp/v2/categories");
  }
}
