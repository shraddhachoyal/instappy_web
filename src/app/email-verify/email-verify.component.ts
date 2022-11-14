import { Component, OnInit } from '@angular/core';
import { EmailVerifyService } from './email-verify.service';
import { Router, ActivatedRoute, ParamMap, Params } from "@angular/router";

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit {
  token: any;
  uid: any;
  result: any = [];
  message: string | undefined;

  constructor(private emailVerifyService: EmailVerifyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.uid = this.route.snapshot.queryParams['uid'];

    this.emailVerifyService.emailVerify(this.uid, this.token).subscribe(data => {
      console.log(data);
      this.result = data;
      if (this.result.message) {
        this.message = this.result.message;
      }
    })
  }

}
