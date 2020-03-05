import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ProductService } from './services/product.service';
import { AuthService } from './services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { switchMap,  } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Cart } from '../interfaces/cart';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  
  public currentUser: User[];
  public cartItems: Observable<any>;

  constructor(

  public authService: AuthService,
  private db: AngularFirestore,

  ) {
    this.authService.currentUser.subscribe(user => this.currentUser = user)
    console.log(this.currentUser)

    this.cartItems = this.authService.currentUser.subscribe.pipe(
      (user=> this.currentUser=user),
     db.collection(`users/${this.currentUser}/cart`).valueChanges()
      )
  
  }
  

  addToCart(product){
    

    this.db.collection(`users/${this.currentUser}/cart`).doc(product.productId).set({
      cartQuantity: 1,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      imageUrl: product.imageUrl,
      productId: product.productId,
      productName: product.productName,
      productPrice: product.price,
    })

  }
  
  getItem(){
  
  }

  clearCart(){
  
  }
  
  getShippingPrices() {
    
  }

  addQuantity(cartQuantity: number, productId: string){
    this.db.collection(`users/${this.currentUser}/cart`).doc(productId).update({cartQuantity: cartQuantity})
  }

  deleteCartItem(productId: string){
    this.db.collection(`users/${this.currentUser}/cart`).doc(productId).delete()
  }

}
