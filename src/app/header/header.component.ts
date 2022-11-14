import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
declare function purchasedMsgShow(): any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  checkLogin: boolean = false;
  isPurchased: any = 'false';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isPurchased = (localStorage.getItem('isPurchased') == 'true') ? 'true' : 'false';
    let isLoggedIn = localStorage.getItem('isLoggedIn')

    if (isLoggedIn === 'true') {
      this.checkLogin = true;
    } else {
      this.checkLogin = false;
    }
  }

  getStart() {
    if (this.isPurchased === 'true') {
      purchasedMsgShow();
    } else {
      this.router.navigate(['/panel']);
    }
  }

  logout() {
    this.authService.logout();
    this.checkLogin = false;
    this.router.navigate(['/login']);
  }
}

$(document).ready(function () {
  $("#btn_toggle").click(function () {
    $("#navbar").toggle(1000);
  });
});
