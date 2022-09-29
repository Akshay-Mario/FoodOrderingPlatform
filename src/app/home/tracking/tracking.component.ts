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
  public coordinates: any;
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
      apiKey: "#APIKey#",
      version: "weekly",
    });
    loader.load().then(() => {
      // new google.maps.Map(document.getElementById("map") as HTMLElement, {
      //   center: { lat: -34.397, lng: 150.644 },
      //   zoom: 8,
      const directionsRenderer = new google.maps.DirectionsRenderer();
      var map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 8.6968797, lng: 76.8148368 },
        zoom: 15,
      })
      directionsRenderer.setMap(map)
      //  new google.maps.Map(document.getElementById("map") as HTMLElement, {
      //   center: { lat: 41.850033, lng: -87.6500523 },
      //   zoom: 8,
      // });

      var request = {
        origin: { placeId: "ChIJx41V94frBTsRLHYQf23WIYQ" },
        destination: { placeId: "ChIJS7_krAfqBTsRVOZerrlqhoQ"},
        travelMode: google.maps.TravelMode['DRIVING']
      };
 
       new google.maps.DirectionsService().route(request,function(result, status) {
        if (status == 'OK') {
          directionsRenderer.setDirections(result);
          console.log(result.routes[0].overview_polyline)
          var polyline = result.routes[0].overview_polyline;
          console.log(google.maps.geometry.encoding.decodePath(polyline));
          var x = google.maps.geometry.encoding.decodePath(polyline);
          console.log(x);
          const lineSymbol = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            strokeColor: "#393",
          };
    
          const line = new google.maps.Polyline({
            path: x,
            icons: [
              {
                icon: lineSymbol,
                offset: "100%",
              },
            ],
            map: map,
          });
        
          animateCircle(line);
        }

        function animateCircle(line: google.maps.Polyline) {
          let count = 0;
        
          setInterval(() => {
            count = (count + 1);
        
            const icons = line.get("icons");
        
            icons[0].offset = count / 2 + "%";
            line.set("icons", icons);
          }, 50);
        }
      });
     
      
    }).catch((test) => {console.log('test',test);}

    );
 
    setTimeout(() => {
    console.log('coordinatesx', this.coordinates);
    }, 3000);

  }


}
