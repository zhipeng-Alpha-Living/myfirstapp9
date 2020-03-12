import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  public currentUser: any = null;
  isCollapsed = true;
  
  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.currentUser.subscribe( user => {
      this.currentUser = user
    })
  }

   toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }  

}



/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/