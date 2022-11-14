import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from '../myaccount/profile.service';
import { siteURL } from 'src/environments/environment';

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
  styleUrls: ['./panel-header.component.css']
})
export class PanelHeaderComponent implements OnInit {
  checkLogin: boolean = false;
  profile_image: string = "";
  userId: any;
  userInfo: any = [];
  siteURL: any = siteURL;
  constructor(private authService: AuthService, private router: Router, private profileService: ProfileService) { }

  ngOnInit(): void {
    const arr = JSON.parse(localStorage.getItem('authUserInfo') || '{}');
    //this.profile_image = arr.profile_image;
    this.userId = arr.id;
    this.getProfileDetails(this.userId);

    let isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.checkLogin = true;
    } else {
      this.checkLogin = false;
    }
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
