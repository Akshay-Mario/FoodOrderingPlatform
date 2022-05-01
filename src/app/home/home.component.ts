import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ifoodmodel } from '../models/food.model';
import { IUserData } from '../models/userdata.model';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public foodcarddata: Ifoodmodel[];
  public closeResult: string;
  public selectedfooddetails: Ifoodmodel;
  public showcardscreen: boolean;
  public searchdata : string;
  public disableplaceorderbtn: boolean;
  public userdata: IUserData;

  constructor(public homeService: HomeService, private modalService: NgbModal, private router: Router) {
    this.closeResult = '';
    this.foodcarddata = [] as Ifoodmodel[];
    this.selectedfooddetails = {} as Ifoodmodel;
    this.showcardscreen = true;
    this.searchdata = '';
    this.disableplaceorderbtn = true;
  }

  ngOnInit(): void {
    this.getCardData();
    this.router.navigate(['/home']);
    console.log('hello : ',sessionStorage.getItem('loggedindata'));
    this.userdata =  JSON.parse(sessionStorage.getItem('loggedindata'));
  }

  getCardData() {
    this.homeService.getfoodList().subscribe((res: Ifoodmodel[]) => {
      this.foodcarddata = res;
    })
  }

  navigatetoselected(x: string) {
    this.showcardscreen = x == '/home' ? true : false;
    this.router.navigate([x]);
  }

  addtocart(content, selectedcard: Ifoodmodel, disablebtn? :string ) {
    this.selectedfooddetails = selectedcard;
    console.log(this.userdata[0].address)
    if (disablebtn == 'true' && Object.keys(this.userdata[0].address).length == 1 ){
      console.log('yay')
      this.disableplaceorderbtn = true;
    }
    else{
      this.disableplaceorderbtn = false;
    }
    console.log(content);
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
    this.homeService.postaddfoodtocart(this.selectedfooddetails).subscribe((res: Ifoodmodel) => {
      console.log(res);
    });
    this.router.navigate(['/home/cart']);
  }

  searchfood() {
    if(this.searchdata != '' )
    this.homeService.getsearchedrestaurant(this.searchdata).subscribe((res: Ifoodmodel[]) => {
      if(Object.keys(res).length == 0){
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
