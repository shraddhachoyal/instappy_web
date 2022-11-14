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

    console.log(this.currentTime);
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
  totBanner: number = 0;

  additionalapp_id: any = Array();
  items_data: any = Array();
  authUser: any = Array();
  totAmmount: any = 0;
  apps_details_id: any;


  /*For Banner Cat*/
  bannerArray: any = Array();
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

  //For Additional app (Restro & Rider) form
  app_form_appid: any = '';
  app_form_appuid: any = '';
  app_form_title: any;
  app_form_desc: any;
  app_form_price: any = 0;
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
  documentsArr: any = Array();
  docArr: any = Array();
  doc_auto_id: number = 0;
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

  termsConditionSubmit: any = Array();
  addtermsConditionMsg: string = '';
  addtermsConditionMsgCls: string = '';
  termsCSubmitted = false;
  getTersCRes: any = Array();


  // openAdditionalAppsForm(app_type: any, additional_id: any, app_name: any, app_descriptions: any, price: any, pyment_status: any) {
  //   this.id = 'tab_7';
  //   $("#tab_7").css('display', 'block');
  //   this.additionalAppsForm(app_type, additional_id, app_name, app_descriptions, price, pyment_status);
  // }
  tabChange(ids: any) {
    this.id = ids;
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
  /*************************************
   * Update App
   * ***********************************/
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
          $("#newappsplashIconPrevImg").html('<img src="' + siteURL + '/media/' + this.upload.response + '" width="130px" height="280px" style="border-radius:15px;">');
        }
        if (imgName === 'appIcon') {
          // this.iconUpload = true;
          this.icon_type = 'upload';
          this.icon_values = this.upload.response;
          $("#appIconName").text(file.name);
          console.log('AppIcon:- ', siteURL + '/media/' + this.upload.response);
          $("#appIconPrevImg").addClass('icon-preview');
          $("#appIconPrevImg").html('<div style="max-width:137px; height:126px; border-radius:12px; overflow:hidden;"><img src="' + siteURL + '/media/' + this.upload.response + '"></div>');
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


  /* Used for get AdditionalApp list */
  getMasterAdditionalApps() {
    let authName = this.authUser.full_name;
    this.dashboardService.getAdditionalApps(this.authUser.id).subscribe(data => {
      this.additionalApps = data;
      if (this.additionalApps.success === true) {
        this.additionalAppList = this.additionalApps.response;
        // console.log('additionalAppList: ', this.additionalAppList);
      }
    })
  }

  /****************************************
   *  Banner and Category Section
  **************************************/
  getBanners() {
    this.dashboardService.getBanners(this.app_uid).subscribe(data => {
      this.bannerArr = data;
      if (this.bannerArr.success === true) {
        this.banerSliderImg = 1;
        this.bannerList = this.bannerArr.response;
        this.totBanner = this.bannerList.length;
      }
      console.log('bannerList: ', this.bannerList);
    })
  }

  /* only count useable not data showing using this function*/
  getCategories() {
    this.dashboardService.getCategories(this.app_uid).subscribe(data => {
      this.categoryArr = data;
      if (this.categoryArr.success === true) {
        this.cateSliderImg = 1;
        this.categoryList = this.categoryArr.data;
        this.totCat = this.categoryList.length;
      }
      console.log('categoryList: ', this.categoryList);
    })
  }
  addMoreBanner() {
    let value = this.auto_id;
    console.log('bannerArray: ', this.bannerArray);

    value++;
    if (value < 5) {
      this.auto_id = value;
      console.log("the hit is ", value);
      this.bannerArray.push(value)
    } else {
      let messaageData = 'Banner can not be more then 4';
      alert(messaageData);
    }
  }

  // Code which count number of CategoryImages added
  addMoreCategory() {
    let value = this.auto_idd;
    value++;
    if (value < 9) {
      this.auto_idd = value;
      console.log("auto_idd ", value);
      this.categoryArray.push(value)
    } else {
      let messaageData = 'Category can not be more then 8';
      alert(messaageData);
    }
  }

  // Upload Banner Images
  BannerImages(event: any, id: any) {
    let file = event.target.files[0];
    this.panelService.upload(file).subscribe((event: any) => {
      this.upload = event;
      if (this.upload.success === true) {
        var imgName = this.upload.response;
        var app_uid = this.app_uid
        this.arr1.push({ app_uid: this.app_uid, banner_name: imgName });
        console.log("The value of banners is from arr1 ", this.arr1);
        console.log("the type of arr1 is ", typeof this.arr1)
        localStorage.setItem('session1', JSON.stringify(this.arr1))
        // $("#bannerimg1_img").html(this.upload.response)
        let img = '<img src="' + siteURL + '/media/' + this.upload.response + '" width="30px;" style="border-radius:2px; height:15px; margin-top:5px;"/>';
        $("#bannerimg_" + id).html(img);
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
        let catArr = { "app_uid": this.app_uid, "category_name": catName, "category_image": imgName }
        this.categpriesArr.push(catArr);
        let img = '<img src="' + siteURL + '/media/' + this.upload.response + '" width="30px;" style="border-radius:2px; height:15px; margin-top:5px;"/>';
        $("#categoryimg_" + catIndex).html(img);
      }
    });
  }

  submitCatBanData() {
    interface submitArray {
      banner: any;
      category: any;
    }
    console.log('categpriesArr: ', this.categpriesArr);
    const arr3: submitArray[] = [
      { banner: JSON.parse(localStorage.session1), category: this.categpriesArr }
    ]

    localStorage.removeItem('session1');
    // localStorage.removeItem('session2');
    this.postdata = arr3[0]
    this.dashboardService.addCatBan(this.postdata).subscribe(data => {
      this.postdata = data;
      if (this.postdata.success === true) {
        this.postdata = this.postdata.response;
      }
    })
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

    this.dashboardService.updateAppName(formdataVal).subscribe(data => {
      this.resultData = data;
      if (this.resultData.success === true) {
        $("#myappname").text(appname);
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
  /************************
    Notification Section
  *************************/
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
    Payment Section
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
    Tax Section
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

  /************************************************************
    Additional Apps Section
    app-type = 3 is for Restaurant AND  2 is for Rider App
  *************************************************************/

  /* Going to next tab by clicking Next btn */
  additionalFormTab(hideSec: any, showSec: any) {
    $("#" + showSec).css('display', 'block');
    $("#" + hideSec).css('display', 'none');
  }

  /* After click to More Details */
  additionalAppsForm(app_type: number, id: number, app_title: any, app_desc: any, app_price: any, pyment_status: any) {
    this.app_form_appid = id;
    this.app_form_title = app_title;
    this.app_form_desc = app_desc;
    this.app_form_price = app_price;
    this.app_type = app_type;
    // this.appDataForm.reset();
    if (this.app_form_appid === '') {
      $("#additionalAppIcon_name").html('');
      $("#additionalAppSplashIcon_name").html('');
    }
    $("#formFirstState").css('display', 'block');
    $("#formSecondState").css('display', 'none');
    $("#formThirdState").css('display', 'none');
    $("#additionalAppIcon_img").html('');
    $("#additionalAppSplashIcon_img").html('');
    restaurantFunction(app_type, id, pyment_status);
    this.getAPPP(app_type);
  }

  /* This function is used for add Additional form details */
  /************************
   * Add App Start
   * *************************/
  appDataForm = new FormGroup({
    apps_name: new FormControl('', Validators.required),
    icon_values: new FormControl('', Validators.required),
    splashscreen_icon_value: new FormControl('')
  })
  get appdataform() { return this.appDataForm.controls; }

  additionalAppForminfoSubmit() {
    this.additionalAppSubmitted = true;
    if (this.appDataForm.invalid) {
      return;
    } else {
      let formdata = this.appDataForm.value;
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
          this.getAPPP(this.app_type);
          setTimeout(() => {
            $("#formFirstState").css('display', 'none');
            $("#formSecondState").css('display', 'block');
          }, 3000);
        } else {
          this.addAdditionalAppMsg = "Oops! Failed to create yourapp";
          this.addAdditionalSuccessCls = "message-failed";
        }
        setTimeout(() => { this.addAdditionalAppMsg = this.addAdditionalSuccessCls = ''; }, 5000);
      })
    }
  }
  /*******************************
     * Add App End
  ********************************/

  /**********************************
     * Get Apps Details Start
  ***********************************/
  // getRestroAppDetails(app_type: number) {
  //   console.log('restro in');
  //   alert('1032 rest');
  //   this.dashboardService.getAdditionalAppInfo(app_type, this.authUser.id).subscribe(data => {
  //     this.restroAppData = data;
  //     if (this.restroAppData.success === true) {
  //       this.restroAppData = this.restroAppData.response;
  //       this.app_form_appid = this.restroAppData.apps_details_id;
  //       const appIcon = siteURL + '/media/' + this.restroAppData.icon_values;
  //       const appSplashIcon = siteURL + '/media/' + this.restroAppData.splashscreen_icon_value;
  //       $("#additionalAppIcon").html('<img src="' + appIcon + '" width="80px;">');
  //       $("#additionalAppSplashIcon").html('<img src="' + appSplashIcon + '" width="80px;">');

  //       console.log('999 restroAppData: ', this.restroAppData);
  //     } else { this.restroAppData = []; }
  //   });
  // }

  // getRiderAppInfo(app_type: number) {
  //   alert('1049 rider in');
  //   this.dashboardService.getAdditionalAppInfo(app_type, this.authUser.id).subscribe(data => {
  //     this.riderAppData = data;
  //     if (this.riderAppData.success === true) {
  //       this.riderAppData = this.riderAppData.response;
  //       this.app_form_appid = this.riderAppData.apps_details_id;
  //       const appIcon = siteURL + '/media/' + this.riderAppData.icon_values;
  //       const appSplashIcon = siteURL + '/media/' + this.riderAppData.splashscreen_icon_value;
  //       $("#additionalAppIcon_img").html('<img src="' + appIcon + '" width="80px;"  style="border-radius: 5px;">');
  //       $("#additionalAppSplashIcon_img").html('<img src="' + appSplashIcon + '" width="80px;"  style="border-radius: 5px;">');

  //       console.log('1009 riderAppData: ', this.riderAppData);
  //     } else { this.riderAppData = []; }
  //   });
  // }

  /*getAdditionalAppInfo(app_type:number) {
    this.dashboardService.getAdditionalAppInfo(app_type,this.authUser.id).subscribe(data => {
      this.additionalAppInfo = data;
      if (this.additionalAppInfo.success === true) {
        this.additionalAppInfo = this.additionalAppInfo.response;
        // this.appListResult.forEach((each: any) => {
        //   if(each.app_type)
        // });
        console.log('dddd: ', this.additionalAppInfo);
      }
    });
  }*/

  /*Get Restro and Rider Apps Details*/
  getAPPP(app_type: number) {
    console.log('app_type is: ', app_type);

    this.aditionalAppDetails = [];
    this.dashboardService.getAdditionalAppInfo(app_type, this.authUser.id).subscribe(data => {
      this.aditionalAppDetails = data;
      if (this.aditionalAppDetails.success === true) {
        console.log('aditionalAppDetails1 are: ', this.aditionalAppDetails);
        this.app_form_appuid = this.aditionalAppDetails.response.app_uid;
        this.aditionalAppDetails = this.aditionalAppDetails.response;

        const appIcon = siteURL + '/media/' + this.aditionalAppDetails.icon_values;
        const appSplashIcon = siteURL + '/media/' + this.aditionalAppDetails.splashscreen_icon_value;
        $("#additionalAppIcon_img").html('<img src="' + appIcon + '" width="30px;" style="border-radius:2px; height:15px;">');
        $("#additionalAppSplashIcon_img").html('<img src="' + appSplashIcon + '" width="30px;" style="border-radius:2px; height:15px;">');

        //get documents and commission of this App
        this.getDocommission(app_type);
        this.getTermsConditionDetails(app_type);
      } else { this.aditionalAppDetails = []; }
    });
    console.log('aditionalAppDetails are: ', this.aditionalAppDetails);
  }

  /* Not In Use!  This functionis used for get my additional-app list  */
  getMyAdditionalApps(additionalAppType: any) {
    alert('getMyAdditionalApps 1118')
    this.myappsService.myAllApps(this.authUser.id, additionalAppType).subscribe((data) => {
      this.myAdditionalApps = data;
      if (this.myAdditionalApps.success === true) {
        this.myAdditionalAppList = this.myAdditionalApps.response;
        console.log('additional Apps Data shr111 helo :- ', this.myAdditionalAppList);
      }
    })
  }
  /************************
   * Get App End
  **************************/

  /*getMyAdditionalAppDetails(app_id: any) {
    let authName = this.authUser.full_name;
    this.dashboardService.getMyAppDetails(app_id).subscribe(data => {
      this.additionalAppDetailRes = data;
      if (this.additionalAppDetailRes.success === true) {
        this.additionalAppDetail = this.additionalAppDetailRes.response;
        const appIcon = siteURL + '/media/' + this.additionalAppDetail.icon_values;
        const appSplashIcon = siteURL + '/media/' + this.additionalAppDetail.splashscreen_icon_value;
        $("#additionalAppIcon").html('<img src="' + appIcon + '" width="80px;">');
        $("#additionalAppSplashIcon").html('<img src="' + appSplashIcon + '" width="80px;">');
        console.log('additionalAppDetail', this.additionalAppDetail);

      }
    })
  }*/

  /*Documents*/
  getDocommission(app_type: number) {
    let app_uid = this.app_form_appuid;
    this.docAddedStatus = this.docNxtBtn = 0;
    this.dashboardService.getDocommission(app_uid, app_type).subscribe((data) => {
      this.docommissionListResponse = data;
      if (this.docommissionListResponse.success === true) {
        this.documentsArr = Array();
        this.commissionID = this.docommissionListResponse.response.commission.commission_id;
        $("#commission").val(this.docommissionListResponse.response.commission.commission);
        this.docommissionListArr = this.docommissionListResponse.response.document;
        this.docAddedStatus = this.docNxtBtn = 1;
        // this.doc_auto_id = this.docommissionListArr.length;
      }
      else { $("#commission").val(''); }
    })
  }
  appenMoreDocs() {
    let value = this.doc_auto_id;
    value++;
    if (value < 7) {
      this.doc_auto_id = value;
      this.documentsArr.push(value)
    } else {
      this.addDocommissionMsg = "Documents can not be more then 6";
      this.addDocommissionMsgCls = "message-failed";
      setTimeout(() => {
        this.addDocommissionMsg = '';
        this.addDocommissionMsgCls = "";
      }, 3000);
    }
  }

  addDocsCommissionForm = new FormGroup({
    commission: new FormControl(''),
  })
  get addDocsCommissionform() { return this.addDocsCommissionForm.controls; }
  addDocsCommission() {
    this.docommitionSubmitted = true;
    this.docArr = Array();
    if (this.addDocsCommissionForm.invalid) {
      return;
    } else {
      console.log('doc count are: ', this.doc_auto_id);

      for (var i = 0; i <= this.doc_auto_id; i++) {
        var docImgVal = $('input[name="image_required_' + i + '"]:checked').val();
        var docTypeVal = $("#doc_type_" + i).val();
        let docs = { "app_uid": this.app_form_appuid, "document_type": docTypeVal, "image_required": docImgVal }
        this.docArr.push(docs);
      }
      let formdata = this.addDocsCommissionForm.value;
      if (this.app_type === 3) {
        console.log('restro add', this.app_type);
        this.addRestroDocs(formdata.commission);
      } else if (this.app_type === 2) {
        console.log('rider add', this.app_type);
        this.addRiderDocs();
      }
    }
  }
  addRestroDocs(commission: any) {
    let postARr = {
      "app_uid": this.app_form_appuid,
      "commission": commission,
      "document": this.docArr
    }
    console.log('arrLen:- ', this.docArr);

    console.log('post doc check:- ', postARr);

    this.dashboardService.addRestroDocs(postARr).subscribe((data) => {
      this.submitDocommissionRes = data;
      if (this.submitDocommissionRes.success === true) {
        this.addDocommissionMsg = this.submitDocommissionRes.message;
        this.addDocommissionMsgCls = "message-success";
        this.docNxtBtn = 1;
        //this.doc_auto_id = 0;
        this.getDocommission(this.app_type);
        setTimeout(() => {
          $("#formSecondState").css('display', 'none');
          $("#formThirdState").css('display', 'block');
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
        //this.doc_auto_id = 0;
        this.getDocommission(this.app_type);
        setTimeout(() => {
          $("#formSecondState").css('display', 'none');
          $("#formThirdState").css('display', 'block');
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
    this.dashboardService.getTermCondition(this.app_form_appuid, app_type).subscribe((data) => {
      console.log('getTermCondition: ', data);
      this.getTersCRes = data;
      if (this.getTersCRes.success === true) {
        this.getTersCRes.data.content;
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

  /************************
    Cart Section
  *************************/
  addToCart(additionalapp_id: any, additionalapp_name: any, price: any, event: any) {
    this.totAmmount = parseInt(this.totAmmount) + parseInt(price);
    this.additionalapp_id.push(additionalapp_id);
    this.items_data.push({ 'id': additionalapp_id, 'name': additionalapp_name, 'app_type': 2, 'price': price });
    $(".addBtn_" + additionalapp_id).css('display', 'none');//html('<button class="add-price" >Added</button>');
    $(".addedBtn_" + additionalapp_id).css('display', 'block');
    $(".checkoutDiv").css('display', 'block');
  }

  checkout() {
    const checkoutArr = {
      "user_id": this.authUser.id,
      "mainapp_id": this.app_uid,
      "app_name": this.app_name,
      "total_price": this.totAmmount,
      "additional_app_ids": this.additionalapp_id ? this.additionalapp_id : '',
      "additional_apps": this.items_data ? this.items_data : ''
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
