import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Icartmodel } from '../models/cart.model';
import { Ifoodmodel } from '../models/food.model';
import { IOrdermodel } from '../models/order.model';
import { IpaymentModel } from '../models/payment.model';
import { IUserData } from '../models/userdata.model';
import { CartService } from '../services/cart.service';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public foodcarddata: Ifoodmodel[];
  public closeResult: string;
  public selectedfooddetails: Icartmodel;
  public showcardscreen: boolean;
  public searchdata: string;
  public disableplaceorderbtn: boolean;
  public userdata: IUserData;


  constructor(public homeService: HomeService, private modalService: NgbModal, private router: Router,
    private cartsservice: CartService, public datepipe: DatePipe) {
    this.closeResult = '';
    this.foodcarddata = [] as Ifoodmodel[];
    this.selectedfooddetails = {} as Icartmodel;
    this.showcardscreen = true;
    this.searchdata = '';
    this.disableplaceorderbtn = true;
    this.cardarray = [] as IpaymentModel[];
    this.bank = true;
    this.card = false;
    this.qr = false;
    this.cardnumber = '';
    this.cardname = '';
    this.cardcvv = null;
    this.order = {} as IOrdermodel;
  }

  ngOnInit(): void {
    this.getCardData();
    this.router.navigate(['/home']);
    console.log('hello : ', sessionStorage.getItem('loggedindata'));
    this.userdata = JSON.parse(sessionStorage.getItem('loggedindata'));
    this.cardarray = this.userdata.payment;
  }

  getCardData() {
    this.homeService.getfoodList().subscribe((res: Ifoodmodel[]) => {
      this.foodcarddata = res;
    })
  }

  navigatetoselected(x: string) {
    this.showcardscreen = (x == '/home') ? true : false;
    this.router.navigate([x]);
  }

  addtocart(content, selectedcard: Icartmodel, disablebtn?: string) {
    selectedcard.quantity = 1;
    this.selectedfooddetails = selectedcard;
    this.userdata = JSON.parse(sessionStorage.getItem('loggedindata'));
    if (disablebtn == 'true' && Object.keys(this.userdata.address).length == 0) {
      this.disableplaceorderbtn = true;
    }
    else {
      this.disableplaceorderbtn = false;
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result == 'addthistocart') {
        this.addfoodtocart();
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  confirmorder(content) {
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

  public addfoodtocart(): void {
    this.showcardscreen = false;
    let logicx: Icartmodel;
    this.cartsservice.getfoodList().subscribe((res2: Icartmodel[]) => {

      logicx = res2.find(t => t.id == this.selectedfooddetails.id);
      if (logicx != null && res2.length != 0 && res2[0].dishName != undefined) {
        logicx.quantity = logicx.quantity + 1;
        this.homeService.updatequantity(logicx).subscribe((result) => {
          console.log(result);
          setTimeout(() => {
            this.router.navigate(['/home/cart']);
          }, 500);
        });
      }

      else {
        logicx = this.selectedfooddetails;
        this.homeService.postaddfoodtocart(logicx).subscribe((res: Icartmodel) => {
          console.log(res);
        });
        setTimeout(() => {
          this.router.navigate(['/home/cart']);
        }, 500);
      }

    })

  }

  public searchfood() {
    if (this.searchdata != '')
      this.homeService.getsearchedrestaurant(this.searchdata).subscribe((res: Ifoodmodel[]) => {
        if (Object.keys(res).length == 0) {
          this.homeService.getsearchedfood(this.searchdata).subscribe((res2: Ifoodmodel[]) => {
            this.foodcarddata = res2;
          })
        }
        else
          this.foodcarddata = res;
      })
    else
      this.getCardData();
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


  public onplaceorderpopup(para: string) {
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

  public cardselected(x: IpaymentModel) {
    this.cardnumber = x.cardnumber;
    this.cardname = x.name;
    this.cardcvv = x.cvv;
  }

  public navigatetohome() {
    window.location.reload();
  }

  public placeorder() {
    this.order.userid = this.userdata.id;
    this.order.feedid = this.selectedfooddetails.id;
    this.order.orderstatus = 'Placed';
    this.order.orderDateTime = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    this.order.paymentStatus = 'Paid'
    this.homeService.placeorder(this.order).subscribe((res => {
      console.log(res);
    }));
    setTimeout(() => {
      this.navigatetoselected('/home/track');
    }, 400);
  }
}
