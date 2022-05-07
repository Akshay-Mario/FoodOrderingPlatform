import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Icartmodel } from 'src/app/models/cart.model';
import { Ifoodmodel } from 'src/app/models/food.model';
import { IOrdermodel } from 'src/app/models/order.model';
import { IpaymentModel } from 'src/app/models/payment.model';
import { IUserData } from 'src/app/models/userdata.model';
import { CartService } from 'src/app/services/cart.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartfood: Icartmodel[];
  public totalprice: number;
  public disablecheckout: boolean;
  public userdata: IUserData;
  public closeResult: string;

  constructor(private cartservice: CartService, public datepipe: DatePipe, private homeService: HomeService, private router: Router, private modalService: NgbModal) {
    this.cartfood = [] as Icartmodel[];
    this.totalprice = 0;
    this.disablecheckout = true;
    this.userdata = JSON.parse(sessionStorage.getItem('loggedindata'));
    this.cardarray = [] as IpaymentModel[];
    this.bank = true;
    this.card = false;
    this.qr = false;
    this.cardnumber = '';
    this.cardname = '';
    this.cardcvv = null;
    this.order = {} as IOrdermodel;
    this.closeResult = '';

   }

  public ngOnInit(): void {

    this.getcartitems();

  }

  public getcartitems(){
    this.cartservice.getfoodList().subscribe((res: Icartmodel[]) => {
        this.cartfood = res;
        this.totalprice=0;
        res.forEach(d => {
          this.totalprice = this.totalprice + (d.cost*d.quantity);
        })
        if (Object.keys(this.userdata.address).length == 0 || res.length==0) {
          this.disablecheckout = true;
        }
        else {
          this.disablecheckout = false;
        }
    })
    

  }

  public removefromcart(item: string){
    this.cartservice.removefood(item).subscribe((res: Ifoodmodel) => {
          this.ngOnInit();
    });
  }


  //Placeorder popup
  public bank: boolean;
  public card: boolean;
  public qr: boolean;
  public cardarray: IpaymentModel[];
  public cardnumber: string;
  public cardname: string;
  public cardcvv: number;
  public order: IOrdermodel;

  public confirmorder(content) {
    this.modalService.dismissAll();
    this.userdata = JSON.parse(sessionStorage.getItem('loggedindata'));
    this.modalService.open(content, { ariaLabelledBy: 'modal-dialog modal-lg' }).result.then((result) => {
      if (result == 'placeorder') {
        this.placeorder();
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public onplaceorderpopup(para: string): void {
    if (para == 'bank') {
      this.bank = true;
      this.card = false;
      this.qr = false;
    }
    else if (para == 'card') {
      this.bank = false;
      this.card = true;
      this.qr = false;
    }
    else {
      this.bank = false;
      this.card = false;
      this.qr = true;
    }

  }

  public cardselected(x: IpaymentModel): void{
    this.cardnumber = x.cardnumber;
    this.cardname = x.name;
    this.cardcvv = x.cvv;
  }

  public navigatetohome(): void {
    window.location.reload();
  }

  public placeorder(): void{
    this.order.userid = this.userdata.id;
    this.order.feedid = 2;
    this.order.orderstatus = 'Placed';
    this.order.orderDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    this.order.paymentStatus = 'Paid'
    this.homeService.placeorder(this.order).subscribe((res => {
    }));
    setTimeout(() => {
      this.router.navigate(['/home/track']);
    }, 400);
  }
}

