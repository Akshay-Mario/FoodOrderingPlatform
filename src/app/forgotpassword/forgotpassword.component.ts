import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  public forgotpassword: FormGroup;
  public resetpassword: FormGroup;
  public isforgotFormSubmitted: boolean;
  public loader: boolean;
  public disablebutton: boolean;
  public isforgotpassword: boolean;
  public email: string;

  constructor(private formbuider: FormBuilder, private _registerservice: RegisterService) {
    this.forgotpassword = {} as FormGroup;
    this.resetpassword = {} as FormGroup;
    this.isforgotFormSubmitted = false;
    this.loader = false;
    this.disablebutton = false;
    this.isforgotpassword = true;
  }

  ngOnInit(): void {
    this.initializeform();
  }

  initializeform() {
    this.forgotpassword = this.formbuider.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }
  onSubmit() {
    if (!this.forgotpassword.invalid) {
      this.isforgotpassword = false;
      this.loader = true;
      this.disablebutton = true;
      this.email = this.forgotpassword.getRawValue();
      //this._registerservice.getUserDetails(this.email)
    }
    this.isforgotFormSubmitted = true;
  }
  onSubmitreset() { }

}
