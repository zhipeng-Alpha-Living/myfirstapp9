import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap,  } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable()
export class ProductService {
  public products: Observable<any>;
  public selectProduct: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public selectedProduct: Observable<any>;

  constructor(
    private db: AngularFirestore,
  ) {

    this.selectedProduct = this.selectProduct.pipe(switchMap(productId => {
      if(productId){

        return db.doc(`products/${productId}`).valueChanges();
      }
      return of(null);
    }));

    this.products = db.collection('products').valueChanges()
  }

  public getCartProductInfo(){
    
  }
  
}