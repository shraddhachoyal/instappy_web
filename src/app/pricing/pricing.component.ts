import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { PricingService } from './pricing.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})

export class PricingComponent implements OnInit {
  pricingArr: any = Array();
  msgClass: string='';
  message: string ='';
  constructor(private pricingService: PricingService) { }

  ngOnInit(): void {
    this.pricingService.getPricing().subscribe(res => {
      this.pricingArr = res;
      if (this.pricingArr.success === true) {
        this.msgClass = '';
        this.message = "";
        this.pricingArr = this.pricingArr.response;
      } else {
        this.msgClass = 'no-record';
        this.message = "No record found";
      }
    });
  }

}
