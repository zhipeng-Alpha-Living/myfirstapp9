import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../interfaces/user';
import { Cart } from '../interfaces/cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit, OnDestroy {
  public currentUser: User = null;
  public cart: Cart[] = [];
  private response: Cart[] = [];  
  private bottomSubscription: Subscription[] = [];

  constructor(
    public auth: AuthService,
    public cartService: CartService,

  ) {
    this.auth.currentUser.subscribe( user => {
      this.currentUser = user,
      cartService.selectedCart.next(user.id);
    })
    

  }


  ngOnInit(){
    this.bottomSubscription.push(
      this.cartService.cartItems.subscribe(cartItems => {
       //this.cart = cartItems
        Object.assign(this.response,cartItems)
          console.log(this.response[0])
      })
    )

    console.log(this.response[0]);

    
  }

  ngOnDestroy() {
    this.bottomSubscription.forEach( sub => sub.unsubscribe());
  }

}

