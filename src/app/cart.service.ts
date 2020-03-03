import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ProductService } from './services/product.service';
import { AuthService } from './services/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap,  } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];
  //public currentCartItem: Observable<any>;
  private userId = this.authService.currentUserSnapshot.id;
  public cartItems: Observable<any>;

  constructor(
  private http: HttpClient,
  private authService: AuthService,
  private db: AngularFirestore,

  ) {
    this.cartItems = db.collection(`users/${this.userId}/cart`).valueChanges()
    
  }
  

  addToCart(product){
    const cartItemId = product.productId;

    console.log(this.cartItems)

    this.db.collection(`users/${this.userId}/cart`).doc(cartItemId).set({
      cartQuantity: 1,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      productId: cartItemId,
    })

  }
  
  getItem(){
    return this.items;
  }

  clearCart(){
    this.items = [];
    return this.items;
  }
  
  getShippingPrices() {
    return this.http.get('')
  }

  addQuantity(cartQuantity: number, productId: string){
    this.db.collection(`users/${this.userId}/cart`).doc(productId).update({cartQuantity: cartQuantity})
  }


}
