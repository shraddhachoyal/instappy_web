import { Component, OnInit } from '@angular/core';
import { FooterService } from './footer.service'
import { Subemail } from './subemail';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { twitterUrl, fbUrl, linkedinUrl, youtubeUrl } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  twitterUrl = twitterUrl;
  fbUrl = fbUrl;
  linkedinUrl = linkedinUrl;
  youtubeUrl = youtubeUrl;
  data = false;
  UserForm: FormGroup;
  message: string | undefined;
  submitted = false;
  error: string | any;
  constructor(private footerservice: FooterService, private formbulider: FormBuilder) {
    this.UserForm = this.formbulider.group({
      email: ['', [Validators.required, Validators.email]],
    });
    //this.footerservice.getFooter().subscribe(res=>{console.log(res);this.footer=res});
  }
  get contactform() { return this.UserForm.controls; }

  onFormSubmit() {
    this.submitted = true;
    const user = this.UserForm.value;
    this.Createemployee(user);
  }
  Createemployee(subemail: Subemail) {
    this.footerservice.postFooter(subemail).subscribe(
      () => {
        this.data = true;
        this.message = 'Thanks for subscribe';
        this.UserForm.reset();
      });
  }

  ngOnInit(): void {






  }


}

