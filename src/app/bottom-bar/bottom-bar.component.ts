import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs';
import{ Cart } from '../interfaces/cart';


@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit, OnDestroy {
  public currentUser: User = null; 
  private bottomSubscription: Subscription[] = [];
  public items: Array<Cart> = [];
  //public totalQuantity: number = 10;


  @Input() totalQuantity: number ;
  constructor(
    public auth: AuthService,
    public cartService: CartService,
    
  ) {
    this.bottomSubscription.push(
      this.auth.currentUser.subscribe( user => {
        this.currentUser = user,
        this.cartService.selectedCart.next(user.id);
      })
    ) 

    this.bottomSubscription.push(
      this.cartService.cartItems.subscribe( item =>{
      //this.items = [];
      this.items = Object.assign([], item)//importance!!! Dont use => Object.assign(this.items, item)
      var tQuantity = 0;
      for(var i = 0 ; i <this.items.length; i++){
        tQuantity = tQuantity + this.items[i].cartQuantity
      }
      
      this.takeTotalQuantity(tQuantity) 
      })
    ) 
    

  }

  ngOnInit(){

    

  } 

  
  public takeTotalQuantity(value: number){
    this.totalQuantity = value;
  } 


  ngOnDestroy() {
    this.bottomSubscription.forEach( sub => sub.unsubscribe());
  } 

}

