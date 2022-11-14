import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, Params } from "@angular/router";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  passwordViewtype = "password";
  showPassview: boolean = true;
  // data = false;
  resultData: any = [];
  message: string | undefined;
  submitted = false;
  error: string | any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  changepassForm = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
  })
  get changepassform() { return this.changepassForm.controls; }

  onChangePasswordSubmit() {
    this.submitted = true;
    let formdata = this.changepassForm.value
    if (this.changepassForm.invalid) {
      console.warn('Invalid value');
      return;
    } else {
      // this.route.params.forEach((params: Params) => {
      //   // this.token = params['token'];
      //   console.warn('token:- ', params['token']);
      // });
      console.warn('Change Password Submitted');
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
