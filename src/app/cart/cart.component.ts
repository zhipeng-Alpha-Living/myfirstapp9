import { Component, OnInit, OnDestroy } from '@angular/core';
//import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { Cart } from '../interfaces/cart';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public items: Cart[] =[];
  private cartSubscription: Subscription[] = [];
  public allItems: Array<Cart> = [];
  public totalQuantity: number = 0;
  public totalPrice: number = 0;

  constructor(
    private cartService: CartService,

  ){  
    
  }

  ngOnInit() {

    this.cartSubscription.push(
      this.cartService.cartItems.subscribe(item =>{
          this.items = item;
          this.allItems = Object.assign([], item)
          var tQuantity = 0;
          var tPrice = 0;
          var tItemPrice =0;
          for(var i = 0 ; i <this.allItems.length; i++){
            tQuantity = tQuantity + this.allItems[i].cartQuantity;
            tItemPrice = this.allItems[i].cartQuantity * this.allItems[i].productPrice;
            tPrice = tPrice + tItemPrice;
          }
          this.takeTotalQuantityAndPrice(tQuantity, tPrice)
      })
    )  

    
  }
  
  onSubmit(){

  }

  public addQuantity(cartQuantity: number, productId: string){
    cartQuantity++
    this.cartService.updateQuantity(cartQuantity, productId)
  }

  public deductQuantity(cartQuantity: number, productId: string){
    if(cartQuantity > 1){
      --cartQuantity
      this.cartService.updateQuantity(cartQuantity, productId);
    } else if(cartQuantity <= 1){
      --cartQuantity
      //this.cartService.updateQuantity(cartQuantity, productId);
      this.cartService.deleteCartItem(productId);
    }
  }

  public removeCartItem(productId: string){
    this.cartService.deleteCartItem(productId);
  }

  public takeTotalQuantityAndPrice(totalQuantity: number, totalPrice: number){
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  ngOnDestroy() {
    this.cartSubscription.forEach( sub => sub.unsubscribe());
  }
}
