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
    return this.isAuthenticated;
  }

  public setIsAuthenticated(isAuth: boolean): void {
    this.isAuthenticated = isAuth;
    localStorage.setItem("isLoggedIn", "true");
  }
}