import { Component, OnInit } from '@angular/core';
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
export class BottomBarComponent implements OnInit {
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
      this.cartService.cartItems.subscribe(tempItem => { this.response = tempItem;
        this.response.forEach(element => {
          this.cart.push({
            cartQuantity: element.cartQuantity,
            createdAt: element.createdAt,
            imageUrl: element.imageUrl,
            productId: element.productId,
            productName: element.productName,
            productPrice: element.productPrice,
          })
        })
      })
    )  

    //console.log(this.cart)

  }


  ngOnInit(){
 

  }

  

}

