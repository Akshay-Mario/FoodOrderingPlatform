import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IpaymentModel } from 'src/app/models/payment.model';
import { IUserData } from 'src/app/models/userdata.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public iscardexists: boolean;
  public userdata: IUserData;
  public paymentdata:IpaymentModel;
  public paymentForm: FormGroup;


  constructor(private formbuilder: FormBuilder) {
    this.iscardexists = true;
    this.userdata = JSON.parse(sessionStorage.getItem('loggedindata'));
    this.paymentdata = {} as IpaymentModel;
    this.paymentForm = {} as FormGroup
  }

  public ngOnInit(): void {

    this.addoredit();

    this.initializeform();
  }

  public initializeform(): void{
    this.paymentForm = this.formbuilder.group({
      name:['', Validators.required],
      cardnumber:['', Validators.required],
      month: [, [Validators.required,Validators.max(12)]],
      year: [, Validators.required],
      cvv: [, [Validators.required, Validators.max(999), Validators.min(100)]]
    })
  }

  public addoredit(){
    console.log(Object.keys(this.userdata.payment[0]).length, this.userdata.payment.length)
    if(this.userdata.payment.length == 1){
      this.iscardexists=false;
    }
  }

}
