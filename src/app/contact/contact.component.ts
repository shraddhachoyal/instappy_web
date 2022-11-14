import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ContactService } from './contact.service';
import { Register } from './register';
import { Observable } from 'rxjs';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  data = false;
  UserForm!: FormGroup;
  message: string | undefined;
  resMessage: string = "";
  submitted = false;
  showMessage: boolean = false;
  error: string | any;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.UserForm = this.formBuilder.group({
      fullname: [
        "",
        [Validators.required, this.nameValidation, this.noWhitespaceValidator]
      ],
      email: [
        "",
        [Validators.required, this.emailValidation, this.noWhitespaceValidator]
      ],
      companyname: [
        "",
        [
          Validators.required,
          this.noWhitespaceValidator
        ]
      ],
      message: ['', Validators.required],
      acceptTerms: ['', Validators.required],
    });
  }

  get contactform() { return this.UserForm.controls; }

  public nameValidation(control: FormGroup) {
    let value = control.value;
    var regex = new RegExp("^[a-zA-Z ]+$");
    let isValidCode = regex.test(value);
    return isValidCode == true ? null : { notaname: true };
  }
  public noWhitespaceValidator(control: FormGroup) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }
  public emailValidation(control: FormGroup) {
    let value = control.value;
    var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    let isValidCode = regex.test(value);
    return isValidCode == true ? null : { notanemail: true };
  }

  onFormSubmit() {
    this.submitted = true;
    let formdata = this.UserForm.value
    if (this.UserForm.invalid) {
      return;
    }
    else {
      this.spinner.show();
      this.contactService.CreateUser(formdata).subscribe(data => {
        this.message = "Thank you for getting in touch!";
        this.resMessage = "message-success";
        this.submitted = false;
        this.UserForm.reset();
        setTimeout(() => {
          this.spinner.hide();
          this.message = '';
          this.resMessage = "";
        }, 5000);
      });
    }
  }
}
