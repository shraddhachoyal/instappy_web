import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PricingService } from '../pricing/pricing.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  pricingArr: any = Array();
  msgClass: string = '';
  message: string = '';
  additional_apps: any = Array();
  constructor(private router: Router, private pricingService: PricingService) { }

  ngOnInit() {
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

  purchasePlan(plan_id: any, plan_name: any, plan_price: any) {
    this.additional_apps = Array();
    const data = JSON.parse(localStorage.getItem('checkoutData') || '{}');

    data.additional_apps.forEach((element: any) => {
      let obj = {
        "id": element.id,
        "name": element.name,
        "app_type": element.app_type,
        "price": (element.app_type === 1) ? plan_price : element.price
      };
      this.additional_apps.push(obj);
    });
    const checkoutArr = {
      "user_id": data.user_id,
      "mainapp_id": data.mainapp_id,
      "app_name": data.app_name,
      "plan_id": plan_id,
      "total_price": data.total_price,
      "plan_name": plan_name,
      "plan_price": plan_price,
      "additional_app_ids": data.additional_app_ids,
      "additional_apps": this.additional_apps
    }
    localStorage.setItem('checkoutData', JSON.stringify(checkoutArr));
    // console.log('additional apps Arr: ', this.additional_apps);
    this.router.navigate(['checkout']);
  }

}
