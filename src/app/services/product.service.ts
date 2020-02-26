import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Injectable()
export class ProductService {
  public products: Observable<any>;

  constructor(
    private db: AngularFirestore,
  ) {
    this.products = db.collection('products').valueChanges()
  }

}