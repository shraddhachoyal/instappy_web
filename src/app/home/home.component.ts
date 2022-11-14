import { Component, OnInit } from '@angular/core';
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { BlogdetailsService } from '../blog-details/blogdetails.service';
import { HomeService } from './home.service';
import { DomSanitizer } from '@angular/platform-browser';
import { siteURL } from 'src/environments/environment';
import * as $ from 'jquery'
import { FaqService } from '../faq/faq.service';
import { Router } from "@angular/router";
// import { Router } from 'express';
declare function purchasedMsgShow(): any;
declare function videopush(): any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  starRating = 2;
  siteURL = siteURL;
  content: any = [];
  bannerImg: any = [];
  home_contents: any = [];
  bannerImages: any = [];
  logoImg: any = [];
  logos: any = [];
  data4: any = [];
  data5: any = [];
  nativeAppsData: any = [];
  nativeApps: any = [];
  customerStory: any = [];
  data4_index1: any = [];
  appAllSteps: any = Array();
  data5_index1: any = [];
  ativeApps: any = [];
  properties: any = [];
  Home_List6: any = Array();
  faqlist: any = [];
  homerecentblog: any = [];
  finalBlogData: any = Array();
  blogEmbedData: any;
  currentBlogList: any = [];
  faqList: any = [];
  isPurchased: any = 'false';
  counter(i: number) {
    return new Array(i);
  }
  constructor(private router: Router, private homeService: HomeService, private blogdetailsService: BlogdetailsService, private sanitized: DomSanitizer, private faqService: FaqService) { }

  public slideexpierencebox: SwiperConfigInterface = {
    loop: true,
    autoplay: {
      delay: 2000,
    },

    navigation: {
      nextEl: ".experience-next",
      prevEl: ".experience-prev",
    },
    observer: true,
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
      991: {
        slidesPerView: 7,
        spaceBetween: 15,
      },
    }
  };

  public slidefeaturebox: SwiperConfigInterface = {
    loop: true,
    autoplay: {
      delay: 2000,
    },
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: ".feature-next",
      prevEl: ".feature-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      1199: {
        slidesPerView: 4,
        spaceBetween: 25,
      },
    }
  };

  public customstories: SwiperConfigInterface = {
    loop: true,
    autoplay: {
      delay: 200000,
    },
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: ".customstories-next",
      prevEl: ".customstories-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      991: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      1199: {
        slidesPerView: 3,
        spaceBetween: 25,

      },
    }
  };

  ngOnInit(): void {
    $('.insta-click-tab').click(function (event) {
      event.preventDefault();
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
    });

    this.isPurchased = (localStorage.getItem('isPurchased') == 'true') ? 'true' : 'false';

    videopush();
    this.getHomeContent();
    this.getBanners();
    this.getLogos();
    this.getAppSteps();
    this.getAppFeatures();
    this.getNativeApps();
    this.getCustomerStories();
    this.getDesignProperties();
    this.getBlogs();
    this.getFaqList();
  }

  getStart() {
    if (this.isPurchased === 'true') {
      purchasedMsgShow();
    } else {
      this.router.navigate(['/panel']);
    }
  }
  getHomeContent() {
    this.homeService.getHomeContent().subscribe(res => {
      this.content = res;
      if (this.content.success === true) {
        this.home_contents = this.content.response;
      }
    });
  }
  getBanners() {
    this.homeService.getBanners().subscribe(res => {
      this.bannerImg = res;
      if (this.bannerImg.success === true) {
        this.bannerImg.response.forEach((val: any) => {
          let resultArr = {
            "id": val.id,
            "image": siteURL + val.image
          };
          this.bannerImages.push(resultArr);
        });
      }
    });
  }
  getLogos() {
    this.homeService.getLogos().subscribe(res => {
      this.logoImg = res;
      if (this.logoImg.success === true) {
        this.logoImg.response.forEach((val: any) => {
          let resultArr = {
            "id": val.id,
            "image": siteURL + val.image
          };
          this.logos.push(resultArr);
        });
      }
    });
  }
  getAppSteps() {
    this.homeService.getAppSteps().subscribe(res => {
      this.data4 = res;
      if (this.data4.success === true) {
        this.data4_index1 = this.data4.response;
        this.data4_index1.forEach((item: any) => {
          let appSteps = {
            "title": item.title,
            "description": item.description,
            "image": item.image
          }
          this.appAllSteps.push(appSteps);
        });
        console.log(this.appAllSteps);
      }
    });
  }
  getAppFeatures() {
    this.homeService.getAppFeatures().subscribe(res => {
      this.data5 = res;
      if (this.data5.success === true) {
        this.data5_index1 = this.data5.response;
      }
    });
  }
  getNativeApps() {
    this.homeService.getNativeApps().subscribe(res => {
      this.nativeAppsData = res;
      if (this.nativeAppsData.success === true) {
        this.nativeApps = this.nativeAppsData.response;
      }
    });
  }
  getCustomerStories() {
    this.homeService.getCustomerStories().subscribe(res => {
      this.customerStory = res;
      if (this.customerStory.success === true) {
        this.customerStory = this.customerStory.response;
      }
    });
  }

  getDesignProperties() {
    this.homeService.getDesignProperties().subscribe(res => {
      this.properties = res;
      if (this.properties.success === true) {
        this.properties = this.properties.response;
      }
    });
  }

  getBlogs() {
    this.blogdetailsService.recentBlog().subscribe(data => {
      this.finalBlogData = data;
      this.finalBlogData.forEach((blogdata: any) => {
        let sanitizedContent: any = "";
        sanitizedContent = this.sanitized.bypassSecurityTrustUrl(blogdata['_embedded']['wp:featuredmedia'][0]['source_url']);

        let blogSingleArray = {
          "blog_id": blogdata.id,
          "blog_title": blogdata.title.rendered,
          "blog_featured_image": sanitizedContent,
        };
        this.currentBlogList.push(blogSingleArray);
      });
    });
  }

  getFaqList() {
    let search = '';
    this.faqService.getTopFaqList().subscribe(res => {
      this.faqList = res
      if (this.faqList.success === true) {
        this.faqList = this.faqList.response;
      }
    });
  }
}
