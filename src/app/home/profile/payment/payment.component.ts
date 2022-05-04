import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IpaymentModel } from 'src/app/models/payment.model';
import { IUserData } from 'src/app/models/userdata.model';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public iscardexists: boolean;
  public userdata: IUserData;
  public paymentForm: FormGroup;
  public ispaymentFormSubmitted: boolean;
  public loader: boolean;
  public disablebutton: boolean;
  public cardarray: IpaymentModel[];

  constructor(private formbuilder: FormBuilder, private registerservice: RegisterService,
    private router: Router) {
    this.iscardexists = true;
    this.userdata = JSON.parse(sessionStorage.getItem('loggedindata'));
    this.paymentForm = {} as FormGroup
    this.ispaymentFormSubmitted = false;
    this.loader = false;
    this.disablebutton = false;
    this.cardarray = [] as IpaymentModel[];
  }

  public ngOnInit(): void {

    this.addoredit();

    this.getuserdata();

  }

  public getuserdata(): void {
    this.registerservice.getUserDetailswithid(this.userdata.id).subscribe((res: IUserData) => {
      this.userdata = res[0];
      this.cardarray = this.userdata.payment;
      if(Object.keys(this.cardarray[0]).length == 0){
        this.cardarray.splice(0, 1);
      }
    });

    this.initializeform();

  }

  public initializeform(): void {
    this.paymentForm = this.formbuilder.group({
      name: ['', Validators.required],
      cardnumber: ['', Validators.required],
      month: [, [Validators.required, Validators.max(12), Validators.min(1)]],
      year: [, [Validators.required, Validators.min(2022)]],
      cvv: [, [Validators.required, Validators.max(999), Validators.min(100)]]
    })
  }

  public addoredit(): void {
    if (this.userdata.payment.length == 1) {
      this.iscardexists = false;
    }
    else
      this.iscardexists = true;

  }

  public onSubmit(): void {
    if (!this.paymentForm.invalid) {
      this.loader = true;
      this.disablebutton = true;
      console.log(this.userdata);
      this.userdata.payment.push(this.paymentForm.getRawValue());
      this.registerservice.userdatasave(this.userdata).subscribe((res: IUserData) => {
        sessionStorage.setItem('loggedindata', JSON.stringify(res));
      });
      setTimeout(() => {
        this.iscardexists = true;
        this.loader = false;
        this.disablebutton = false;
        this.ispaymentFormSubmitted = false;
        this.router.navigate(['home/profile/payment']);
      }, 1000);
    }
    this.ispaymentFormSubmitted = true;
  }

  public cardselected(x: IpaymentModel): void {
    this.iscardexists = false;
    this.paymentForm.setValue({
      name: x.name,
      cardnumber: x.cardnumber,
      month: x.month,
      year: x.year,
      cvv: x.cvv
    });
  }

  public addcard(): void {
    this.iscardexists = false;
    this.paymentForm.reset();
  }

}
