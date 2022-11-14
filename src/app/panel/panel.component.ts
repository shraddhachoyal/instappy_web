import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery'
import { PanelService } from './panel.service';
import { Router } from "@angular/router";
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { siteURL } from 'src/environments/environment';
declare function videopush(): any;
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  // slidedelivery:any
  masterAppID: any = '';
  submitted = false;
  message: string | undefined;
  userIconClr: any = '#ffdd00';
  successMsg: string = "";
  color_type: string = "single";
  color_code: string = "#ffdd00";
  resultData: any = Array;
  // authUser:any;
  /*Upload file */
  icon_type: string = 'custom';
  icon_values: string = '';
  splash_icon_type: string = 'custom';
  splashscreen_icon_value: string = '';
  shortLink: string = "";
  file: File | undefined; // Variable to store file
  upload: any = Array;
  /*custom icon*/
  newAppIconImg: any;
  appIconClr: string = "#fecd01";
  iconFontColor: string = "#000";
  appIconTxt: string = 'AP';
  appIconSize: any = "24";
  appIconFont: string = "serif";
  appSplashIconClr: string = "#fecd01";
  appSplashIconTxt: string = 'AP';
  appSplashIconSize: any = "30px";
  appSplashIconFont: string = "serif";
  appIconColor: string = "#ffe900";
  appSplashIconFontClr: string = "#000";

  activeColor: string = "";

  constructor(private panelService: PanelService, private router: Router,) { }

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
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      991: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
    }
  };

  public slidedelivery: SwiperConfigInterface = {
    loop: true,
    autoplay: {
      delay: 2000,
    },
    pagination: { el: '.swiper-pagination', clickable: true },



    scrollbar: { draggable: true },

    observer: true,
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
        slidesPerView: 1,
        spaceBetween: 15,
      },
      991: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
    }
  };


  public slidefooddelivery: SwiperConfigInterface = {
    loop: true,
    autoplay: {
      delay: 5000,
    },
    pagination: { el: '.swiper-pagination', clickable: true },
    scrollbar: { draggable: true },

    observer: true,
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
        slidesPerView: 3,
        spaceBetween: 15,
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
    }
  };


  public currentPage = 0;
  public changePage(index: number): void {
    this.currentPage += index;
  }

  isShown: boolean = false; // hidden by default
  toggleShow(Id: any) {
    this.masterAppID = Id;
    this.isShown = !this.isShown;
  }
  ngOnInit(): void {
    $(".next_section_panel").click(function () {
      $("#category-block").hide();
    });
    videopush();

    // alert(localStorage.getItem('isLoggedIn'));
  }

  backToMasterApps() {
    this.masterAppID = '';
    this.isShown = false;
    $("#category-block").show();
  }
  addAppname(e: any) {
    $(".appname").text(e.target.value);
  }
  //Create App Icon according custom fields
  reflactIcon(key: any, e: any) {
    this.icon_type = 'custom';
    console.log('i type: ', this.icon_type);

    $("#appIconPrevImg").html('');
    $("#newAppIconImg").html('');
    $("#appIconName").text('');
    $("#appIconName").removeClass('icon_priew_bg');
    if (key === 'clr') {
      this.appIconClr = e.target.value;
    }
    if (key === 'txt') {
      this.appIconTxt = e.target.value;
    }
    if (key === 'size') {
      this.appIconSize = e.target.value + "px";
    }
    if (key === 'font') {
      this.appIconFont = e.target.value;
    }
    if (key === 'fontclr') {
      this.iconFontColor = e.target.value;
    }
  }

  //Create Splashscreen Icon according custom fields
  reflactSplashIcon(key: any, e: any) {
    this.splash_icon_type = 'custom';
    $("#newappsplashIconPrevImg").removeClass('icon-preview');
    $("#appsplashIconPrevImg").removeClass('app_icon_para');
    $("#newappsplashIconPrevImg").html('');
    $("#appsplashIconPrevImg").html('');
    $("#splashIconName").text('');
    if (key === 'clr') {
      this.appSplashIconClr = e.target.value;
    }
    if (key === 'txt') {
      this.appSplashIconTxt = e.target.value;
    }
    if (key === 'size') {
      this.appSplashIconSize = e.target.value + "px";
    }
    if (key === 'font') {
      this.appSplashIconFont = e.target.value;
    }
    if (key === 'fontclr') {
      this.appSplashIconFontClr = e.target.value;
    }
  }

  selectClrType(clrType: string) {
    this.color_type = clrType;
  }

  selectClrCode(clrCode: string, index: any) {
    this.color_code = clrCode;
    this.userIconClr = clrCode;
    $("li.color_box").removeClass("color_box");
    $("#" + index).addClass('color_box');
  }

  createAppForm = new FormGroup({
    app_name: new FormControl('', Validators.required),
    app_icon_color: new FormControl(''),
    app_icon_name: new FormControl(''),
    icon_font_color: new FormControl(''),
    app_icon_font: new FormControl(''),
    app_icon_size: new FormControl(''),
    splash_appclr: new FormControl(''),
    splash_app_icon_name: new FormControl(''),
    splashicon_font_color: new FormControl(''),
    splash_app_icon_font: new FormControl(''),
    splash_app_icon_size: new FormControl(''),
  })

  get createappform() { return this.createAppForm.controls; }

  // On file Select
  onChange(event: any, appIcon: any) {
    let file = event.target.files[0];
    this.panelService.upload(file).subscribe((event: any) => {
      this.upload = event;

      if (this.upload.success === true) {
        if (appIcon === 'splashIcon') {
          $("#splashIconName").text(file.name);
          this.splash_icon_type = 'upload';
          this.splashscreen_icon_value = this.upload.response;
          $("#newappsplashIconPrevImg").addClass('icon-preview');
          $("#appsplashIconPrevImg").addClass('app_icon_para');
          $("#appsplashIconPrevImg").html('<img src="' + siteURL + '/media/' + this.upload.response + '" width="240px" height="480px" border-radius="12px">');
          $("#newappsplashIconPrevImg").html('<img src="' + siteURL + '/media/' + this.upload.response + '" width="137px" height="286px">');
        } else {
          this.icon_type = 'upload';
          this.icon_values = this.upload.response;
          $("#newAppIconImg").html('<img src="' + siteURL + '/media/' + this.upload.response + '" width="32px" height= "32px;" style="border-radius:3px;">');
          $("#appIconName").text(file.name);
          $("#appIconName").addClass('icon_priew_bg');
          $("#appIconPrevImg").html('<img src="' + siteURL + '/media/' + this.upload.response + '" width="137px" height= "126px;">');
        }

      } //else { this.icon_type = this.icon_values = this.splash_icon_type = this.splashscreen_icon_value = ''; }
    });
  }

  createNewApp() {
    this.submitted = true;
    let formdata = this.createAppForm.value;
    if (this.createAppForm.invalid) {
      return;
    } else {
      if (this.icon_type == 'custom') {
        //this.icon_type = 'custom';
        this.icon_values = formdata.app_icon_name + ',' + formdata.app_icon_color + ',' + formdata.app_icon_font + ',' + formdata.app_icon_size + ',' + this.iconFontColor;
      }
      if (this.splash_icon_type == 'custom') {
        //this.splash_icon_type = 'custom';
        this.splashscreen_icon_value = formdata.splash_app_icon_name + ',' + formdata.splash_appclr + ',' + formdata.splash_app_icon_font + ',' + formdata.splash_app_icon_size + ',' + this.appSplashIconFontClr;
      }
      let authUser = JSON.parse(localStorage.getItem('authUserInfo') || '{}');

      let formdataVal = {
        web_id: authUser.id,
        app_type: 1,
        app_name: formdata.app_name,
        colar_type: this.color_type,
        color_code: this.color_code,
        icon_type: this.icon_type,
        icon_values: this.icon_values,
        splashscreen_icon_type: this.splash_icon_type,
        splashscreen_icon_value: this.splashscreen_icon_value,
        plan_name: '', plan_price: '', start_date: '', expiry_date: ''
      };
      localStorage.setItem('createAppArr', JSON.stringify(formdataVal));
      var arr = JSON.parse(localStorage.getItem('createAppArr') || '{}');

      if (localStorage.getItem('isLoggedIn') != 'true') {
        localStorage.setItem('getstart', "yes");
        this.router.navigate(['/login']);
      }
      else {
        this.panelService.createApp(formdataVal).subscribe(data => {
          this.resultData = data;

          if (this.resultData.success === true) {
            $("#appIconName").text('');
            $("#splashIconName").text('');
            this.successMsg = "message-success";
            setTimeout(() => { this.router.navigate(['/my-apps']); }, 1000);
          } else {
            this.successMsg = "message-failed";
          }
          this.message = this.resultData.message;
          setTimeout(() => { this.message = this.successMsg = ''; }, 4000);
        });
        return;
      }
    }
  }

}
