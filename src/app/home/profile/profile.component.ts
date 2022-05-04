import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserData } from 'src/app/models/userdata.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit  {

  public userdata: IUserData;

  constructor(private router: Router) {
    this.userdata = JSON.parse(sessionStorage.getItem('loggedindata'));
  }

  public ngOnInit(): void {
    this.userdata = JSON.parse(sessionStorage.getItem('loggedindata'));
    console.log('what!!')
  }

  public navigatetohome(){
     window.location.reload();
  }

}
