import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Ifoodmodel } from '../models/food.model';
import { IUserData } from '../models/userdata.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http: HttpClient) { }

  public getfoodList(): Observable<Ifoodmodel[]>{
    return this.http.get<Ifoodmodel[]>("http://localhost:3000/foodList").pipe(delay(500));
   }

  public postaddfoodtocart(formData:Ifoodmodel):Observable<Ifoodmodel>{
    return this.http.post<Ifoodmodel>("http://localhost:3000/cart",formData).pipe(delay(1500));
  }

  public getsearchedrestaurant(searchData: string): Observable<Ifoodmodel[]>{
    return this.http.get<Ifoodmodel[]>("http://localhost:3000/foodList?restaurant="+searchData).pipe(delay(500));
   }

   public getsearchedfood(searchData: string): Observable<Ifoodmodel[]>{
    return this.http.get<Ifoodmodel[]>("http://localhost:3000/foodList?dishName="+searchData).pipe(delay(500));
   }


}


