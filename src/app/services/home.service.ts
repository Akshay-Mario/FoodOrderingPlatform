import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Icartmodel } from '../models/cart.model';
import { Ifoodmodel } from '../models/food.model';
import { IOrdermodel } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http: HttpClient) { }

  public getfoodList(): Observable<Ifoodmodel[]>{
    return this.http.get<Ifoodmodel[]>("http://localhost:3000/foodList").pipe(delay(500));
   }

  public postaddfoodtocart(formData:Icartmodel):Observable<Icartmodel>{
    return this.http.post<Icartmodel>("http://localhost:3000/cart",formData).pipe(delay(200));
  }

  public getsearchedrestaurant(searchData: string): Observable<Ifoodmodel[]>{
    return this.http.get<Ifoodmodel[]>("http://localhost:3000/foodList?restaurant="+searchData).pipe(delay(500));
   }

   public getsearchedfood(searchData: string): Observable<Ifoodmodel[]>{
    return this.http.get<Ifoodmodel[]>("http://localhost:3000/foodList?dishName="+searchData).pipe(delay(500));
   }

   public updatequantity(formData: Icartmodel): Observable<Icartmodel>{
    return this.http.put<Icartmodel>("http://localhost:3000/cart/"+formData.id,formData).pipe(delay(200));
   }

   public placeorder(orderdata: IOrdermodel): Observable<IOrdermodel>{
    return this.http.post<IOrdermodel>("http://localhost:3000/orders",orderdata).pipe(delay(200));
   }


}


