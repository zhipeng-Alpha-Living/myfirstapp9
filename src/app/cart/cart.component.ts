import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CartService } from '../cart.service';
import { Cart } from '../interfaces/cart';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public currentUser: any = null;
  public items:any;
  


  constructor(
    private cartService: CartService, 
    private formBuilder: FormBuilder,
    public auth: AuthService,
    private db: AngularFirestore,
  ) {  
 
    this.cartService.cartItems.subscribe(items =>{
      this.items = items;
    })

  }

  ngOnInit() {
    this.auth.currentUser.subscribe( user => {
      this.currentUser = user;
    })
    //this.items=this.cartService.getItem();
  }
  
  onSubmit(customerData){
    //process check out data
    this.items = this.cartService.clearCart();

    console.warn('Your order has been submitted', customerData);
  }

  public addQuantity(cartQuantity: number, productId: string){
    cartQuantity = cartQuantity + 1;
    this.cartService.addQuantity(cartQuantity, productId)
  }

  public deductQuantity(cartQuantity: number, productId: string){
    if(cartQuantity > 1){
      cartQuantity = cartQuantity - 1;
      this.cartService.addQuantity(cartQuantity, productId)
    }
  }
}
