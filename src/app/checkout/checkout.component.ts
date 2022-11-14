import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DashboardService } from '../dashboard/dashboard.service';
import { ProfileService } from '../myaccount/profile.service';
import { BillingInfoService } from './billing-info.service';
import { stripeKey } from 'src/environments/environment';
import { GSTForIN } from 'src/environments/environment';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  submitted = false;
  messageCls: string = '';
  message: string | undefined;
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  countryCode: any;
  state: any;
  resultData: any = [];
  additionalApps: any = Array();
  additionalAppList: any = Array();
  appListArr: any = Array();
  paymentHandler: any = null;
  itemArr: any = Array();
  myPlanTxt: any = '';
  additional_apps: any = Array();
  total_ammount: any = 0;
  sub_total: any = 0;
  discount_amount: any = 0;
  GSTVAT: any = 0;
  displayDiv: any = 'hideSection';
  payDone: number = 0;
  orderItem: any = "";
  appNames: any = Array(); //get checkbox value on check
  additional_app_ids: any = Array();
  additional_app_data: any = Array();
  currDate: any = '';
  currTime: any = '';
  // payDone1: number=0;
  constructor(private profileService: ProfileService, private billingInfoService: BillingInfoService, private dashboardService: DashboardService, private router: Router) {
    const pipe = new DatePipe('en-US');
    this.currDate = pipe.transform(new Date(), 'dd MMM yyyy');
    this.currTime = pipe.transform(new Date(), 'hh:mm a');
  }

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('checkoutData') || '{}');
    this.itemArr = data;
    this.additional_app_ids = this.itemArr.additional_app_ids; // Get selected Additional-Apps
    this.additional_app_data = this.itemArr.additional_apps;

    this.total_ammount = data.total_price;
    this.sub_total = data.total_price;
    if (this.itemArr.plan_price) {
      this.total_ammount = parseInt(this.total_ammount) + parseInt(this.itemArr.plan_price);
      this.sub_total = parseInt(this.sub_total) + parseInt(this.itemArr.plan_price);
    }
    this.getAllCountries();
    this.getAdditionalApps();
    this.invokeStripe();
    console.log('oninit()=> ', this.additional_app_data);
  }

  onChange(id: any, name: any, price: any, event: any) {
    if (event.target.checked) {
      this.total_ammount = parseInt(this.total_ammount) + parseInt(price);
      this.sub_total = parseInt(this.sub_total) + parseInt(price);

      this.additional_app_data.push({ 'id': id, 'name': name, 'app_type': 2, 'price': price });
    } else {
      this.total_ammount = parseInt(this.total_ammount) - parseInt(price);
      this.sub_total = parseInt(this.sub_total) - parseInt(price);
      let index = this.additional_app_data.indexOf(this.additional_app_data);
      this.additional_app_data.splice(index, 1);
    }
    console.log('onChange()->totalAmt: ', this.additional_app_data);
  }


  initializePayment(amount: number) {
    this.payDone = 1;

    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: stripeKey,
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log('Stripe result: ', { stripeToken })
        alert('Stripe token generated 123!');
      }
    });

    paymentHandler.open({
      name: 'FreakyJolly',
      description: 'Buying a Hot Coffee',
      amount: amount * 100
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: stripeKey,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log('result: ', stripeToken)
            alert('Payment has been Successfull Done!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }

  billingForm = new FormGroup({
    full_name: new FormControl('', Validators.required),
    company_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    phone_no: new FormControl('', Validators.required),
    zip_code: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    isChecked: new FormControl(false, Validators.requiredTrue)
    // app_names: new FormControl('')
  })
  get billingform() { return this.billingForm.controls; }

  billingFormSubmit() {
    var arr = JSON.parse(localStorage.getItem('authUserInfo') || '{}');
    this.submitted = true;
    let formdata = this.billingForm.value
    if (this.billingForm.invalid) {
      return;
    } else {
      if (this.additional_app_data.length > 0) {
        this.initializePayment(this.total_ammount);
        this.payDone = 1;
        if (this.payDone === 1) {

          let postArr = {
            "full_name": formdata.full_name,
            "address": formdata.address,
            "company_name": formdata.company_name,
            "country": formdata.country,
            "state": formdata.state,
            "city": formdata.city,
            "email": formdata.email,
            "zip_code": formdata.zip_code,
            "phone_no": formdata.phone_no,
            "web_uid": arr.id,
            "app_uid": this.itemArr.mainapp_id,
            "order_item": JSON.stringify(this.additional_app_data),
            "plan_name": this.itemArr.plan_name,
            "app_names": "appp",
            "discount_amount": this.discount_amount,
            "total_amount": this.total_ammount,
            "coupon_code": '',
            'sub_total': this.sub_total,
            'tax_total': 0,
            'coupon_name': "",
            'coupon_percent': 0,
            'transaction_id': '',
            'payment_type': "Success",
            'transaction_status': 'success',
            'plan_id': 1
          }

          console.log('on-submit postArr: ', postArr);
          this.billingInfoService.checkout(postArr).subscribe(data => {
            this.resultData = data;
            if (this.resultData.success === true) {
              this.resultData = this.resultData.response;
              this.billingForm.reset();
              this.messageCls = "message-success";

              localStorage.removeItem('checkoutData');
              setTimeout(() => {
                this.displayDiv = 'showSection'; $("#checkoutForm").hide();
                // this.router.navigate(['billing-info']);
              }, 20000);
            } else {
              this.messageCls = "message-failed";
            }
            this.message = this.resultData.message;
            setTimeout(() => { this.messageCls = this.message = ''; }, 5000);
          });
        } else {
          this.messageCls = "message-failed";
          this.message = "Payment failed please try again";
        }
      } else {
        this.messageCls = "message-failed";
        this.message = "Please select any app";
      }
    }
  }

  getAllCountries() {
    this.profileService.getAllCountries().subscribe(data => {
      this.countryList = data;
    })
  }
  getStateByCountries(event: any) {
    const value = event.target.value;
    // this.total_ammount = parseInt(this.total_ammount) - parseInt(this.GSTVAT);
    if (value === 'IN') {
      this.GSTVAT = GSTForIN;
      let amtTax = (parseInt(this.sub_total) / 100) * parseInt(this.GSTVAT);
      this.total_ammount = amtTax;
    } else {
      this.getGSTVAT();
    }
    this.countryCode = value;
    this.profileService.getStateByCountries(this.countryCode).subscribe(data => {
      this.stateList = data;
    })
  }

  getGSTVAT() {
    this.GSTVAT = 0;
    if (this.GSTVAT === 0) {
      this.total_ammount = this.sub_total;
    } else { this.total_ammount = (parseInt(this.sub_total) / 100) * parseInt(this.GSTVAT); }
  }

  getCityByState(event: any) {
    const value = event.target.value;
    this.state = value;
    this.profileService.getCityByState(this.countryCode, this.state).subscribe(data => {
      this.cityList = data;
    })
  }

  /* Used for get AdditionalApp list */
  getAdditionalApps() {
    const cartItems = this.itemArr.additional_app_ids;
    var arr = JSON.parse(localStorage.getItem('authUserInfo') || '{}');
    let authName = arr.full_name;
    this.dashboardService.getAdditionalApps(arr.id).subscribe(data => {
      this.additionalApps = data;
      if (this.additionalApps.success === true) {
        this.additionalAppList = this.additionalApps.response;
        this.additionalAppList.forEach((listdata: any) => {
          let resultArr = {
            "app_name": listdata.app_name,
            "additional_id": listdata.additional_id,
            "price": listdata.price,
            "pyment_status": listdata.pyment_status,
            "isCheck": cartItems ? cartItems.includes(listdata.additional_id) : false
          };
          if (listdata.pyment_status === 0) {
            this.appListArr.push(resultArr);
          }
        })
        // console.log('additional-apps:-- ', $('input[class="additional-apps"]:checked').serialize());
      }
    })
  }
}
