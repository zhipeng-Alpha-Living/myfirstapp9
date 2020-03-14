import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Cart } from '../interfaces/cart';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private CurrentUser: User = null;
  public cartItems: Observable<any>;
  public selectedCart: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public allItems: Array<Cart> = [];
  private userId: string;
  public initCart:Observable<any>;

  constructor(
  
  public authService: AuthService,
  private db: AngularFirestore,

  ) {

    this.authService.currentUser.subscribe(user => {this.CurrentUser = user;
      this.setUserId(this.CurrentUser.id)
    }) 

    //this.cartItems = this.db.collection(`users/${this.userId}/cart`).valueChanges()
    this.cartItems = this.selectedCart.pipe(switchMap(userId=> {
      if (userId){
        return db.collection(`users/${userId}/cart`).valueChanges()
        console.log(userId)
      } else
        return of(null)
    })); 
 
  
  } 
  

  addToCart(product):void{
    
    this.db.collection(`users/${this.CurrentUser.id}/cart`).doc(product.productId).set({
      cartQuantity: 1,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      hidden: false,
      imageUrl: product.imageUrl,
      productId: product.productId,
      productName: product.productName,
      productPrice: product.price,
    })

  }

  clearCart(){
  
  }

  setUserId(userId: string): void{
    this.userId = userId
  }

  public updateQuantity(cartQuantity: number, productId: string):void{
    this.db.collection(`users/${this.CurrentUser.id}/cart`).doc(productId).update({cartQuantity: cartQuantity})
  }

  public updateHiddenFlag(hidden: boolean, productId: string):void{
    this.db.collection(`users/${this.CurrentUser.id}/cart`).doc(productId).update({hidden: hidden});
  }

  public deleteCartItem(productId: string):void{
    this.db.collection(`users/${this.CurrentUser.id}/cart`).doc(productId).delete()
  }

}
