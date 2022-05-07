import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IOrdermodel } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public getUserDetails(Userid: number): Observable<IOrdermodel[]> {
    return this.http.get<IOrdermodel[]>("http://localhost:3000/orders?userid=" + Userid).pipe(delay(500));
  }  

  
  public searchorder(Userid: number): Observable<IOrdermodel[]> {
    return this.http.get<IOrdermodel[]>("http://localhost:3000/orders?id=" + Userid).pipe(delay(500));
  }  

}
