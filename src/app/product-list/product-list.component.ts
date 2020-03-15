import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import{ Cart } from '../interfaces/cart';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
    private productListSubscription: Subscription[] = [];
    public items: Array<Cart> = [];
    public totalQuantity: number = 0;
    public currentUser: User = null; 

    constructor(
      public productService: ProductService,
      public cartService: CartService,
      public auth: AuthService,
    ) { }

  share() {
    window.alert('The product has been shared!');
  }

  onNotify(){
    window.alert('You will be notified when the product goes on sale');
  }

  ngOnInit(): void {
    this.productListSubscription.push(
      this.auth.currentUser.subscribe( user => {
        this.currentUser = user,
        this.cartService.selectedCart.next(user.id);
      })
    ) 

    this.productListSubscription.push(
       this.cartService.cartItems.subscribe( item =>{
        //this.items = [];
        this.items = Object.assign([], item)//importance!!! Dont use => Object.assign(this.items, item)
        var tQuantity = 0;
        for(var i = 0 ; i <this.items.length; i++){
          tQuantity = tQuantity + this.items[i].cartQuantity
        }
        console.log(tQuantity)
        this.takeTotalQuantity(tQuantity) 
        this.cartService.setTotalQuantity(tQuantity)
      })
    )
  }

  public takeTotalQuantity(value: number){
    this.totalQuantity = value;
  } 


  ngOnDestroy(){
    this.productListSubscription.forEach( sub => sub.unsubscribe());
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/