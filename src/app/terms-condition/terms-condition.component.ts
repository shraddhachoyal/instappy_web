import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { TermsService } from './terms.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})


export class TermsConditionComponent implements OnInit {
  terms: any = Array();
  terms_condition: any = Array();
  message: string | undefined;
  successMsgCls: string = "";

  constructor(private termsService: TermsService) {
  }

  ngOnInit(): void {
    this.getTermsCondition();
  }
  getTermsCondition() {
    this.termsService.getTermsandConditions().subscribe(res => {
      console.log('terms_condition:  ', res);
      this.terms = res;
      if (this.terms.success === true) {
        this.terms_condition = this.terms.response;
      } else {
        this.successMsgCls = "message-success";
        this.message = this.terms.message;
      }
    });
  }


}

