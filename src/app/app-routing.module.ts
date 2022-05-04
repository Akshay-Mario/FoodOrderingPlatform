import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { CartComponent } from './home/cart/cart.component';
import { HomeComponent } from './home/home.component';
import { AddressComponent } from './home/profile/address/address.component';
import { PaymentComponent } from './home/profile/payment/payment.component';
import { ProfileComponent } from './home/profile/profile.component';
import { UserComponent } from './home/profile/user/user.component';
import { TrackingComponent } from './home/tracking/tracking.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:"", redirectTo: "register", pathMatch: "full" },
  {path: 'home', component: HomeComponent,canActivate: [AuthGuard], children:[
    {path: "cart", component: CartComponent},
    {path: "track", component: TrackingComponent},
    {path: "profile", component: ProfileComponent, children:[
      {path: "user", component: UserComponent},
      {path: "address", component: AddressComponent},
      {path: "payment", component: PaymentComponent}
    ]}
  ]},
  // {path: 'home', component: HomeComponent, children:[
  //   {path: "cart", component: CartComponent},
  //   {path: "track", component: TrackingComponent},
  //   {path: "profile", component: ProfileComponent}
  // ]},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgotpassword', component: ForgotpasswordComponent},
  {path: '**',redirectTo: '/register',pathMatch: "full"}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }
