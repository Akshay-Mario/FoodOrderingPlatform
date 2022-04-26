import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:"", redirectTo: "register", pathMatch: "full" },
  {path: 'register', component: RegistrationComponent},
  {path: '**',redirectTo: '/register',pathMatch: "full"}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }
