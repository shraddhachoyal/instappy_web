import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MyappsService } from './myapps.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-apps',
  templateUrl: './my-apps.component.html',
  styleUrls: ['./my-apps.component.css']
})
export class MyAppsComponent implements OnInit {
  userId: any;
  resultData: any;
  dummyAppListArr = Array();
  paidAppListArr = Array();
  paidAppsLength: any = 3;
  dummyAppsLength: any = 3;
  // page = 1;
  p: number = 1;
  p1: number = 1;
  msgClass: string | undefined;
  message: string | undefined;
  paidMessage: string | undefined;
  dummyMessage: string | undefined;
  planStatus: any = 0;

  constructor(private router: Router, private authService: AuthService, private myappsService: MyappsService) { }

  ngOnInit(): void {
    var arr = JSON.parse(localStorage.getItem('authUserInfo') || '{}');
    this.userId = arr.id;
    this.myAppsList();
  }

  myAppsList() {
    let appType = 1;
    this.myappsService.myAllApps(this.userId, appType).subscribe(data => {
      // this.totalLength = Object.keys(data).length;
      this.dummyAppListArr = Array(); this.paidAppListArr = Array();
      // this.page = 1;
      this.resultData = data;
      this.msgClass = this.paidMessage = this.dummyMessage = '';

      if (this.resultData.success === true) {
        const pipe = new DatePipe('en-US');

        if (this.resultData.response.dummyapp.length > 0) {
          this.resultData.response.dummyapp.forEach((listdata: any) => {
            let resultArr = {
              "app_uid": listdata.app_uid,
              "web_id": listdata.web_id,
              "app_type": listdata.app_type,
              "app_name": listdata.app_name,
              "app_progress": (listdata.app_progress === 2) ? '1' : '0',
              "colar_type": listdata.colar_type,
              "color_code": listdata.color_code,
              "icon_type": listdata.icon_type,
              "icon_values": listdata.icon_values.split(','),
              "splashscreen_icon_type": listdata.splashscreen_icon_type,
              "splashscreen_icon_value": listdata.splashscreen_icon_value.split(','),
              "plan_name": listdata.plan_name,
              "plan_price": listdata.plan_price,
              "start_date": listdata.start_date,
              "expiry_date": listdata.expiry_date,
              "created_at": pipe.transform(listdata.created_at, 'dd MMM yyyy, h:m a'),
              "app_state": "Purchase"
            };
            this.dummyAppListArr.push(resultArr);
          })
        } else { this.dummyMessage = "No dummy apps found please create your new app"; }

        /* Dummy Apps */
        if (this.resultData.response.paidapp.length > 0) {
          this.resultData.response.paidapp.forEach((listdata: any) => {
            if (listdata.app_progress === 2) {
              this.planStatus = 1;
            }
            let resultArr1 = {
              "app_uid": listdata.app_uid,
              "web_id": listdata.web_id,
              "app_type": listdata.app_type,
              "app_name": listdata.app_name,
              "app_progress": (listdata.app_progress === 2) ? '1' : '0',
              "colar_type": listdata.colar_type,
              "color_code": listdata.color_code,
              "icon_type": listdata.icon_type,
              "icon_values": listdata.icon_values.split(','),
              "splashscreen_icon_type": listdata.splashscreen_icon_type,
              "splashscreen_icon_value": listdata.splashscreen_icon_value.split(','),
              "plan_name": listdata.plan_name,
              "plan_price": listdata.plan_price,
              "start_date": listdata.start_date,
              "expiry_date": listdata.expiry_date,
              "created_at": pipe.transform(listdata.created_at, 'dd MMM yyyy, h:m a'),
              "app_state": "Purchased "
            };
            this.paidAppListArr.push(resultArr1);
          })
        } else { this.paidMessage = "No paid apps found please purchase your new app"; }
      } else {
        // this.msgClass = 'no-record';
        // this.message = "No apps found please create your new app";
        this.dummyMessage = "No dummy apps found please create your new app";
        this.paidMessage = "No paid apps found please purchase your new app";
      }
    })
  }
}
