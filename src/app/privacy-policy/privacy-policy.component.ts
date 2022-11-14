import { Component, OnInit } from '@angular/core';
import { PrivacyService } from './privacy.service'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})

export class PrivacyPolicyComponent implements OnInit {
  privacy: any = Array();
  privacy_policy: any = Array();
  message: string | undefined;
  successMsgCls: string = "";

  constructor(private privacyService: PrivacyService) {
  }

  ngOnInit(): void {
    this.getPrivacyPolicy();
  }

  getPrivacyPolicy() {
    this.privacyService.getPrivacy().subscribe(res => {
      console.log('privacy:  ', res);
      this.privacy = res;
      if (this.privacy.success === true) {
        this.privacy_policy = this.privacy.response;
      } else {
        this.successMsgCls = "message-success";
        this.message = this.privacy.message;
      }
    });
  }


}


