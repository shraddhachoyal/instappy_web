import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from "@angular/router";
import { Observable } from 'rxjs';
import { BlogdetailsService } from './blogdetails.service';
import { switchMap } from 'rxjs/operators';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import * as $ from 'jquery';
declare var window: any;


@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogDetailsComponent implements OnInit {
  successmsg: any;
  errmsg: any;
  submitted = false;
  blog_detail: any;
  comment_data: any;
  commentList: any = 0;
  tag_data: any;
  blogEmbedData: any;
  blog_id: any;
  blogdata: any;
  slug: any;
  blog_details: any = [];
  moreBlogs: any = [];
  finalBlogData: any;
  moreblogList = Array();
  blogMoreList: any = [];
  recentBlogs: any = Array();
  alltags: any = Array();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitized: DomSanitizer,
    private formBuilder: FormBuilder,
    private blogdetailsService: BlogdetailsService
  ) { }

  ngOnInit() {
    this.getBlogDetail();
  }

  transform(value: any) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

  getBlogDetail() {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.getBlogTags(id);
        //this.navigated = true;
        this.blogdetailsService.getBlog(id)
          .subscribe(res => {
            let sanitizedContent: any = "";
            this.blog_details = res
            sanitizedContent = this.sanitized.bypassSecurityTrustUrl(this.blog_details['_embedded']['wp:featuredmedia'][0]['source_url']);

            let blogArray = {
              "id": this.blog_details.id,
              "title": this.blog_details.title.rendered,
              "excerpt": this.blog_details.excerpt.rendered,
              "content": this.blog_details.content.rendered,
              "date": this.blog_details.date,
              "blog_featured_image": sanitizedContent,
            };

            this.blog_details = blogArray;
            console.log('this.blog_details: ', this.blog_details);

            this.getRecentBlog();
            this.getMoreBlogListing();
          });

      } else {
        //this.navigated = false;
      }
    });
  }

  getRecentBlog() {
    this.blogdetailsService.recentBlog().subscribe(data => {
      this.recentBlogs = data;
    })
  }
  getMoreBlogListing() {
    this.blogdetailsService.moreBlogs().subscribe(data => {
      this.finalBlogData = data;
      this.finalBlogData.forEach((blogdata: any) => {
        let blog_excerpt = blogdata.excerpt.rendered;
        let sanitizedContent: any = "";
        sanitizedContent = this.sanitized.bypassSecurityTrustUrl(blogdata['_embedded']['wp:featuredmedia'][0]['source_url']);

        let blogSingleArray = {
          "blog_id": blogdata.id,
          "blog_title": blogdata.title.rendered,
          "blog_excerpt": blog_excerpt,
          "blog_date": blogdata.date,
          "blog_slug": blogdata.slug,
          "blog_featured_image": sanitizedContent,
        };
        this.blogMoreList.push(blogSingleArray);
      });
    });
  }

  /*This function is used for get all tags acording to blog-id*/
  getBlogTags(id: any) {
    this.blogdetailsService.blogTags(id).subscribe(data => {
      this.alltags = data;
    })
  }

}
