import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
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
  public allItems: Array<Cart> = [];
  public totalQuantity: Observable<number>;
  public totalPrice: Observable<number>;
  public tItemPrice: Observable<number>;

  constructor(
  
  public authService: AuthService,
  private db: AngularFirestore,

  ) {

    this.subscriptions.push(this.authService.currentUser.subscribe(user => this.CurrentUser = user) )

    this.cartItems = this.selectedCart.pipe(switchMap(userId=> {
      if (userId){
          return db.collection(`users/${userId}/cart`).valueChanges()
      }
      return this.selectedCart.asObservable()
    }));
    
  /*  this.subscriptions.push(
      this.cartItems.subscribe(item => {
        this.allItems = Object.assign([], item)
        var tQuantity = 0;
        var tPrice = 0;
        var tItemPrice =0;
        for(var i = 0 ; i <this.allItems.length; i++){
          this.totalQuantity = this.totalQuantity + this.allItems[i].cartQuantity;
          this.tItemPrice = this.allItems[i].cartQuantity * this.allItems[i].productPrice;
          this.totalPrice = this.totalPrice + this.tItemPrice;
        }
                                            
      })
    )
  */
  
  }  
  

  addToCart(product):void{
    
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

  public updateQuantity(cartQuantity: number, productId: string):void{
    this.db.collection(`users/${this.CurrentUser.id}/cart`).doc(productId).update({cartQuantity: cartQuantity})
  }

  public deleteCartItem(productId: string):void{
    this.db.collection(`users/${this.CurrentUser.id}/cart`).doc(productId).delete()
  }

  setTotalQuantity(totalQuantity: Observable<number>){
   
  }

  setTotalPrice(totalPrice: number){

  }


}
