import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { DatePipe } from '@angular/common';
import { OrderHistoryService } from './order-history.service';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.css']
})
export class BillingInfoComponent implements OnInit {
  orderResult: any = [];
  orderList: any = [];
  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('authUserInfo') || '{}');
    //For get all orders of login user
    const pipe = new DatePipe('en-US');
    this.orderHistoryService.getOrderHistories(user.id).subscribe(data => {
      this.orderResult = data;
      if (this.orderResult.success === true) {
        this.orderResult.response.forEach((each: any) => {
          let result = {
            "order_id": each.order_id,
            "company_name": each.company_name,
            "plan_name": each.plan_name,
            "transaction_status": each.transaction_status,
            "total_amount": each.total_amount,
            "order_date": pipe.transform(each.created_at, 'dd MMM yyyy, h:m a')
          }
          this.orderList.push(result);
        })
      }
      console.log('history', this.orderList);
    })
  }

  getOrderHistories() { }
}
