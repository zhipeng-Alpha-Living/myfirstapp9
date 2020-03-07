import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../interfaces/user';
import { Cart } from '../imterfaces/cart';


@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {
  public currentUser: User = null;
  public cart: Cart[] ;

  constructor(
    public auth: AuthService,
    public cartService: CartService,

  ) {
    this.auth.currentUser.subscribe( user => {
      this.currentUser = user,
      cartService.selectedCart.next(user.id);
    })
    
    
    this.cartService.cartItems.subscribe(cartItems => { 
     this.cart = cartItems
    })

    

  }


  ngOnInit(){
 

  }

  

}

