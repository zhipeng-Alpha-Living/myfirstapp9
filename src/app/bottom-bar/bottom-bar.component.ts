import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {
  public currentUser: any = null;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
     this.auth.currentUser.subscribe( user => {
      this.currentUser = user;
    })
  }

}