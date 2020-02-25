import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shipping } from './shipping';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];
  shippingPrices = [];
  
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
    this.shippingPrices = shipping;
    return this.shippingPrices
  }

constructor(
  private http: HttpClient
) { }

}
