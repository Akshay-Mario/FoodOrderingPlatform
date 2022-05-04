import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IUserData } from '../models/userdata.model';
import { environment } from '../../environments/environment';
import { delay } from 'rxjs/operators';
import { ILoginData } from '../models/loginData.model';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public postUserRegistration(formData: IUserData): Observable<IUserData> {
    return this.http.post<IUserData>(environment.postusersurl, formData).pipe(delay(1500));
  }

  public getUserDetails(formData: ILoginData): Observable<ILoginData> {
    return this.http.get<ILoginData>("http://localhost:3000/users?email=" + formData.email).pipe(delay(1500));
  }

  public resetpassword(formData: IUserData): Observable<IUserData> {
    return this.http.put<IUserData>("http://localhost:3000/users/" + formData.id, formData).pipe(delay(1500));
  }

  public userdatasave(formData: IUserData): Observable<IUserData> {
    return this.http.put<IUserData>("http://localhost:3000/users/" + formData.id, formData).pipe(delay(1500));
  }
  
  public getUserDetailswithid(formData: number): Observable<IUserData> {
    return this.http.get<IUserData>("http://localhost:3000/users?id=" + formData).pipe(delay(100));
  }

}
