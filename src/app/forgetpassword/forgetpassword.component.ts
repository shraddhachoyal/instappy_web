import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})

export class ForgetpasswordComponent implements OnInit {
  showPassview:boolean=true;
  passwordViewtype="password"; 
  passwordViewtype1="password"; 
  showPassview1:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }
  togglePassword(event: any){
    if(this.showPassview ){
      this.passwordViewtype="text"
      this.showPassview=false;
      this.showPassview=false;
    }else
    {
      this.passwordViewtype="password";
      this.showPassview=true;
    }
  }
  togglePassword1(event: any){
    if(this.showPassview1){
      this.passwordViewtype1="text"
      this.showPassview1=false;
    }else
    {
      this.passwordViewtype1="password";
      this.showPassview1=true;
    }
  }
}
