import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CartService } from '../cart.service';
import { Cart } from '../interfaces/cart';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public items: Observable<any>;
  public cartSubscription: Subscription[] = [];

  constructor(
    private cartService: CartService, 
    private formBuilder: FormBuilder,
    private db: AngularFirestore,
  ) {  
 
    this.cartService.cartItems.subscribe(items =>{
      this.items = items;
    })

  }

  ngOnInit() {
 
  
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

  ngOnDestroy() {
    this.cartSubscription.forEach( sub => sub.unsubscribe());
    }
}
