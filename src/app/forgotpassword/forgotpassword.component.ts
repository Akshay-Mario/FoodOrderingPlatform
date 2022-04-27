import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginData } from '../models/loginData.model';
import { IUserData } from '../models/userdata.model';
import { RegisterService } from '../services/register.service';
import { MustMatch } from '../shared/must-match.validator';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  public forgotpassword: FormGroup;
  public resetpasswordform: FormGroup;
  public isforgotFormSubmitted: boolean;
  public loader: boolean;
  public disablebutton: boolean;
  public isforgotpassword: boolean;
  public email: ILoginData;
  public isresetFormSubmitted: boolean
  public disableresetbutton: boolean;
  public updatepassworddata: IUserData;
  public success: boolean;

  constructor(private formbuider: FormBuilder, private _registerservice: RegisterService, private router: Router) {
    this.forgotpassword = {} as FormGroup;
    this.resetpasswordform = {} as FormGroup;
    this.isforgotFormSubmitted = false;
    this.loader = false;
    this.disablebutton = false;
    this.isforgotpassword = true;
    this.isresetFormSubmitted = false;
    this.disableresetbutton = false;
    this.updatepassworddata = {} as IUserData;
    this.success = false;
  }

  ngOnInit(): void {
    this.initializeform();
  }

  initializeform() {
    this.forgotpassword = this.formbuider.group({
      email: ['', [Validators.required, Validators.email]]
    })
    this.resetpasswordform = this.formbuider.group({
      password:['',[Validators.required]],
      confirmpassword:['',[Validators.required]]
    },
    {validator:MustMatch('password','confirmpassword')}
    )
  }
  onSubmit() {
    if (!this.forgotpassword.invalid) {
      this.loader = true;
      this.disablebutton = true;
      this.email = this.forgotpassword.getRawValue();
      this._registerservice.getUserDetails(this.email).subscribe((res: IUserData) => {
        if (Object.keys(res).length != 0){
          this.loader = false;
          this.isforgotpassword = false;
          this.updatepassworddata = res[0];
        }
        else {
          alert('Email address not registered');
          this.loader = false;
          this.disablebutton = false;
          this.forgotpassword.controls.email.setValue('');
          this.isforgotFormSubmitted = false;
        }
      });
    }
    else {
      this.isforgotFormSubmitted = true;
    }
  }
  onSubmitreset() { 
    if(!this.resetpasswordform.invalid){
      this.loader = true;
      this.disableresetbutton = true;
      this.updatepassworddata.password = this.resetpasswordform.controls.password.value;
      this._registerservice.resetpassword(this.updatepassworddata).subscribe((res: IUserData) => {
        console.log("result", res);
        if(res.password == this.updatepassworddata.password)
          this.success = true;
          setTimeout(() => {
            this.router.navigate(["/login"]);
          },1500);
      })
      
    }
    this.isresetFormSubmitted=true;
  }

}
