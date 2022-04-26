import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserData } from '../models/userdata.model';
import { RegisterService } from '../services/register.service';
import { MustMatch } from '../shared/must-match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registerForm: FormGroup;
  public userData: IUserData;
  public isregisterFormSubmitted: boolean;
  public loader: boolean;
  public disablebutton: boolean;

  constructor(private formgroup: FormBuilder, private _userservice: RegisterService) {
    this.userData = {} as IUserData;
    this.registerForm = {} as FormGroup;
    this.isregisterFormSubmitted = false;
    this.loader=false;
    this.disablebutton=false;
  }

  public ngOnInit(): void {
    this.initializeForm();
  }

  //intialize form using form builder
  public initializeForm(): void {
    this.registerForm = this.formgroup.group({
      id: [],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      checkbox: [, Validators.required],
      phone: [0],
      address: [[{}]],
      payment: [[{}]]
    },
    {validator:MustMatch('password','confirmpassword')}
    )
  }

  onSubmit() {
    if(!this.registerForm.invalid){
      this.loader=true;
      this.disablebutton=true;
      this.userData = this.registerForm.getRawValue();
      delete this.userData['confirmpassword']
      delete this.userData['checkbox']
       this._userservice.postUserRegistration(this.userData).subscribe((res:IUserData)=>{
        this.loader=false;
        
      })
    }
    this.isregisterFormSubmitted = true;
  }
}
