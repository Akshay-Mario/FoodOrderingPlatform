import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ILoginData } from '../models/loginData.model';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isloginFormSubmitted: boolean;
  public loader: boolean;
  public disablebutton: boolean;
  loginData: ILoginData;

  constructor(public formbuilder: FormBuilder, private _loginservice: RegisterService, private router: Router, private authservice: AuthService) {
    this.loginForm = {} as FormGroup;
    this.isloginFormSubmitted = false;
    this.loader = false;
    this.disablebutton = false;
    this.loginData = {} as ILoginData;
    this.authservice.setIsAuthenticated(false);
    localStorage.setItem("isLoggedIn", "false");
  }

  public ngOnInit(): void {
    this.initializeformgroup();
  }

  public initializeformgroup() {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  public onSubmit(): void {
    if (!this.loginForm.invalid) {
      this.loader = true;
      this.disablebutton = true;
      this.loginData = this.loginForm.getRawValue();
      this._loginservice.getUserDetails(this.loginData).subscribe((res: ILoginData) => {
        if (Object.keys(res).length != 0) {
          if (res[0].password === this.loginData.password) {
            sessionStorage.setItem('loggedindata', JSON.stringify(res[0]));
            this.authservice.setIsAuthenticated(true);
            localStorage.setItem('loggedinuser', res[0]);
            this.router.navigate(["/home"]);
          }
          else{
            alert('Incorrect Password');
            this.loader = false;
            this.disablebutton=false;
          }
        }
        else{
          alert('Email address not registered');
          this.router.navigate(["/register"]);
        }
      });
    }
    this.isloginFormSubmitted = true;

  }

}
