import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserData } from 'src/app/models/userdata.model';
import { RegisterService } from 'src/app/services/register.service';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public userdata: IUserData;
  public Isedit: boolean;
  public userForm: FormGroup;
  public isUserFormSubmitted: boolean;
  public loader: boolean;
  public disablebutton: boolean;

  constructor(private formbuider: FormBuilder, private registerservice: RegisterService, private router: Router) {
    this.userForm = {} as FormGroup;
    this.userdata = JSON.parse(sessionStorage.getItem('loggedindata'));
    this.Isedit = false;
    this.isUserFormSubmitted = false;
    this.loader=false;
    this.disablebutton=false;
  }

  public ngOnInit(): void {

    this.initializeform();
    this.userdata = JSON.parse(sessionStorage.getItem('loggedindata'));

  }

  public initializeform(): void {
    this.userForm = this.formbuider.group({
      id: [],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: [0],
      address: [[{}]],
      payment: [[{}]]
    });

    this.userForm.setValue({
      id: this.userdata.id,
      fname: this.userdata.fname,
      lname: this.userdata.lname,
      email: this.userdata.email,
      password: this.userdata.password,
      phone: this.userdata.phone,
      address: this.userdata.address,
      payment: this.userdata.payment
    });
  }

  onSubmit() {
    if (!this.userForm.invalid) {
      this.loader=true;
      this.disablebutton=true;
      this.userdata = this.userForm.getRawValue();
      this.registerservice.userdatasave(this.userdata).subscribe((res: IUserData) => {
        sessionStorage.setItem('loggedindata', JSON.stringify(res));
      });
      setTimeout(() => {
        this.Isedit=false;
        this.loader=false;
        this.disablebutton=false;
        this.isUserFormSubmitted=false;
        this.router.navigate(['home/profile/user']);
      }, 1000);
    }
    this.isUserFormSubmitted = true;

  }
}
