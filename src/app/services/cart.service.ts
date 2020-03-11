import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { switchMap,  } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Cart } from '../interfaces/cart';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private CurrentUser: User = null;
  private subscriptions: Subscription[] = [];
  public cartItems: Observable<any>;
  public selectedCart: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public allcart: Observable<any>;

  constructor(
  
  public authService: AuthService,
  private db: AngularFirestore,

  ) {

    this.subscriptions.push(this.authService.currentUser.subscribe(user => this.CurrentUser = user) )

    this.cartItems = this.selectedCart.pipe(switchMap(userId=> {
      if (userId){
          return db.collection(`users/${userId}/cart`).valueChanges()
      }
      return of(null);
    }))
     
    this.allcart = this.selectedCart.pipe(switchMap(userId => {
      if(userId){
        return db.collection(`users/${userId}/cart`).get().toPromise().then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
            
          })
        })
      }
      return of(null);
    }))

  }
  

  addToCart(product){
    
    this.db.collection(`users/${this.CurrentUser.id}/cart`).doc(product.productId).set({
      cartQuantity: 1,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      imageUrl: product.imageUrl,
      productId: product.productId,
      productName: product.productName,
      productPrice: product.price,
    })

  }
  
  clearCart(){
  
  }

  public updateQuantity(cartQuantity: number, productId: string){
    this.db.collection(`users/${this.CurrentUser.id}/cart`).doc(productId).update({cartQuantity: cartQuantity})
  }

  public deleteCartItem(cartQuantity: number, productId: string){
    this.db.collection(`users/${this.CurrentUser.id}/cart`).doc(productId).update({cartQuantity: cartQuantity})
    this.db.collection(`users/${this.CurrentUser.id}/cart`).doc(productId).delete()
  }

}
