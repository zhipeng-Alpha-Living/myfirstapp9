import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../interfaces/user';
import { Cart } from '../imterfaces/cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit, OnDestroy {
  public currentUser: User = null;
  public cart: Cart[] = [];
  private response: any;  
  private bottomSubscription: Subscription[] = [];

  constructor(
    public auth: AuthService,
    public cartService: CartService,

  ) {
    this.auth.currentUser.subscribe( user => {
      this.currentUser = user,
      cartService.selectedCart.next(user.id);
    })
    
    this.bottomSubscription.push(
        this.cartService.cartItems.subscribe(cartItems =>{this.response =cartItems;
          console.log(this.response)
        })
      
    )

  }


  ngOnInit(){
  
  }
  ngOnDestroy() {
    this.bottomSubscription.forEach( sub => sub.unsubscribe());
  }

}

