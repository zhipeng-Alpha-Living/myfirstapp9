import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit, OnDestroy {

  public currentUser: any = null;
  private topSubscription: Subscription[] = [];
  private cartService: CartService;
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
  
  ngOnDestroy(){
    this.topSubscription.forEach( sub => sub.unsubscribe());
  
  }


}



/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/