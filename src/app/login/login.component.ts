import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, NgModel, FormControlName } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from "@angular/router";
import { AuthService } from '../auth/auth.service';
import { PanelService } from '../panel/panel.service';
import { NgxSpinnerService } from "ngx-spinner";
declare function purchasedMsgShow(): any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  verificationProcess: boolean = true;
  showPassview: boolean = true;
  createReg: boolean = false;
  loginReg: boolean = true;
  forgetReg: boolean = false;
  changePassword: boolean = false;
  passwordViewtype = "password";
  forgotRes: any = [];
  loginResult: any = [];
  loginSuccessMsg: string = "";
  returnUrl: string = "";
  appResultData: any = Array;

  /*Signup*/
  data = false;
  signupResult: any = [];
  UserForm!: FormGroup;
  message: string | undefined;
  submitted = false;
  showMessage: boolean = false;
  error: string | any;
  regMessage: string = "";
  regSuccessMsg: string = "";
  emailExistMsg: string = "";
  emailExistsArr: any = Array();
  resendTokenRes: any = Array();
  resendTokenSuccessMsg: string = "";
  resendTokenmessage: string = "";
  isPurchased: boolean = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
    private router: Router, private authService: AuthService, private panelService: PanelService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.returnUrl = '/my-apps';

    if (localStorage.getItem('isLoggedIn') == "true") {
      this.router.navigate([this.returnUrl]);
    }
    this.UserForm = this.formBuilder.group({
      full_name: ["", [Validators.required, this.fullnameValidation, this.noWhitespaceValidator]],
      email: ["", [Validators.required, this.emailValidation, this.noWhitespaceValidator]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&^_-]+$')
          //Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#!%*?&])([a-zA-Z0-9@$#!%*?&])$')

        ]
      ],
    });
  }
  get signupform() { return this.UserForm.controls; }


  public fullnameValidation(control: FormGroup) {
    let value = control.value;
    var regex = new RegExp("^[a-zA-Z ]+$");
    let isValidCode = regex.test(value);
    return isValidCode == true ? null : { notaname: true };
  }
  public emailValidation(control: FormGroup) {
    let value = control.value;
    var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    let isValidCode = regex.test(value);
    return isValidCode == true ? null : { notanemail: true };
  }
  public noWhitespaceValidator(control: FormGroup) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }
  onSignupFormSubmit() {
    this.submitted = true;
    let formdata = this.UserForm.value;
    if (this.UserForm.invalid) {
      return;
    } else {
      this.loginService.userExists(formdata.email).subscribe(data => {
        this.emailExistsArr = data;
        if (this.emailExistsArr.success === true) {
          this.emailExistMsg = "Email already exists";
          return;
        } else {
          this.emailExistMsg = this.regSuccessMsg = "";
          this.loginService.userSignUp(formdata).subscribe(data => {
            this.signupResult = data;
            if (this.signupResult.success === true) {
              this.regSuccessMsg = "message-success";
              this.regMessage = "User successfully registered! Please check your email to verify your account";
              localStorage.setItem('regEmail', formdata.email);
              setTimeout(() => {
                this.verificationProcess = false;
                this.createReg = false;
                // this.UserForm.reset();
                this.regMessage = this.regSuccessMsg = "";
              }, 3000);
            } else {
              this.regSuccessMsg = "message-failed";
              this.regMessage = "Something going wrong";
              setTimeout(() => { this.regMessage = this.regSuccessMsg = ""; }, 3000);
            }
          })
        }
      });
    }
  }

  /*For Login*/
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })
  get loginform() { return this.loginForm.controls; }
  onLoginFormSubmit() {
    this.submitted = true;
    let formdata = this.loginForm.value
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loginService.userLogin(formdata).subscribe(data => {
        this.loginResult = data;
        let userInfo = [];

        if (this.loginResult.success === true) {
          userInfo = this.loginResult.response;
          let isPurchased = this.loginResult.purchase_status;
          // this.loginForm.reset();
          this.loginSuccessMsg = "message-success";
          this.message = this.loginResult.message;
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('isPurchased', isPurchased);
          localStorage.setItem('authUserInfo', JSON.stringify(userInfo));

          if (localStorage.getItem('getstart') == 'yes') {
            if (isPurchased === true) {
              this.loginSuccessMsg = "message-failed";
              this.message = "You have already purchased your app from this account. Please create or login from a different account to continue.";
              setTimeout(() => { this.message = this.loginSuccessMsg = ''; this.router.navigate([this.returnUrl]); }, 5000);
            } else {
              /* Create new app */
              var web_id = userInfo.id;
              var newAppArr = JSON.parse(localStorage.getItem('createAppArr') || '{}');
              let formdataVal = {
                web_id: web_id,
                app_type: 1,
                app_name: newAppArr.app_name,
                colar_type: newAppArr.colar_type,
                color_code: newAppArr.color_code,
                icon_type: newAppArr.icon_type,
                icon_values: newAppArr.icon_values,
                splashscreen_icon_type: newAppArr.splashscreen_icon_type,
                splashscreen_icon_value: newAppArr.splashscreen_icon_value,
                plan_name: '', plan_price: '', start_date: '', expiry_date: ''
              };
              this.panelService.createApp(formdataVal).subscribe(data => {
                this.appResultData = data;
                if (this.appResultData.success === true) {
                  localStorage.setItem('getstart', "no");
                  localStorage.removeItem('createAppArr');
                  setTimeout(() => { this.router.navigate([this.returnUrl]); }, 1000);
                } else {
                  this.router.navigate(['/panel']);//When failed to create app then redirect to create app view
                }
              });
            }
          } else { this.router.navigate([this.returnUrl]); } // when success logedin without creating app  
        } else {
          this.loginSuccessMsg = "message-failed";// When field login
          this.message = this.loginResult.message;
        }
        this.spinner.hide();
        setTimeout(() => { this.message = ''; }, 5000);
      })
    }
  }

  /*For Forgot Password*/
  forgotPassForm = new FormGroup({
    email: new FormControl('', Validators.required),
  })
  get forgotPassform() { return this.forgotPassForm.controls; }

  onForgotFormSubmit() {
    this.submitted = true;
    let formdata = this.forgotPassForm.value;
    if (this.forgotPassForm.invalid) {
      return;
    } else {
      this.loginService.forgotPassword(formdata).subscribe(data => {
        this.forgotRes = data;
        if (this.forgotRes.success === true) {
          // this.forgotPassForm.reset();
          this.loginSuccessMsg = "message-success";
        } else {
          this.loginSuccessMsg = "message-failed";
        }
        this.message = this.forgotRes.message;
      })
    }
  }

  resendToken() {
    const email = localStorage.getItem('regEmail');
    // alert(email);
    this.loginService.resendToken(email).subscribe(data => {
      this.resendTokenRes = data;
      if (this.resendTokenRes.success === true) {
        this.resendTokenSuccessMsg = "resend-successmsg";
      } else {
        this.resendTokenSuccessMsg = "resend-failedmsg";
      }
      this.resendTokenmessage = this.resendTokenRes.message;
      // setTimeout(() => { this.resendTokenmessage = this.resendTokenSuccessMsg = ''; }, 5000);
    })
  }


  //--------------- end ----------------------------

  togglePassword(event: any) {
    if (this.showPassview) {
      this.passwordViewtype = "text"
      this.showPassview = false;
    } else {
      this.passwordViewtype = "password";
      this.showPassview = true;
    }
  }
  togglebox() {
    this.loginSuccessMsg = "";
    this.message = "";
    if (this.loginReg) {
      this.loginReg = false;
      this.createReg = true;
    } else {
      this.loginReg = true;
      this.createReg = false;
      this.forgetReg = false;
    }
  }

  forgetbox() {
    this.loginSuccessMsg = "";
    this.message = "";
    if (this.forgetReg, this.loginReg) {
      this.forgetReg = true;
      this.loginReg = false;

    } else {
      this.forgetReg = false;
      this.loginReg = true;
    }
  }
  verificationUi() {
    if (this.verificationProcess) {
      this.verificationProcess = false;
    } else {
      this.verificationProcess = true;
    }
  }
}
