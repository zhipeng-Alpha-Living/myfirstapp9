import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../interfaces/user';
//import { Cart } from '../interfaces/cart';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit, OnDestroy {
  public currentUser: User = null; 
  private bottomSubscription: Subscription[] = [];
  
  @Input() totalQuantity: number;
  constructor(
    public auth: AuthService,
    public cartService: CartService,
  ) {
    this.bottomSubscription.push(
      this.auth.currentUser.subscribe( user => {
        this.currentUser = user,
        cartService.selectedCart.next(user.id);
      })
    )
    

  }


  ngOnInit(){

  } 


    
  ngOnDestroy() {
    this.bottomSubscription.forEach( sub => sub.unsubscribe());
  } 

}

