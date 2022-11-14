import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from '../myaccount/profile.service';
import { siteURL } from 'src/environments/environment';
import { DashboardService } from '../dashboard/dashboard.service';
declare function chartcircle(): any;
@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  checkLogin: boolean = false;
  userId: any;
  profile_image: string = "";
  userInfo: any = [];
  siteURL: any = siteURL;
  appDetailRes: any = Array();
  appDetails: any = Array();


  appProgress: any = 2;
  pieChartVal: any = '';
  constructor(private dashboardService: DashboardService, private authService: AuthService, private router: Router, private profileService: ProfileService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const arr = JSON.parse(localStorage.getItem('authUserInfo') || '{}');
    this.userId = arr.id;
    this.getProfileDetails(this.userId);
    this.getMyAppDetails();

    let isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.checkLogin = true;
    } else {
      this.checkLogin = false;
    }
    chartcircle();
  }
  getMyAppDetails() {
    var arr = JSON.parse(localStorage.getItem('authUserInfo') || '{}');
    let authName = arr.full_name;
    const app_uid = this.actRoute.snapshot.params['id'];
    const app_pay_status = this.actRoute.snapshot.params['paystatus'];
    this.dashboardService.getMyAppDetails(app_uid, app_pay_status).subscribe(data => {
      this.appDetailRes = data;
      if (this.appDetailRes.success === true) {
        this.appDetails = this.appDetailRes.response;
        this.pieChart(this.appDetails.app_progress);
      }
    })
  }

  pieChart(appProgress: any) {
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
    $("#greencircle").attr('data-percent', this.pieChartVal);
    $("#bluecircle").attr('data-percent', this.pieChartVal);
  }

  getProfileDetails(userId: any) {
    this.profileService.getProfileDetails(userId).subscribe(data => {
      this.userInfo = data;
      if (this.userInfo.success === true) {
        this.userInfo = this.userInfo.response;
      }
    });
  }
  logout() {
    this.authService.logout();
    this.checkLogin = false;
    this.router.navigate(['/login']);
  }

}
