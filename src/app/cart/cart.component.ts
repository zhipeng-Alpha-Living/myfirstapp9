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
export class CartComponent implements OnInit {
  //public items: Cart[] =[];
  private cartSubscription: Subscription[] = [];
  //public totalQuantity: number;

  constructor(
    private cartService: CartService,

  ) {  
    
  }

  ngOnInit() {

    /*this.cartSubscription.push(
      this.cartService.cartItems.subscribe(item =>{
          this.items = item;
          var totalQuantity = 0;
          for(var i =0 ; i < this.items.length; i++){
            totalQuantity = totalQuantity + this.items[i].cartQuantity
          }
          this.takeTotalQuantity(totalQuantity) 
      })
    )  */
    //console.log(this.items)

  }
  
  onSubmit(customerData){


  }

  public addQuantity(cartQuantity: number, productId: string){
    cartQuantity++
    this.cartService.addQuantity(cartQuantity, productId)
  }

  public deductQuantity(cartQuantity: number, productId: string){
    if(cartQuantity > 1){
      cartQuantity--
      this.cartService.addQuantity(cartQuantity, productId)
    } else if(cartQuantity <= 1){
      this.cartService.deleteCartItem(productId)
    }
  }

  /*public takeTotalQuantity(value: number){
    this.totalQuantity = value;
    console.log(this.totalQuantity)
  }*/


  ngOnDestroy() {
    this.cartSubscription.forEach( sub => sub.unsubscribe());
  }
}
