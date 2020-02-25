import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shippings } from './shippings';


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
    this.shippingPrices = shippings;
    return this.shippingPrices
  }

constructor(
  private http: HttpClient
) { }

}
