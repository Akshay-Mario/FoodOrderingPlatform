import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(public formbuilder: FormBuilder, private _loginservice: RegisterService) {
    this.loginForm = {} as FormGroup;
    this.isloginFormSubmitted = false;
    this.loader=false;
    this.disablebutton=false;
    this.loginData= {} as ILoginData;
   }

  ngOnInit(): void {
    this.initializeformgroup();
  }

  initializeformgroup(){
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required]]
  })
  }

  onSubmit(){
    if(!this.loginForm.invalid){
      this.loader=true;
      this.disablebutton=true;
      this.loginData = this.loginForm.getRawValue();
      this._loginservice.getUserDetails(this.loginData).subscribe((res:ILoginData)=>{
        this.loader=false;
        console.log(res);
        
      });
    }
    this.isloginFormSubmitted=true;

  }
 
}
