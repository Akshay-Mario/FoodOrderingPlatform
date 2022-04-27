import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean;
  constructor() {
    this.isAuthenticated = false;
  }

  public isRouteAuthenticated(): boolean {
    console.log('debug : ' , this.isAuthenticated);
    return this.isAuthenticated;
  }

  public setIsAuthenticated(isAuth: boolean): void {
    this.isAuthenticated = isAuth;
    console.log('what!!',this.isAuthenticated)
  }
}