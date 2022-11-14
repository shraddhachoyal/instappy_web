import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { FaqService } from './faq.service'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})


export class Faqcomponent {
  faq: any = [];
  msgClass: string | undefined;
  message: string | undefined;
  searchStr: string = '';
  constructor(private faqService: FaqService) {
  }
  ngOnInit(): void {
    this.getFaqList();
  }

  searchFaq(search: any) {
    this.searchStr = search.target.value;

    this.getFaqList();
  }

  getFaqList() {
    this.faqService.getFaqList(this.searchStr).subscribe(res => {
      this.faq = res;
      if (this.faq.length > 0) {
        this.msgClass = '';
        this.message = "";
        this.faq = res;
      } else {
        this.msgClass = 'no-record';
        this.message = "No record found";
      }
    });
  }

}