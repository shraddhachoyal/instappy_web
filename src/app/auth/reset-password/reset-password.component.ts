import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, Params } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  UserForm!: FormGroup;
  passwordViewtype = "password";
  showPassview: boolean = true;
  resultData: any = [];
  message: string | undefined;
  submitted = false;
  token: any;
  uid: any;
  resMessage: string = "";

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.uid = this.route.snapshot.queryParams['uid'];
    console.log("Token ===", this.token);
    console.log("User ID ===", this.uid);
  }
  changepassForm = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
  })
  get changepassform() { return this.changepassForm.controls; }

  resetPasswordSubmit() {
    this.submitted = true;
    if (this.changepassForm.invalid) {
      console.warn('Invalid value');
      return;
    } else {
      let formdata = this.changepassForm.value
      this.authService.resetPassword(this.uid, this.token, formdata.password).subscribe(data => {
        console.log("data:  ", data);
        this.resultData = data;
        if (this.resultData.success === true) {
          this.resMessage = "message-success";
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 5000);
        } else {
          this.resMessage = "message-failed";
        }
        this.message = this.resultData.message;
      })
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
