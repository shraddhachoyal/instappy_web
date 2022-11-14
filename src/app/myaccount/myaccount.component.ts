import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from './profile.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { siteURL } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
declare var jQuery: any;
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  siteURL: any = siteURL;
  userId: any;
  userInfo: any = [];
  file: File | undefined; // Variable to store file
  submitted = false;
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  countryCode: any;
  state: any;
  responseRes: any = [];
  updateResult: any;
  message: string | undefined;
  msgClass: string = "";
  editPswMsg: string | undefined;
  editPswMsgClass: string = "";
  profileImg: any;
  upload: any = Array;
  formValues: any = [];
  editEmailRes: any = [];
  mailFormMsg: string | undefined;
  editPswRes: any = [];
  passwordViewtype = "password";
  showPassview: boolean = true;
  updateEmailFormSubmitted = false;
  changepassFormSubmitted = false;
  // reactiveForm: FormGroup | undefined;

  constructor(private router: Router, private authService: AuthService, private profileService: ProfileService, private formBuilder: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    const arr = JSON.parse(localStorage.getItem('authUserInfo') || '{}');
    this.userId = arr.id;
    this.getProfileDetails(this.userId);
    this.getAllCountries();
  }

  updateProfileForm = new FormGroup({
    full_name: new FormControl(this.userInfo.full_name, Validators.required),
    company_name: new FormControl(this.userInfo.company_name, Validators.required),
    country: new FormControl(this.userInfo.country, Validators.required),
    state: new FormControl(this.userInfo.state, Validators.required),
    city: new FormControl(this.userInfo.city, Validators.required),
    zipcode: new FormControl(this.userInfo.zipcode, Validators.required),
    address: new FormControl(this.userInfo.address, Validators.required)
  })
  get updateproform() { return this.updateProfileForm.controls; }

  // On file Select
  onImageChange(event: any) {
    this.file = event.target.files[0];
    this.profileImg = '';
    this.profileService.upload(this.file).subscribe((event: any) => {
      this.upload = event;

      if (this.upload.success === true) {
        let pimg = '<img src="' + siteURL + '/media/' + this.upload.response + '" style="max-width: 100%;object-fit: cover;height:100%;"">';
        $("#profileImage").html(pimg);
        this.profileImg = this.upload.response;
      }
    });
  }
  updateProfileSubmit() {
    this.submitted = true;
    let formdata = this.updateProfileForm.value;
    if (this.updateProfileForm.invalid) {
      return;
    } else {
      let formdata = this.updateProfileForm.value;
      if (this.profileImg) {
        this.formValues = {
          full_name: formdata.full_name,
          company_name: formdata.company_name,
          profile_image: this.profileImg,
          country: formdata.country,
          state: formdata.state,
          city: formdata.city,
          zipcode: formdata.zipcode,
          address: formdata.address,
        }
      } else {
        this.formValues = formdata;
      }
      this.profileService.updateProfile(this.userId, this.formValues).subscribe(data => {
        this.responseRes = data;
        if (this.responseRes.success === true) {
          this.msgClass = "message-success";
          setTimeout(() => {
            this.spinner.hide();
            this.message = '';
            this.msgClass = "";
          }, 5000);
        } else {
          this.msgClass = "message-failed";
        }
        this.message = this.responseRes.message;
      });
    }
  }

  getAllCountries() {
    this.profileService.getAllCountries().subscribe(data => {
      this.countryList = data;
    })
  }
  getStateByCountries(event: any) {
    //const value = event.target.value;
    const value = event;
    this.countryCode = value;
    // this.cityList = '';
    this.profileService.getStateByCountries(this.countryCode).subscribe(data => {
      this.stateList = data;
    })
  }

  getCityByState(event: any) {
    //const value = event.target.value;
    const value = event;
    this.state = value;
    this.profileService.getCityByState(this.countryCode, this.state).subscribe(data => {
      this.cityList = data;
    })
    // console.log(this.cityList);

  }

  getProfileDetails(userId: any) {
    this.profileService.getProfileDetails(userId).subscribe(data => {
      this.userInfo = data;
      if (this.userInfo.success === true) {
        this.userInfo = this.userInfo.response;

        /* Get all states of stored country in user profile*/
        /*if (this.userInfo.country) {
          //   this.profileService.getStateByCountries(this.userInfo.country).subscribe(data => {
          //     this.stateList = data;
          //   })
          /* Get all cities of stored country and state in user profile*/
        // if (this.userInfo.state) {
        //   this.profileService.getCityByState(this.userInfo.country, this.userInfo.state).subscribe(data => {
        //     this.cityList = data;
        //   })
        // }
        //}

        /* Get all states of stored country in user profile*/
        if (this.userInfo.country) {
          this.getStateByCountries(this.userInfo.country)
        }

        if (this.userInfo.state) {
          this.getCityByState(this.userInfo.state)
        }
      }

    });
  }

  /*update email*/
  updateEmailForm = new FormGroup({
    email: new FormControl('', Validators.required),
  })
  get emailform() { return this.updateEmailForm.controls; }

  updateEmail() {
    this.updateEmailFormSubmitted = true;
    let formdata = this.updateEmailForm.value
    if (this.updateEmailForm.invalid) {
      this.msgClass = "message-failed";
      this.message = "Email field is required";
      return;
    } else {
      this.profileService.updateProfile(this.userId, formdata).subscribe(data => {
        this.editEmailRes = data;
        if (this.editEmailRes.success === true) {
          this.msgClass = "message-success";
          jQuery("#editEmail").modal("hide");
          setTimeout(() => {
            this.spinner.hide();
            this.message = '';
            this.msgClass = "";
          }, 5000);
          this.getProfileDetails(this.userId);
        } else {
          this.msgClass = "message-failed";
        }
        this.message = this.editEmailRes.message;
      });
    }
  }

  /*changepassForm = this.formBuilder.group({
    check: new FormControl(null),
    password: new FormControl(['']),
    confirmPassword: new FormControl(['']),
  }, {
    validator: this.MustMatch('password', 'confirmPassword')
  });*/

  changepassForm = this.formBuilder.group({
    check: [null],
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
    confirmPassword: ["", [Validators.required]],
  }, {
    validator: this.MustMatch('password', 'confirmPassword')
  });
  get changepassform() { return this.changepassForm.controls; }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  updatePassword() {
    this.changepassFormSubmitted = true;
    let formdata = this.changepassForm.value
    if (this.changepassForm.invalid) {
      return;
    } else {
      let postFormData = {
        "uid": this.userId,
        "password": formdata.password
      }
      this.profileService.updatePassword(postFormData).subscribe(data => {
        this.editPswRes = data;
        this.spinner.hide();
        if (this.editPswRes.success === true) {
          this.editPswMsgClass = "message-success";
          setTimeout(() => { jQuery("#editPassword").modal("hide"); }, 3000);
        } else {
          this.editPswMsgClass = "message-failed";
        }
        this.editPswMsg = this.editPswRes.message;
        setTimeout(() => { this.editPswMsg = this.editPswMsgClass = ""; }, 3000);
      });
    }
  }
  togglePassword(event: any) {
    if (this.showPassview) {
      this.passwordViewtype = "text"
      this.showPassview = false;
    } else {
      this.passwordViewtype = "password";
      this.showPassview = true;
    }
  }
}

