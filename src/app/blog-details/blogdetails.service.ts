import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class BlogdetailsService {

	constructor(private httpClient: HttpClient) { }
	//postUrl = environment.post_url;
	//comment_path = environment.comment_url;
	private postUrl = 'https://www.pulpstrategy.com/wp-json/wp/v2/';


	/* getBlogDetail(slug:any){
	   return this.http.get(this.postUrl+"posts?slug="+slug);
   }
   /*
   getBlogMedia(id){
	   return this.http.get(this.postUrl+"/media?parent="+id);
   }
   */
	/*	
	getBlogComments(id){
	  return this.http.get(this.postUrl+"comments?post="+id);
	}*/
	/*getBlogTags(id: number) {
		return this.httpClient.get(this.postUrl + "tags?post=" + id);
	}*/

	getBlog(id: number) {
		return this.httpClient.get(this.postUrl + "posts/" + id + "/?_embed");
	}

	moreBlogs() {
		return this.httpClient.get(this.postUrl + "posts?_embed&per_page=6&order=desc");
	}

	getBlogMedia() {
		return this.httpClient.get(this.postUrl + "posts?_embed&per_page=6&order=desc");
	}

	recentBlog() {
		return this.httpClient.get(this.postUrl + "posts?_embed&per_page=3&order=desc")
	}

	blogTags(blogID: number) {
		return this.httpClient.get(this.postUrl + "tags?post=" + blogID);
	}
}
