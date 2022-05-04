import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Icartmodel } from '../models/cart.model';
import { Ifoodmodel } from '../models/food.model';
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
    private cartsservice: CartService) {
    this.closeResult = '';
    this.foodcarddata = [] as Ifoodmodel[];
    this.selectedfooddetails = {} as Icartmodel;
    this.showcardscreen = true;
    this.searchdata = '';
    this.disableplaceorderbtn = true;
  }

  ngOnInit(): void {
    this.getCardData();
    this.router.navigate(['/home']);
    console.log('hello : ', sessionStorage.getItem('loggedindata'));
    this.userdata = JSON.parse(sessionStorage.getItem('loggedindata'));
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addfoodtocart() {
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

  searchfood() {
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

}
