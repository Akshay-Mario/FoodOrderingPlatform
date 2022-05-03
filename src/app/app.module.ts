import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MustMatchDirective } from './shared/must-match.directive';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './home/cart/cart.component';
import { TrackingComponent } from './home/tracking/tracking.component';
import { ProfileComponent } from './home/profile/profile.component';
import { AddressComponent } from './home/profile/address/address.component';
import { PaymentComponent } from './home/profile/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MustMatchDirective,
    LoginComponent,
    ForgotpasswordComponent,
    HomeComponent,
    CartComponent,
    TrackingComponent,
    ProfileComponent,
    AddressComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
