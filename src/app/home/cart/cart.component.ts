import { Component, OnInit } from '@angular/core';
import { Icartmodel } from 'src/app/models/cart.model';
import { Ifoodmodel } from 'src/app/models/food.model';
import { IUserData } from 'src/app/models/userdata.model';
import { CartService } from 'src/app/services/cart.service';

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

  constructor(private cartservice: CartService) {
    this.cartfood = [] as Icartmodel[];
    this.totalprice = 0;
    this.disablecheckout = true;
    this.userdata = JSON.parse(sessionStorage.getItem('loggedindata'));
   }

  public ngOnInit(): void {
    this.getcartitems();

    if (Object.keys(this.userdata[0].address).length == 1) {
      this.disablecheckout = true;
    }
    else {
      this.disablecheckout = false;
    }
  }

  public getcartitems(){
    this.cartservice.getfoodList().subscribe((res: Icartmodel[]) => {
        this.cartfood = res;
        res.forEach(d => {
          this.totalprice = this.totalprice + (d.cost*d.quantity);
        })
    })
  }

  public removefromcart(item: string){
    console.log('regf',item)
    this.cartservice.removefood(item).subscribe((res: Ifoodmodel) => {
          this.ngOnInit();
    });
  }
}
