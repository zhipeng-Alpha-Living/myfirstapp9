import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { ProductService } from './services/product.service';
//import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];

  

  addToCart(product){

    
    this.items.push(product);
    
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

    constructor(
    private http: HttpClient,
    //private authService: AuthService
    ) { }


}
