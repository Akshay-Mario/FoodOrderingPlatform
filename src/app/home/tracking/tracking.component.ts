import { Component, OnInit, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { IOrdermodel } from 'src/app/models/order.model';
import { IUserData } from 'src/app/models/userdata.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  public searchdata: number;
  public allorders: IOrdermodel[];
  public userdata: IUserData;
  public orderstatus: string;
  @ViewChild('maps') Maps: HTMLElement;

  constructor(private orderservice: OrderService) {
    this.searchdata = null;
    this.allorders = [] as IOrdermodel[];
    this.userdata = JSON.parse(sessionStorage.getItem('loggedindata'));
    this.orderstatus = '';
  }

  public ngOnInit(): void {

    this.getorderedfood();
    this.getLocation();


  }

  public ngAfterViewInit(): void{
  }

  public getorderedfood(): void{
    this.orderservice.getUserDetails(this.userdata.id).subscribe((res: IOrdermodel[]) => {
      this.allorders = res;  
      this.orderstatus = 'Placed'    
    });
    this.status('Placed');
    
  }

status(x: string){
  setTimeout(() => {
     this.orderstatus = x;
     if(x  == 'Placed')
        this.status('inprogress')
     if(x == 'inprogress')
      this.status('shipped');
     if(x == 'shipped')
       this.status('Delivered')
  }, 3000);
}
  
  searchorder() {
    let id = this.searchdata%12230;
    this.orderservice.searchorder(id).subscribe((res: IOrdermodel[]) => {
      this.allorders = res;  
      this.orderstatus = 'Placed'    
    });
    this.status('Placed');
    
  }

  public getLocation(){
    console.log(document.getElementById("map") as HTMLElement)
    const loader = new Loader({
      apiKey: "#yourAPi#",
      version: "weekly",
    });
    loader.load().then(() => {
       new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
    
  }

}
