import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Icartmodel } from '../models/cart.model';
import { Ifoodmodel } from '../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  public getfoodList(): Observable<Icartmodel[]>{
    return this.http.get<Icartmodel[]>("http://localhost:3000/cart").pipe(delay(200));
   }

   public removefood(id: string): Observable<Ifoodmodel> {
    return this.http.delete<Ifoodmodel>("http://localhost:3000/cart/"+id);
   }



}


