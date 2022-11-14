import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog.service';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
	isFavorite: boolean = true;

	blogList = Array();
	finalBlogData: any;
	blogEmbedData: any;
	blogCatname: any;
	newBlog: any;
	totalLength: any;
	page = 1;
	allCategories: any = Array();
	firstCatID: any;
	category: any;


	id: any = 'category';
	tabChange(ids: any) {
		// this.id = ids;
		// console.log('tabChange() ', this.id);
	}

	class: any = "categoryall";
	tab(ids: any) {
		// this.id = ids;
		// console.log('tab() ', this.id);
	}

	constructor(
		private blogService: BlogService,
		private httpClient: HttpClient,
		private sanitized: DomSanitizer,
		private route: ActivatedRoute,
		private router: Router,
	) {
	}

	ngOnInit() {
		/*firstCatID is category-id used for get blogs */
		this.blogService.getCategory().subscribe(res => {
			this.allCategories = res;
			this.firstCatID = this.allCategories[0].id;
			this.id = this.firstCatID;
			this.category = this.firstCatID;
			this.getBlogListing(this.firstCatID);
		})
		this.getAllCategory();
	}

	/* This function is used for set limit on paragraph text/content text */
	doHtmlDisplay(text: any, limit = 50) {
		if (text.length > limit) {
			text = text.substring(0, limit) + '...';
		} else { text; }
		return text;
	}

	transform(value: any) {
		return this.sanitized.bypassSecurityTrustHtml(value);
	}

	/*This function is used for get all blogs according category*/
	getBlogListing(catID: any): void {
		this.getNewestBlog();

		this.blogService.getBlogList(catID).subscribe(data => {
			this.finalBlogData = data;
			this.totalLength = Object.keys(data).length;
			this.blogList = Array();
			this.id = catID;
			this.category = catID;
			this.page = 1;


			this.finalBlogData.forEach((blogdata: any) => {
				let blog_excerpt = blogdata.excerpt.rendered;
				let sanitizedContent: any = "";
				sanitizedContent = this.sanitized.bypassSecurityTrustUrl(blogdata['_embedded']['wp:featuredmedia'][0]['source_url']);

				const blogSingleArray = {
					"blog_id": blogdata.id,
					"blog_title": blogdata.title.rendered,
					"blog_excerpt": blog_excerpt,
					"blog_date": blogdata.date,
					"blog_slug": blogdata.slug,
					"blog_featured_image": sanitizedContent,
					'category': catID
				};
				this.blogList.push(blogSingleArray);
			});
		});
	}

	getNewestBlog() {
		this.blogService.newestBlog().subscribe(res => {
			let sanitizedContent: any = "";
			this.newBlog = res
			sanitizedContent = this.sanitized.bypassSecurityTrustUrl(this.newBlog[0]['_embedded']['wp:featuredmedia'][0]['source_url']);
			let blogArray = {
				"blog_id": this.newBlog[0].id,
				"blog_title": this.newBlog[0].title.rendered,
				"blogcontent": this.newBlog[0].content.rendered,
				"blog_featured_image": sanitizedContent,
			};
			this.newBlog = blogArray;
		});
	}

	getAllCategory() {
		this.blogService.getCategory().subscribe(res => {
			this.allCategories = res;
			this.allCategories['is_active'] = true;
		})
	}
}
