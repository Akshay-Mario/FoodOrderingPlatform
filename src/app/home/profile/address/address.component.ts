import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IaddressModel } from 'src/app/models/address.model';
import { IUserData } from 'src/app/models/userdata.model';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  public Isedit: boolean;
  public addressForm: FormGroup;
  public addressData: IaddressModel;
  public isAddressFormSubmitted: boolean;
  public userdata: IUserData;
  public loader: boolean;
  public disablebutton: boolean;

  constructor(private formbuilder: FormBuilder, private regservice: RegisterService, private router: Router) {
    this.Isedit = false;
    this.addressForm = {} as FormGroup;
    this.addressData = {} as IaddressModel;
    this.isAddressFormSubmitted = false;
    this.userdata = JSON.parse(sessionStorage.getItem('loggedindata'));
    this.loader=false;
    this.disablebutton=false;
  }

  public ngOnInit(): void {
    this.initializeform();
    this.userdata = JSON.parse(sessionStorage.getItem('loggedindata'));
  }

  public initializeform(): void {
    this.addressForm = this.formbuilder.group({
      housenumber: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      landmark: ['', Validators.required]
    });
    if (this.userdata.address.housenumber)
      this.addressForm.setValue({
        housenumber: this.userdata.address.housenumber,
        city: this.userdata.address.city,
        state: this.userdata.address.state,
        landmark: this.userdata.address.landmark
      });

  }

  onSubmit() {
    if (!this.addressForm.invalid) {
      this.loader = true;
      this.disablebutton = true;
      this.userdata.address = this.addressForm.getRawValue();
      this.regservice.userdatasave(this.userdata).subscribe((res: IUserData) => {
        sessionStorage.setItem('loggedindata', JSON.stringify(res));
      });
      setTimeout(() => {
        this.Isedit=false;
        this.loader=false;
        this.disablebutton=false;
        this.isAddressFormSubmitted=false;
        this.router.navigate(['home/profile/address']);
      }, 1000);
    }
    this.isAddressFormSubmitted = true;
  }
}
