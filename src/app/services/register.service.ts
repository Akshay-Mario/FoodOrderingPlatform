import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IUserData } from '../models/userdata.model';
import { environment } from '../../environments/environment';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  // public postUserRegistration(userdetails: IUserData): Observable<boolean>{
  //   console.log('how')
  //   var url=environment.baseURL+'/users'
  //   this.http.post('http://localhost:3000/users',userdetails).pipe(delay(1500));
  //   return of(true);
  // }

  public postUserRegistration(formData:IUserData):Observable<IUserData>{
    return this.http.post<IUserData>('http://localhost:3000/users',formData).pipe(delay(1500));
  }

  public getUserDetails(): Observable<IUserData[]>{
   return this.http.get<IUserData[]>('http://localhost:3000/users').pipe(delay(1500));
  }

}
