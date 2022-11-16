import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery'
import { data } from 'jquery';
import { DashboardService } from './dashboard.service';
import { DatePipe } from '@angular/common';
import { siteURL } from 'src/environments/environment';
import { PanelService } from '../panel/panel.service';
import { ProfileService } from '../myaccount/profile.service';
import { Router } from "@angular/router";
import * as e from 'express';
import { MyappsService } from '../my-apps/myapps.service'
import { Cat, Ban, submitArray } from './model-class/banners/catbanInterface';
import { threadId } from 'worker_threads';
declare function videopush(): any;
declare function chartcircle(): any;
declare var jQuery: any;
declare function restaurantFunction(app_type: number, id: any, pyment_status: any): any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentDate: string | undefined;
  currentTime: string | undefined;

  constructor(
    private profileService: ProfileService, private router: Router, private panelService: PanelService,
    private actRoute: ActivatedRoute, private dashboardService: DashboardService,
    private myappsService: MyappsService
  ) {
    this.currentDate = new Date().toISOString().slice(0, 10);
    this.currentTime = new Date().toISOString().slice(12, 16);
  }

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

  public slidepartner: SwiperConfigInterface = {
    loop: true,
    autoplay: {
      delay: 2000,
    },

    navigation: {
      nextEl: ".partner-next",
      prevEl: ".partner-prev",
    },
    observer: true,
    observeParents: true,
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
        slidesPerView: 8,
        spaceBetween: 15,
      },
      991: {
        slidesPerView: 8,
        spaceBetween: 15,
      },
    }
  };
  /*If App not connected to firebase then firebaseConnected = 0 
  * If App connected to firebase then firebaseConnected = 1*/
  firebaseConnected = 0;
  appProgress: any = 2;
  pieChartVal: any = '';
  userIconClr: any = '#22ff22';
  id: any = "tab_1";
  app_uid: any;
  app_pay_status: any;
  siteURL = siteURL;
  file: File | undefined; // Variable to store file
  upload: any = Array;
  msgClass: string = '';
  message: string | undefined;
  appDetailRes: any = Array();
  planName: string = '';
  plan_price: any = 0;
  app_name: string = '';
  /*create custom icon*/
  appIconClr: string = "#fecd01";
  iconFontColor: string = "#000";
  appIconTxt: string = 'AP';
  appIconSize: any = "14";
  appIconFont: string = "Arial";
  appSplashIconClr: string = "#fecd01";
  appSplashIconFontClr: string = "#ffe900";
  appSplashIconTxt: string = 'AP';
  appSplashIconSize: any = "14";
  appSplashIconFont: string = "Arial";
  //Update App Info
  successMsg: string = '';
  appsubmitted = false;
  color_type: string = "single";
  color_code: string = "#ffdd00";
  icon_type: string = '';
  icon_values: string = '';
  splashscreen_icon_type: string = '';
  splashscreen_icon_value: string = '';
  // iconUpload = false;

  //For Additional Apps and App Details
  appDetails: any = Array();
  resultData: any;
  appListArr = Array();
  additionalApps: any = Array();
  additionalAppList: any = Array();
  clickedAddItemBtn = false;
  //For Notification
  notiResData: any = Array();
  notiListArr: any = Array();
  delResData: any = Array();
  delResMessage: string | undefined;
  submitted = false;
  error: string | any;
  current_appuid: any;
  notificationImage: any;
  addNotifRes: any = Array();
  addNotSuccessCls: string | undefined;
  addNotSuccessMsg: string = "";
  notificationDetails: any = Array();
  editNotificationImg: any;
  // editNotifRes: any = Array();
  // editNotSuccessCls: string | undefined;
  // editNotSuccessMsg: string = "";
  postEditNotiArr: any = Array();
  nstatus = 0;
  addNStatus = 1;
  //For Payment Getway
  payType: string = 'Paypal';
  paysubmitted = false;
  addPayMsgCls: string = '';
  addPayMsg: string | undefined;
  addPaymentRes: any = Array;
  payMethodArr: any = Array();
  payDataArr: any = Array();
  seckretKey: string = '';
  clientId: string = '';
  paymentID: any = '';
  //For Tax
  countryList: any = Array();
  addTaxRes: any = Array();
  taxsubmitted = false;
  taxDataArr: any = Array();
  tax_id: any;

  categoryArr: any = Array();
  categoryList: any = Array();
  cateSliderImg = 0;
  totCat: number = 0;

  auto_id: number = 1;
  auto_idd: number = 1;
  bannerArr: any = Array();
  bannerList: any = Array();
  banerSliderImg = 0;
  // totBanner: number = 0;  //not in use

  additionalapp_id: any = Array();
  items_data: any = Array();
  authUser: any = Array();
  totAmmount: any = 0;
  apps_details_id: any;
  additionalapps_details_added: any = 1;//1 for show and 0 hide (Connected App Btn)

  /*For Banner Cat*/
  bannerArray: any = Array();
  messaageCatBan: string = '';
  messaageCatBanMsgCls: string = '';

  submitBanCarArray: any;
  submitBanCarArray1: any;
  categoryArray: any = Array();
  category_name: any = "";
  submitMainArray: any = Array();
  postdata: any;
  arr1: Ban[] = [
    // { app_uid: '',banner_name: ''},
  ];
  arr2: Cat[] = [
    // {app_uid:'',category_name:'',category_image:''}
  ]

  categpriesArr: any = Array();
  bannerpriesArr: any = Array();
  addedBanner: any = 0;
  addedCat: any = 0;

  //For Additional app (Restro & Rider) form
  app_form_appid: any = '';
  app_form_appuid: any = '';
  app_form_title: any;
  app_form_desc: any;
  app_form_price: any = 0;
  app_form_paystatus: any = 0;
  app_type: any = '';
  additionalAppSubmitted = false;
  addAdditionalAppResult: any = Array();
  addAdditionalAppMsg: string = '';
  additionalAppIcon: any;
  additionalAppSplashIcon: any;
  addAdditionalSuccessCls: string = '';
  myAdditionalApps: any = Array();
  myAdditionalAppList: any = Array();
  appListResult: any;
  aditionalAppDetails: any = Array();
  restroAppData: any = Array();
  riderAppData: any = Array();

  docommitionSubmitted = false;
  bannerCatSubmitted = false;
  documentsArr: any = Array();
  docArr: any = Array();
  doc_auto_id: number = 1;
  submitDocommissionRes: any = Array();
  addDocommissionMsg: string = '';
  addDocommissionMsgCls: string = '';
  docommissionListResponse: any = Array();
  docommissionListArr: any = Array();
  commissionID: any;
  docAddedStatus: number = 0;
  docNxtBtn: number = 0;
  docRreadioSelected: any;
  appListArrA: any = Array();
  delDocData: any = Array();

  updateAdditionalAppArr: any = Array();

  termsConditionSubmit: any = Array();
  addtermsConditionMsg: string = '';
  addtermsConditionMsgCls: string = '';
  termsCSubmitted = false;
  getTersCRes: any = Array();

  app_state: any = "Not Purchased";

  addedToCartBtn3: any = 0;
  addedToCartBtn2: any = 0;

  catBanMsg: string = '';
  catBanMsgCls: string = '';

  learnMoreApp(app_type: any, additional_id: any, app_name: any, app_descriptions: any, price: any, pyment_status: any) {
    $("#tab_1").removeClass('tab-active');
    $("#tab_7").addClass('tab-active');
    this.id = "tab_7";
    $("#tab_7_hide").css('display', "block");
    this.additionalAppsForm(app_type, additional_id, app_name, app_descriptions, price, pyment_status);
    $("#icon_1").attr('src', "assets/images/panel/icon_1.png");
    $("#icon_7").attr('src', "assets/images/panel/icon_7g.png");
  }

  tabChange(ids: any) {
    this.id = ids;
    if (this.id === 'tab_7') {
      $("#restaurant_step_1").css('display', "block");
      $("#restaurant_step_2").css('display', "none");
    }
    if (this.id === 'tab_5') {
      this.getAllCountries();
      this.getAllPaymentMethods();
      this.getTaxDetails();
    }
    if (this.id === 'tab_2' || this.id === 'tab_3') {
      this.getBanners();
      this.getCategories();
    }
  }
  class: any = "tab_1";
  tab(ids: any) {
    this.id = ids;
  }

  ngOnInit(): void {
    this.authUser = JSON.parse(localStorage.getItem('authUserInfo') || '{}');
    this.app_uid = this.actRoute.snapshot.params['id'];
    this.app_pay_status = this.actRoute.snapshot.params['paystatus'];
    this.app_state = (this.app_pay_status === '1') ? "Purchased" : "Not Purchased";

    this.current_appuid = this.app_uid;
    videopush();
    chartcircle();
    $('.list-active').click(function () {
      $('.list-active').removeClass("active-box");
      $(this).addClass("active-box");
    });

    this.consumerAppDetails();
    this.getMasterAdditionalApps();
    // this.getMyAdditionalApps(3);
  }

  updateAppForm = new FormGroup({
    app_name: new FormControl('', Validators.required),
    app_icon_color: new FormControl(''),
    app_icon_name: new FormControl('', Validators.required),
    app_icon_font: new FormControl(''),
    app_icon_size: new FormControl(''),
    icon_font_color: new FormControl(''),
    splash_appclr: new FormControl(''),
    splashicon_font_color: new FormControl(''),
    splash_app_icon_name: new FormControl('', Validators.required),
    splash_app_icon_font: new FormControl(''),
    splash_app_icon_size: new FormControl(''),
  })
  get updateappform() { return this.updateAppForm.controls; }

  /* Used for get App details */
  consumerAppDetails() {
    let authName = this.authUser.full_name;
    this.dashboardService.getMyAppDetails(this.app_uid, this.app_pay_status).subscribe(data => {
      this.appDetailRes = data;
      if (this.appDetailRes.success === true) {
        this.appDetails = this.appDetailRes.response;
        //For Pie Chart
        this.pieChart(this.appDetails.app_progress);

        const pipe = new DatePipe('en-US');
        let app_icon = this.appDetails.icon_values.split(',');
        let splashscreen_icon = this.appDetails.splashscreen_icon_value.split(',');
        this.planName = this.appDetails.plan_name;
        this.plan_price = this.appDetails.plan_price;
        this.app_name = this.appDetails.app_name;

        let appDetailsArr = {
          "owner_name": authName,
          "app_uid": this.appDetails.app_uid,
          "app_progress": this.appDetails.app_progress,
          "app_name": this.appDetails.app_name,
          "color_type": this.appDetails.colar_type,
          "color_code": this.appDetails.color_code,
          "icon_type": this.appDetails.icon_type,
          "icon_values": app_icon,
          "splashscreen_icon_type": this.appDetails.splashscreen_icon_type,
          "splashscreen_icon_value": splashscreen_icon,
          "plan_name": this.appDetails.plan_name,
          "created_at": pipe.transform(this.appDetails.created_at, 'dd MMM yyyy, hh:mm a')
        }
        this.apps_details_id = this.appDetails.apps_details_id;
        this.userIconClr = this.appDetails.color_code;
        this.color_type = this.appDetails.colar_type;
        this.color_code = this.appDetails.color_code;
        this.icon_type = this.appDetails.icon_type;
        this.icon_values = this.appDetails.icon_values;
        this.splashscreen_icon_type = this.appDetails.splashscreen_icon_type;
        this.splashscreen_icon_value = this.appDetails.splashscreen_icon_value;

        if (this.icon_type === 'custom') {
          this.appIconTxt = app_icon[0] ? app_icon[0] : this.appIconTxt;
          this.appIconClr = app_icon[1] ? app_icon[1] : this.appIconClr;
          this.appIconFont = app_icon[2] ? app_icon[2] : this.appIconFont;
          this.appIconSize = app_icon[3] ? app_icon[3] : this.appIconSize;
          this.iconFontColor = app_icon[4] ? app_icon[4] : this.iconFontColor;
        }
        if (this.splashscreen_icon_type === 'custom') {
          this.appSplashIconTxt = splashscreen_icon[0] ? splashscreen_icon[0] : this.appSplashIconTxt;
          this.appSplashIconClr = splashscreen_icon[1] ? splashscreen_icon[1] : this.appSplashIconClr;
          this.appSplashIconFont = splashscreen_icon[2] ? splashscreen_icon[2] : this.appSplashIconFont;
          this.appSplashIconSize = splashscreen_icon[3] ? splashscreen_icon[3] : this.appSplashIconSize;
          this.appSplashIconFontClr = splashscreen_icon[4] ? splashscreen_icon[4] : this.appSplashIconFontClr;
        }
        if (this.appDetails.app_progress === 1) {
          this.items_data.push({ 'id': this.appDetails.apps_details_id, 'name': this.appDetails.app_name, 'app_type': 1, 'price': 0 });
        }

        this.appDetailRes = appDetailsArr;
      }
    })
  }
  pieChart(appProgress: any) {
    appProgress = 4;
    if (appProgress === 1) {
      this.pieChartVal = 25;
    }
    if (appProgress === 2) {
      this.pieChartVal = 50;
    }
    if (appProgress === 3) {
      this.pieChartVal = 75;
    }
    if (appProgress === 4) {
      this.pieChartVal = 100;
    }
    $("#bluecircle").attr('data-percent', this.pieChartVal);
  }

  /*********************************************
   **   UPDATE CONSUMER APP INFO   **
  ********************************************/
  selectClrType(clrType: string) {
    this.color_type = clrType;
    console.log('color-type: ', this.color_type);
  }
  selectClrCode(clrCode: string, index: any) {
    this.color_code = clrCode;
    this.userIconClr = clrCode;

    $("li.color_box").removeClass("color_box");
    $("#" + index).addClass('color_box');
  }
  //Create App Icon according custom fields
  reflactIcon(key: any, e: any) {
    this.icon_type = 'custom';
    $("#appIconPrevImg").removeClass('icon-preview');
    $("#appIconPrevImg").html('');
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
    this.splashscreen_icon_type = 'custom';
    $("#newappsplashIconPrevImg").removeClass('icon-preview');
    $("#newappsplashIconPrevImg_right").removeClass('app_icon_para');
    $("#newappsplashIconPrevImg_right").html('');
    $("#newappsplashIconPrevImg").html('');
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

  updateApp() {
    this.appsubmitted = true;
    let formdata = this.updateAppForm.value;
    console.log('formdata:- ', formdata);

    if (this.updateAppForm.invalid) {
      return;
    } else {
      // let authUser = JSON.parse(localStorage.getItem('authUserInfo') || '{}');
      if (this.icon_type != 'upload') {
        this.icon_type = 'custom';
        this.icon_values = formdata.app_icon_name + ',' + formdata.app_icon_color + ',' + formdata.app_icon_font + ',' + formdata.app_icon_size + ',' + this.iconFontColor;
      }
      if (this.splashscreen_icon_type != 'upload') {
        this.splashscreen_icon_type = 'custom';
        this.splashscreen_icon_value = formdata.splash_app_icon_name + ',' + formdata.splash_appclr + ',' + formdata.splash_app_icon_font + ',' + formdata.splash_app_icon_size + ',' + this.appSplashIconFontClr;
      }

      let formdataVal = {
        data_id: this.app_uid,
        web_id: this.authUser.id,
        app_type: 1,
        app_name: formdata.app_name,
        colar_type: this.color_type,
        color_code: this.color_code,
        icon_type: this.icon_type,
        icon_values: this.icon_values,
        splashscreen_icon_type: this.splashscreen_icon_type,
        splashscreen_icon_value: this.splashscreen_icon_value,
        plan_name: '', plan_price: '', start_date: '', expiry_date: ''
      };

      this.dashboardService.updateAppDetails(formdataVal, this.app_pay_status).subscribe(data => {
        this.resultData = data;

        if (this.resultData.success === true) {
          $("#appIconName").text('');
          $("#splashIconName").text('');
          this.msgClass = "message-success";
          this.consumerAppDetails();
        } else {
          this.msgClass = "message-failed";
        }
        this.message = this.resultData.message;
        setTimeout(() => { this.message = this.successMsg = ''; }, 5000);
      });
    }
  }

  // On  file Select, this is used for upload image
  onChangeFile(event: any, imgName: any) {
    let file = event.target.files[0];
    console.log('onChangeFile in=> ', imgName);

    this.panelService.upload(file).subscribe((event: any) => {
      this.upload = event;
      if (this.upload.success === true) {
        if (imgName === 'splashIcon') {
          $("#splashIconName").text(file.name);
          this.splashscreen_icon_type = 'upload';
          this.splashscreen_icon_value = this.upload.response;
          $("#newappsplashIconPrevImg").addClass('icon-preview');
          $("#newappsplashIconPrevImg_right").addClass('app_icon_para');
          // $("#newsplashIconPrevImg_right").html('');
          // $("#appsplashIconPrevImg").html('<img src="' + siteURL + '/media/' + this.upload.response + '" width="240px" height="480px" style="border-radius:12px;" alt="">');
          $("#newappsplashIconPrevImg_right").html('<img src="' + siteURL + '/media/' + this.upload.response + '" width="240px" height="480px" style="border-radius:12px;">');
          $("#newappsplashIconPrevImg").html('<img src="' + siteURL + '/media/' + this.upload.response + '" width="137px" height="286px" style="border-radius:12px;">');
        }
        if (imgName === 'appIcon') {
          // this.iconUpload = true;
          this.icon_type = 'upload';
          this.icon_values = this.upload.response;
          $("#appIconName").text(file.name);
          console.log('AppIcon:- ', siteURL + '/media/' + this.upload.response);
          $("#appIconPrevImg").addClass('icon-preview');
          $("#appIconPrevImg").html('<div style="max-width:137px; height:126px; border-radius:12px; overflow:hidden;"><img src="' + siteURL + '/media/' + this.upload.response + '" width="137px" height="126px;"></div>');
          $("#newAppIconImg").html('<img src="' + siteURL + '/media/' + this.upload.response + '" width="32px" height= "32px;" style="border-radius:3px;">');
        }

        if (imgName === 'notificationImg') {
          this.notificationImage = this.upload.response;
        }
        if (imgName === 'editNotificationImg') {
          this.editNotificationImg = this.upload.response;
        }
        if (imgName === 'additionalAppIcon') {
          this.additionalAppIcon = this.upload.response;
        }
        if (imgName === 'additionalAppSplashIcon') {
          this.additionalAppSplashIcon = this.upload.response;
        }
        /* For show uploaded image and image name */
        $("#" + imgName + "_name").html(this.upload.response);
        let img = '<img src="' + siteURL + '/media/' + this.upload.response + '" width="30px;" style="border-radius: 5px;"/>';
        $("#" + imgName + "_img").html(img);
        this.upload.response;
      }
    });
  }


  /************** Used for get AdditionalApp list **********************/
  getMasterAdditionalApps() {
    let authName = this.authUser.full_name;
    this.dashboardService.getAdditionalApps(this.authUser.id).subscribe(data => {
      this.additionalApps = data;
      if (this.additionalApps.success === true) {
        this.additionalAppList = this.additionalApps.response;
        console.log('additionalAppList: ', this.additionalAppList);
      }
    })
  }

  /****************************************
   *  Banner and Category Section
  **************************************/
  getBanners() {
    this.addedBanner = 0;
    this.dashboardService.getBanners(this.app_uid).subscribe(data => {
      this.bannerArr = data;
      if (this.bannerArr.success === true) {
        this.banerSliderImg = 1; this.addedBanner = 1;
        this.bannerList = this.bannerArr.response;
        this.auto_id = this.bannerList.length;
      }
      console.log('bannerList: ', this.bannerList);
    })
  }

  /* only count useable not data showing using this function*/
  getCategories() {
    this.addedCat = 0;
    this.dashboardService.getCategories(this.app_uid).subscribe(data => {
      this.categoryArr = data;
      if (this.categoryArr.success === true) {
        this.cateSliderImg = 1;
        this.addedCat = 1;
        this.categoryList = this.categoryArr.response;
        this.totCat = this.categoryList.response.length;
      }
    })
  }
  addMoreBanner() {
    let value = this.auto_id;
    value++;
    if (value < 5) {
      this.auto_id = value;
      this.bannerArray.push(value)
    } else {
      this.catBanMsgCls = 'message-failed'; this.catBanMsg = "Banner can not be more then 4";
      // this.messaageCatBan = 'Banner can not be more then 4';
      setTimeout(() => { this.catBanMsg = this.catBanMsgCls = ""; }, 3000);
    }
  }

  removeAppendedBan(removeDiv: any, i: any) {
    const index = this.bannerArray.indexOf(i, 0);
    if (index > -1) {
      this.bannerArray.splice(index, 1);
    }
    this.auto_id = this.auto_id - 1;
    console.log('A-Remove: ', this.bannerArray);
  }

  // Code which count number of CategoryImages added
  addMoreCategory() {
    let value = this.auto_idd;
    value++;
    if (value < 9) {
      this.auto_idd = value;
      this.categoryArray.push(value)
    } else {
      this.messaageCatBan = 'Category can not be more then 8';
      this.messaageCatBanMsgCls = "message-failed";
      alert(this.messaageCatBan);
      setTimeout(() => { this.messaageCatBan = this.messaageCatBanMsgCls = ""; }, 3000);
    }
  }

  // Upload Banner Images
  BannerImages(event: any, id: any) {
    let file = event.target.files[0];
    this.panelService.upload(file).subscribe((event: any) => {
      this.upload = event;
      if (this.upload.success === true) {
        var imgName = this.upload.response;
        let img = '<img src="' + siteURL + '/media/' + this.upload.response + '" width="30px;" style="border-radius:2px; height:15px; margin-top:5px;"/>';
        $("#bannerimg_" + id).html(img);
        $("#bannerimg_val" + id).val(this.upload.response);
      }
    });
  }

  CategoryImages(event: any, catIndex: any) {
    let file = event.target.files[0];
    this.panelService.upload(file).subscribe((event: any) => {
      this.upload = event;
      if (this.upload.success === true) {
        var app_uid = this.app_uid;
        var imgName = this.upload.response;
        var catName = $("#category_name" + catIndex).val();
        let img = '<img src="' + siteURL + '/media/' + this.upload.response + '" width="30px;" style="border-radius:2px; height:15px; margin-top:5px;"/>';
        $("#categoryimg_" + catIndex).html(img);
        $("#categoryimg_val" + catIndex).val(this.upload.response);
      }
    });
  }
  addCatBanForm = new FormGroup({
    bannerimg_1: new FormControl('', Validators.required),
    category_name1: new FormControl('', Validators.required),
    categoryimg_1: new FormControl('', Validators.required)
  })
  get addCatBanform() { return this.addCatBanForm.controls; }

  submitCatBanData() {
    interface submitArray { banner: any; category: any; }

    this.bannerCatSubmitted = true;
    this.categpriesArr = Array();
    this.bannerpriesArr = Array();
    if (this.addCatBanForm.invalid) {
      return;
    } else {
      for (var i = 1; i <= this.auto_idd; i++) {
        var catImgVal = $('input[name="categoryimg_val' + i + '"]').val();
        var catNm = $("#category_name" + i).val();
        let catsArr = { "app_uid": this.app_uid, "category_name": catNm, "category_image": catImgVal }
        this.categpriesArr.push(catsArr);
      }
      for (var j = 1; j <= this.auto_idd; j++) {
        var banimgName = $('input[name="bannerimg_val' + j + '"]').val();
        let bansArr = { "app_uid": this.app_uid, "banner_name": banimgName }
        this.bannerpriesArr.push(bansArr);
      }
      const arr3: submitArray[] = [
        { banner: this.bannerpriesArr, category: this.categpriesArr }
      ]
      this.postdata = arr3[0]
      console.log('Ban Cat data:----- ', this.postdata);
      this.dashboardService.addCatBan(this.postdata).subscribe(data => {
        this.postdata = data;
        if (this.postdata.success === true) {
          this.postdata = this.postdata.response;
          this.catBanMsgCls = 'message-success'; this.catBanMsg = "Data updated successfully";
        } else {
          this.catBanMsgCls = 'message-failed'; this.catBanMsg = "Something went wrong! Please try again";
        }
        this.cateSliderImg = 1;
        this.getBanners();
        this.getCategories();
        setTimeout(() => { this.catBanMsgCls = ''; this.catBanMsg = ""; }, 3000);
      })
    }
  }

  /*This function is used for show changes of app name when we type app name in tab-3*/
  addAppname(e: any) {
    let text = e.target.value;
    let limit = 6;
    if (text.length > limit) {
      /* This function is used for set limit on paragraph text/content text */
      text = text.substring(0, limit) + '...';
    } else { text; }
    $(".appname").text(text);
  }
  editName() {
    $('#editAppname').hide();
    $('.updateappname').show();
  }
  updateAppName() {
    let appname: any = $("#myAppName").val();
    let formdataVal = {
      "data_id": this.app_uid,
      "app_name": appname
    }

    this.dashboardService.updateAppName(formdataVal, this.app_pay_status).subscribe(data => {
      this.resultData = data;
      if (this.resultData.success === true) {
        $("#myappname").text(appname);
        $(".appname").text(appname);
        $("#appIconName").text('');
        $("#splashIconName").text('');
        this.msgClass = "message-success";
      } else {
        this.msgClass = "message-failed";
      }
      this.message = this.resultData.message;
      setTimeout(() => { this.message = this.successMsg = ''; }, 3000);
    });

    $('#editAppname').show();
    $('.updateappname').hide();
  }

  /*********************************************
    NOTIFICATION SECTIONS
  **********************************************/
  /* Used for submit Notification form*/
  notificationForm = new FormGroup({
    notification_title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    scheduleNow: new FormControl('', Validators.required),
    notifImage: new FormControl(''),
    notificationDate: new FormControl(''),
    notificationTime: new FormControl(''),
  })
  get notificationform() { return this.notificationForm.controls; }
  addNotification() {
    this.submitted = true;
    let formdata = this.notificationForm.value;
    if (this.notificationForm.invalid) {
      return;
    } else {
      let scheduled_date_time = '';
      this.addNStatus = 1;
      if (formdata.scheduleNow === 'later') {
        scheduled_date_time = formdata.notificationDate + ' ' + formdata.notificationTime;
        this.addNStatus = 2;
      }
      let postNotiArr = {
        "app_uid": this.current_appuid,
        "notification_title": formdata.notification_title,
        "content": formdata.content,
        "image": this.notificationImage,
        "scheduled_date_time": scheduled_date_time,
        "status": this.addNStatus
      }

      this.dashboardService.addNotification(postNotiArr).subscribe(data => {
        this.addNotifRes = data;
        if (this.addNotifRes.success === true) {
          jQuery("#notification_modal").modal("hide");
          this.notificationForm.reset();
          this.showNotification(this.current_appuid, this.nstatus);
          this.addNotSuccessCls = "message-success";
        } else {
          this.addNotSuccessCls = "message-failed";
        }
        this.addNotSuccessMsg = this.resultData.message;
        setTimeout(() => { this.addNotSuccessCls = this.addNotSuccessMsg = ''; }, 5000);
      });
    }
  }
  /* Used for get all Apps of auth user for show on App tabs*/
  getNotifications(ids: any) {
    this.id = ids; // For open notification tab window
    this.dashboardService.getAppdetailsTypeList(this.authUser.id).subscribe(data => {
      this.resultData = data;
      if (this.resultData.success === true) {
        this.appListArr = this.resultData.response;
        this.showNotification(this.appListArr[0].app_uid, this.nstatus);
      }
    });
  }

  filterNotification(e: any) {
    this.nstatus = e.target.value; alert(this.nstatus);
    this.showNotification(this.current_appuid, this.nstatus);
  }
  /* Used for get notification list according selected app (tab)*/
  showNotification(app_uid: any, status: any) {
    this.nstatus = status;
    $("#notificationFilter").css('display', 'none');
    if (this.nstatus === 0) {
      $("#nfilterReset").trigger("reset");
    }
    this.current_appuid = app_uid;
    this.msgClass = this.message = "";
    this.notiListArr = Array();
    const pipe = new DatePipe('en-US');
    this.dashboardService.getNotifications(app_uid, this.nstatus).subscribe(data => {
      this.notiResData = data;
      if (this.notiResData.success === true) {
        if (this.notiResData.response.length > 0) {
          this.notiResData.response.forEach((listdata: any) => {
            let notiStatus = 'Pending';
            if (listdata.status == 1) {
              notiStatus = 'Sent';
            } else if (listdata.status == 2) {
              notiStatus = 'Scheduled';
            }
            let resultArr = {
              "notification_id": listdata.notification_id,
              "app_uid": listdata.app_uid,
              "notification_title": listdata.notification_title,
              "content": listdata.content,
              "image": (listdata.image) ? (siteURL + '/media/' + listdata.image) : '../../assets/images/panel/notifications-box.png',
              "scheduled_date_time": listdata.scheduled_date_time,
              "status": notiStatus,
              "mstatus": listdata.status,
              "created_at": pipe.transform(listdata.scheduled_date_time, 'dd MMM yyyy, h:m a')
            };
            this.notiListArr.push(resultArr);
          })
          $("#notificationFilter").css('display', 'block');
        } else {
          this.msgClass = 'no-record';
          this.message = "No notifications here";
        }
      } else {
        this.msgClass = 'no-record';
        this.message = "No notifications here";
      }
    });
  }
  getNotificationDetails(notification_id: number) {

    this.dashboardService.getNotificationDetails(notification_id).subscribe(data => {
      this.notificationDetails = data;
      if (this.notificationDetails.success === true) {
        const pipe = new DatePipe('en-US');
        this.notificationDetails = this.notificationDetails.response;
        //     let ndate:any = pipe.transform(this.notificationDetails.scheduled_date_time, 'MM/dd/yyyy');
        //     $("#ndate_"+notification_id).each(function (this){ 
        //  let datestring = $(this).val(); 
        //        let dateobj    = new Date();
        //        var formattedstring = dateobj.getUTCDate()+"/"+dateobj.getUTCMonth()+"/"+dateobj.getUTCFullYear();

        //       $(this).val(formattedstring);

        //     })
        let resultArr = {
          "notification_id": this.notificationDetails.notification_id,
          "app_uid": this.notificationDetails.app_uid,
          "notification_title": this.notificationDetails.notification_title,
          "content": this.notificationDetails.content,
          "image": (this.notificationDetails.image) ? (siteURL + '/media/' + this.notificationDetails.image) : '../../assets/images/panel/notifications-box.png',
          "scheduled_date": pipe.transform(this.notificationDetails.scheduled_date_time, 'MM/dd/yyyy'),
          "scheduled_time": pipe.transform(this.notificationDetails.scheduled_date_time, 'hh:m'),
          "created_at": pipe.transform(this.notificationDetails.created_at, 'dd MMM yyyy, h:m a')
        };
        console.log('schedule date: ', resultArr);

        this.notificationDetails = resultArr;
      } else {
        this.notificationDetails = Array();
      }
    })
  }
  /*Used for update notification data*/
  editNotiForm = new FormGroup({
    notification_title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    scheduleNow: new FormControl(''),
    notificationDate: new FormControl(''),
    notificationTime: new FormControl(''),
  })
  get editnotificationform() { return this.editNotiForm.controls; }

  updateNotification(notification_id: number) {
    this.submitted = true;
    let formdata = this.editNotiForm.value;
    if (this.editNotiForm.invalid) {
      return;
    } else {
      this.addNStatus = 1;
      let scheduled_date_time = '';
      if (formdata.scheduleNow === 'later') {
        this.addNStatus = 2;
        scheduled_date_time = formdata.notificationDate + ' ' + formdata.notificationTime;
      }

      if (this.editNotificationImg) {
        this.postEditNotiArr = {
          "notification_title": formdata.notification_title,
          "content": formdata.content,
          "image": this.editNotificationImg,
          "scheduled_date_time": scheduled_date_time,
          "status": this.addNStatus
        }
      } else {
        this.postEditNotiArr = {
          "notification_title": formdata.notification_title,
          "content": formdata.content,
          "scheduled_date_time": scheduled_date_time,
          "status": this.addNStatus
        }
      }
      console.log('postEditNotiArr:  ', this.postEditNotiArr);


      this.dashboardService.updateNotification(notification_id, this.postEditNotiArr).subscribe(data => {
        this.addNotifRes = data;
        if (this.addNotifRes.success === true) {
          this.editNotiForm.reset();
          this.showNotification(this.current_appuid, this.nstatus);
          this.addNotSuccessCls = "message-success";
        } else {
          this.addNotSuccessCls = "message-failed";
        }
        this.addNotSuccessMsg = this.resultData.message;
        setTimeout(() => { this.addNotSuccessCls = this.addNotSuccessMsg = ''; }, 5000);
        jQuery("#edit_notification_modal").modal("hide");
      });
    }
  }
  /* Used for delete notification */
  deleteNotifications(appId: any, notification_id: number) {
    this.dashboardService.deleteNotifications(notification_id).subscribe(data => {
      this.delResData = data;
      this.delResMessage = this.delResData.message;
      this.showNotification(appId, this.nstatus);
    });
  }


  /************************
    SETTING: PAYMENT SECTIONS
  *************************/
  getAllPaymentMethods() {
    this.dashboardService.getAllPaymentMethods().subscribe(data => {
      this.payMethodArr = data;
      if (this.payMethodArr.success === true) {
        this.payMethodArr = this.payMethodArr.response;
      }
    })
  }
  connectToPay(pType: any) {
    this.payType = pType;
    this.seckretKey = '';
    this.clientId = '';
    this.paymentID = '';
    this.getPaymentDetails();
  }
  getPaymentDetails() {
    this.dashboardService.getPaymentDetails(this.app_uid, this.payType).subscribe(data => {
      this.payDataArr = data;
      if (this.payDataArr.success === true) {
        this.payDataArr = this.payDataArr.response;
        this.seckretKey = this.payDataArr.secret_key;
        this.clientId = this.payDataArr.key;
        this.paymentID = this.payDataArr.gateway_id;
      } else {
        this.paymentID = this.seckretKey = this.clientId = '';
      }
    })
  }
  paymentForm = new FormGroup({
    client_ID: new FormControl('', Validators.required),
    secret: new FormControl('', Validators.required)
  })
  get paymentform() { return this.paymentForm.controls; }

  paymentFormSubmit() {
    this.paysubmitted = true;
    let formdata = this.paymentForm.value;

    if (this.paymentForm.invalid) {
      this.message = "Invalid Credentials";
      return;
    } else {
      let payFormArr = {
        "data_id": this.paymentID,
        "app_uid": this.app_uid,
        "gateway_name": this.payType,
        "secret_key": formdata.secret,
        "key": formdata.client_ID
      }
      this.dashboardService.addPaymentGateway(payFormArr, this.paymentID).subscribe(data => {
        this.addPaymentRes = data;
        this.addPayMsg = this.addPaymentRes.message;
        if (this.addPaymentRes.success === true) {
          this.addPayMsgCls = "message-success";
        } else {
          this.addPayMsgCls = "message-failed";
        }
        setTimeout(() => { this.addPayMsg = this.addPayMsgCls = ''; }, 5000);
      })
    }
  }

  /************************
    SETTING: TAX SECTIONS
  *************************/
  getTaxDetails() {
    this.dashboardService.getTaxDetails(this.app_uid).subscribe(data => {
      this.taxDataArr = data;
      if (this.taxDataArr.success === true) {
        this.taxDataArr = this.taxDataArr.data;
        this.tax_id = this.taxDataArr.tax_id;
      }
      else {
        this.tax_id = '';
      }
    })
  }
  getAllCountries() {
    this.profileService.getAllCountries().subscribe(data => {
      this.countryList = data;
    })
  }

  taxForm = new FormGroup({
    country_name: new FormControl('', Validators.required),
    tax_rate: new FormControl('', Validators.required),
  })
  get taxform() { return this.taxForm.controls; }
  taxFormSubmit() {
    this.taxsubmitted = true;
    let formdata = this.taxForm.value;
    if (this.taxForm.invalid) {
      return;
    } else {
      let postTaxArr = {
        "data_id": this.tax_id,
        "app_uid": this.app_uid,
        "country_name": formdata.country_name,
        "tax_rate": formdata.tax_rate
      }
      this.dashboardService.addTax(postTaxArr, this.tax_id).subscribe(data => {
        this.addTaxRes = data;
        if (this.addTaxRes.success === true) {
          this.addPayMsgCls = "message-success";
          this.addPayMsg = this.addTaxRes.message;
        } else {
          this.addPayMsgCls = "message-failed";
          this.addPayMsg = "Something going wrong please try again";
        }
        setTimeout(() => { this.addPayMsg = this.addPayMsgCls = ''; }, 5000);
      })
    }
  }
  /****************************************
   *  SETTING: FIREBASE SECTIONS
  **************************************/
  uploadFirebase(e: any) {
    let file = e.target.files[0];
    /*this.dashboardService.addFirebase(file).subscribe((event: any) => {
      this.upload = event;
      if (this.upload.success === true) {}
    });*/
  }

  /************************************************************
    ADDITIONAL APPS SECTIONS
    Note:-  app-type = 3 is for Restaurant AND  2 is for Rider App
  *************************************************************/

  /* Going to next tab (with show current tab active) by clicking Next btn */
  additionalFormTab(showSec: any, hideSec1: any, hideSec2: any,) {
    $("#" + showSec).css('display', 'block');
    $("#" + hideSec2).css('display', 'none');
    $("#" + hideSec1).css('display', 'none');

    if (showSec === 'formFirstState') {
      this.activeCurrTab('active1', 'active2', 'active3');
    } else if (showSec === 'formSecondState') {
      this.activeCurrTab('active2', 'active1', 'active3');
    } else if (showSec === 'formThirdState') {
      this.activeCurrTab('active3', 'active2', 'active1');
    }
  }

  /* Show current tab active for additional app form and docs and Terms&Cond..... */
  activeCurrTab(activeTab: any, inactiveTab: any, inactiveTab2: any) {
    $("#" + inactiveTab).removeClass('active');
    $("#" + activeTab).addClass('active');
    $("#" + inactiveTab2).removeClass('active');
  }

  /* After click to More Details */
  additionalAppsForm(app_type: number, id: number, app_title: any, app_desc: any, app_price: any, pyment_status: any) {
    this.app_form_appid = id;
    this.app_form_title = app_title;
    this.app_form_desc = app_desc;
    this.app_form_price = app_price;
    this.app_type = app_type;
    this.app_form_paystatus = pyment_status;
    // this.appDataForm.reset();
    if (this.app_form_appid === '') {
      $("#additionalAppIcon_name").html('');
      $("#additionalAppSplashIcon_name").html('');
    }

    $("#formFirstState").css('display', 'block');
    $("#formSecondState").css('display', 'none');
    $("#formThirdState").css('display', 'none');
    this.activeCurrTab('active1', 'active2', 'active3');
    $("#additionalAppIcon_img").html('');
    $("#additionalAppSplashIcon_img").html('');
    restaurantFunction(app_type, id, pyment_status);
    this.getAPP(app_type);
  }

  /* This function is used for add Additional form details */
  appDataForm = new FormGroup({
    app_details_uid: new FormControl(''),
    apps_name: new FormControl('', Validators.required),
    icon_values: new FormControl(''),
    splashscreen_icon_value: new FormControl('')
  })
  get appdataform() { return this.appDataForm.controls; }

  additionalAppForminfoSubmit() {
    this.additionalAppSubmitted = true;
    if (this.appDataForm.invalid) {
      return;
    } else {
      let formdata = this.appDataForm.value;
      if (formdata.app_details_uid) {
        let appData = { "web_id": this.authUser.id, "data_id": formdata.app_details_uid, "colar_type": '', "color_code": '', "app_type": this.app_type, "app_name": formdata.apps_name };
        this.updateAdditionalAppData(appData);
      } else {
        let formdataVal = {
          web_id: this.authUser.id,
          app_type: this.app_type,
          app_name: formdata.apps_name,
          colar_type: '',
          color_code: '',
          icon_type: 'upload',
          icon_values: this.additionalAppIcon,
          splashscreen_icon_type: 'upload',
          splashscreen_icon_value: this.additionalAppSplashIcon,
          plan_name: '', plan_price: '', start_date: '', expiry_date: ''
        };
        this.dashboardService.createAdditionalApp(formdataVal).subscribe((data) => {
          this.addAdditionalAppResult = data;
          if (this.addAdditionalAppResult.success === true) {
            this.addAdditionalAppMsg = "Congrats! App has been successfully created";
            this.addAdditionalSuccessCls = "message-success";
            this.appDataForm.reset();
            $("#additionalAppIcon_name").html('');
            $("#additionalAppSplashIcon_name").html('');
            this.getAPP(this.app_type);
            setTimeout(() => {

              this.activeCurrTab('active2', 'active1', 'active3');
              $("#formFirstState").css('display', 'none');
              $("#formSecondState").css('display', 'block');
              $("#formThirdState").css('display', 'none');
            }, 3000);
          } else {
            this.addAdditionalAppMsg = "Oops! Failed to create yourapp";
            this.addAdditionalSuccessCls = "message-failed";
          }
          setTimeout(() => { this.addAdditionalAppMsg = this.addAdditionalSuccessCls = ''; }, 5000);
        })
      }
    }
  }

  /*This function is used for update additional apps details*/
  updateAdditionalAppData(appData: any) {
    let second_array = appData;
    if (this.additionalAppIcon) {
      var merged = Object.assign(appData, { 'icon_values': this.additionalAppIcon });
      second_array = appData;
    }
    if (this.additionalAppSplashIcon) {
      var merged = Object.assign(appData, { 'splashscreen_icon_value': this.additionalAppSplashIcon });
      second_array = appData;
    }
    this.dashboardService.updateAdditionalApp(second_array).subscribe((data) => {
      this.addAdditionalAppResult = data;
      if (this.addAdditionalAppResult.success === true) {
        this.addAdditionalAppMsg = "App has been successfully updated";
        this.addAdditionalSuccessCls = "message-success";
        this.appDataForm.reset();
        $("#additionalAppIcon_name").html('');
        $("#additionalAppSplashIcon_name").html('');
        this.getAPP(this.app_type);
        setTimeout(() => {
          this.activeCurrTab('active2', 'active1', 'active3');
          $("#formFirstState").css('display', 'none');
          $("#formSecondState").css('display', 'block');
          $("#formThirdState").css('display', 'none');
        }, 3000);
      } else {
        this.addAdditionalAppMsg = "Oops! Failed to update";
        this.addAdditionalSuccessCls = "message-failed";
      }
      setTimeout(() => { this.addAdditionalAppMsg = this.addAdditionalSuccessCls = ''; }, 5000);
    })
  }

  /*Get Restaurant and Rider Apps Details*/
  getAPP(app_type: number) {
    this.aditionalAppDetails = [];
    this.dashboardService.getAdditionalAppInfo(app_type, this.authUser.id).subscribe(data => {
      this.aditionalAppDetails = data;
      if (this.aditionalAppDetails.success === true) {
        this.app_form_appuid = this.aditionalAppDetails.response.app_uid;
        this.aditionalAppDetails = this.aditionalAppDetails.response;

        const appIcon = siteURL + '/media/' + this.aditionalAppDetails.icon_values;
        const appSplashIcon = siteURL + '/media/' + this.aditionalAppDetails.splashscreen_icon_value;
        this.additionalapps_details_added = 1;//For Connect App Button Hide
        $("#additionalAppIcon_img").html('<img src="' + appIcon + '" width="30px;" style="border-radius:2px; height:15px;">');
        $("#additionalAppSplashIcon_img").html('<img src="' + appSplashIcon + '" width="30px;" style="border-radius:2px; height:15px;">');

        this.getDocommission(app_type);
        this.getTermsConditionDetails(app_type);
      } else { this.aditionalAppDetails = []; this.additionalapps_details_added = 0; }
    });
  }
  /* Appended Documents */
  appenMoreDocs() {
    let value = this.doc_auto_id;
    console.log('B-add: ', value);
    value++;
    if (value < 7) {
      this.doc_auto_id = value;
      this.documentsArr.push(value)
      console.log('A-add: ', value);
    } else {
      this.addDocommissionMsg = "Documents can not be more then 6";
      this.addDocommissionMsgCls = "message-failed";
      setTimeout(() => {
        this.addDocommissionMsg = '';
        this.addDocommissionMsgCls = "";
      }, 3000);
    }
  }
  /*Remove Appended Documents Div*/
  removeAppendedDiv(removeDiv: any, i: any) {
    console.log('B-Remove: ', this.documentsArr + '\n' + this.documentsArr.length);

    const index = this.documentsArr.indexOf(i, 0);
    if (index > -1) {
      this.documentsArr.splice(index, 1);
    }

    // let index = this.documentsArr.indexOf(i, 0);
    // this.documentsArr.splice(index, 1);
    // delete this.documentsArr[i];
    // this.documentsArr.pop();
    // const arrCount = this.documentsArr.length;
    this.doc_auto_id = this.doc_auto_id - 1;
    console.log('A-Remove: ', this.documentsArr);
  }

  /* Delete Documents */
  deleteDocument(docID: any) {
    this.dashboardService.deleteDocument(docID).subscribe(data => {
      this.delDocData = data;
      this.addDocommissionMsg = this.delDocData.message;
      this.addDocommissionMsgCls = "message-success";
      setTimeout(() => { this.addDocommissionMsg = this.addDocommissionMsgCls = ''; }, 3000);
      this.getDocommission(this.app_type);
    });
  }

  /* Get Documents / Commission data */
  getDocommission(app_type: number) {
    let app_uid = this.app_form_appuid;
    this.docAddedStatus = 0; this.docNxtBtn = 0;
    this.docommissionListArr = Array();
    this.commissionID = '';
    $("#commission").val('');
    this.dashboardService.getDocommission(app_uid, app_type).subscribe((data) => {
      this.docommissionListResponse = data;
      if (this.docommissionListResponse.success === true) {
        this.documentsArr = Array();
        if (app_type === 3) {
          this.commissionID = this.docommissionListResponse.response.commission.commission_id;
          $("#commission").val(this.docommissionListResponse.response.commission.commission);

          this.docommissionListArr = this.docommissionListResponse.response.document;
          this.doc_auto_id = this.docommissionListArr.length;
        } else {
          this.docommissionListArr = this.docommissionListResponse.response;
          this.doc_auto_id = this.docommissionListArr.length;
        }
        this.docAddedStatus = this.docNxtBtn = 1;
      } else {
        $("#commission").val('');
      }
    })
  }

  addDocsCommissionForm = new FormGroup({
    commission: new FormControl(''),
    doc_type_1: new FormControl('', Validators.required),
  })
  get addDocsCommissionform() { return this.addDocsCommissionForm.controls; }
  addDocsCommission() {
    this.docommitionSubmitted = true;
    this.docArr = Array();
    if (this.addDocsCommissionForm.invalid) {
      console.log('addDocsCommission invalid:- ');
      return;
    } else {
      for (var i = 1; i <= this.doc_auto_id; i++) {
        var docImgVal = $('input[name="image_required_' + i + '"]:checked').val();
        var docTypeVal = $("#doc_type_" + i).val();
        let doc_id = Number($("#req_doc_id_" + i).val());
        let docs = { "required_document_id": doc_id, "document_type": docTypeVal, "image_required": docImgVal };
        this.docArr.push(docs);
      }
      let formdata = this.addDocsCommissionForm.value;
      let commissionVal = $("#commission").val();
      console.log('this.docArr:= ', this.docArr);

      if (this.app_type === 3) {
        this.addRestroDocs(commissionVal);
      } else if (this.app_type === 2) {
        this.addRiderDocs();
      }
    }
  }
  addRestroDocs(commission: any) {
    let postARr = {
      "app_uid": this.app_form_appuid,
      "commission_id": Number(this.commissionID),
      "commission": Number(commission),
      "document": this.docArr
    }

    this.dashboardService.addRestroDocs(postARr).subscribe((data) => {
      this.submitDocommissionRes = data;
      if (this.submitDocommissionRes.success === true) {
        this.addDocommissionMsg = this.submitDocommissionRes.message;
        this.addDocommissionMsgCls = "message-success";
        this.docNxtBtn = 1;
        this.doc_auto_id = 1;
        this.getDocommission(this.app_type);
        setTimeout(() => {
          $("#formFirstState").css('display', 'none');
          $("#formSecondState").css('display', 'none');
          $("#formThirdState").css('display', 'block');
          this.activeCurrTab('active3', 'active1', 'active2');
        }, 3000);
      } else {
        this.addDocommissionMsg = this.submitDocommissionRes.message;
        this.addDocommissionMsgCls = "message-failed";
      }
      setTimeout(() => { this.addDocommissionMsg = this.addDocommissionMsgCls = ''; }, 3000);
    })
  }
  addRiderDocs() {
    let postArr = { "app_uid": this.app_form_appuid, "document": this.docArr }
    this.dashboardService.addRiderDocs(postArr).subscribe((data) => {
      this.submitDocommissionRes = data;
      if (this.submitDocommissionRes.success === true) {
        this.addDocommissionMsg = this.submitDocommissionRes.message;
        this.addDocommissionMsgCls = "message-success";
        this.docNxtBtn = 1;
        this.doc_auto_id = 1;
        this.getDocommission(this.app_type);
        setTimeout(() => {
          $("#formFirstState").css('display', 'none');
          $("#formSecondState").css('display', 'none');
          $("#formThirdState").css('display', 'block');
          this.activeCurrTab('active3', 'active1', 'active2');
        }, 3000);
      } else {
        this.addDocommissionMsg = this.submitDocommissionRes.message;
        this.addDocommissionMsgCls = "message-failed";
      }
      setTimeout(() => {
        this.addDocommissionMsg = this.addDocommissionMsgCls = '';
      }, 3000);
    })
  }

  /* Terms & Conditions */
  getTermsConditionDetails(app_type: number) {
    $("#txtEditor").val('');
    $("#termsCID").val('');
    this.dashboardService.getTermCondition(this.app_form_appuid, app_type).subscribe((data) => {

      this.getTersCRes = data;
      if (this.getTersCRes.success === true) {
        // this.getTersCRes.data.content;
        console.log('TermsC ID: ', this.getTersCRes.data.id)
        $("#termsCID").val(this.getTersCRes.data.id);
        $("#txtEditor").val(this.getTersCRes.data.content);
      }
    })
  }

  addTermConditionForm = new FormGroup({
    content: new FormControl('', Validators.required),
  })
  get addTermConditionform() { return this.addTermConditionForm.controls; }
  addTermCondition() {
    this.termsCSubmitted = true;
    this.docArr = Array();
    if (this.addTermConditionForm.invalid) {
      return;
    } else {
      let formdata = this.addTermConditionForm.value;
      let termsCID = Number($("#termsCID").val());
      if (termsCID) {
        let updateTermsC = {
          data_id: termsCID,
          content: formdata.content
        }
        this.dashboardService.updateTermCondition(updateTermsC).subscribe((data) => {
          this.termsConditionSubmit = data;
          if (this.termsConditionSubmit.success === true) {
            this.addtermsConditionMsg = this.termsConditionSubmit.message;
            this.addtermsConditionMsgCls = "message-success";
            this.getTermsConditionDetails(this.app_type);
          } else {
            this.addtermsConditionMsg = this.termsConditionSubmit.message;
            this.addtermsConditionMsgCls = "message-failed";
          }
          setTimeout(() => {
            this.addtermsConditionMsg = this.addtermsConditionMsgCls = '';
          }, 3000);
        })
      } else {
        let postTerms = {
          app_uid: this.app_form_appuid,
          content: formdata.content,
          content_type: 2
        }
        this.dashboardService.addTermCondition(postTerms).subscribe((data) => {
          this.termsConditionSubmit = data;
          if (this.termsConditionSubmit.success === true) {
            this.addtermsConditionMsg = this.termsConditionSubmit.message;
            this.addtermsConditionMsgCls = "message-success";
            this.getTermsConditionDetails(this.app_type);
          } else {
            this.addtermsConditionMsg = this.termsConditionSubmit.message;
            this.addtermsConditionMsgCls = "message-failed";
          }
          setTimeout(() => {
            this.addtermsConditionMsg = this.addtermsConditionMsgCls = '';
          }, 3000);
        })
      }
    }
  }

  /************************
    Cart Section
  *************************/
  addToCart(app_type: any, additionalapp_id: any, additionalapp_name: any, price: any, event: any) {

    if (app_type === 3) {
      this.addedToCartBtn3 = 1;
    } else if (app_type === 2) {
      this.addedToCartBtn2 = 1;
    }

    this.totAmmount = parseInt(this.totAmmount) + parseInt(price);
    this.additionalapp_id.push(additionalapp_id);
    this.items_data.push({ 'id': additionalapp_id, 'name': additionalapp_name, 'app_type': 2, 'price': price });

    $(".checkoutDiv").css('display', 'block');
    $('.cartbtn_' + additionalapp_id).addClass('current');

    $('.cartbtn_' + additionalapp_id).addClass('current');
    $('.cartbtn_' + additionalapp_id).text('Added');
    $('.cartbtn_' + additionalapp_id).removeClass('bg-light border');

    $('.moredetail_retro').on('click', function () {
      $('.cartbtn_' + additionalapp_id).addClass('current');
      $('.cartbtn_' + additionalapp_id).text('Added');
      $('.cartbtn_' + additionalapp_id).removeClass('bg-light border');
    });
  }

  checkout() {
    const checkoutArr = {
      "user_id": this.authUser.id,
      "mainapp_id": this.app_uid,
      "app_name": this.app_name,
      "total_price": this.totAmmount,
      "additional_app_ids": this.additionalapp_id ? this.additionalapp_id : '',
      "additional_apps": this.items_data ? this.items_data : '',
      "plan_name": '',
      "plan_id": 0
    }
    localStorage.setItem('checkoutData', JSON.stringify(checkoutArr));
    console.log('checkoutArr 873: ', checkoutArr);
    if (this.planName) {
      this.router.navigate(['checkout']);
    } else {
      this.router.navigate(['subscription']);
    }
  }

}
