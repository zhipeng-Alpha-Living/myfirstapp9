import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { Alert } from './classes/alert';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';
import { CartService } from './services/cart.service';
import { Cart } from './interfaces/cart';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {
 
  private subscriptions: Subscription[] = [];
  public alerts: Array<Alert> = [];
  public loading: boolean = false;
  public items: Array<Cart> = [];
  public totalQuantity: number;
  public currentUser: User = null; 

  
  constructor(
    private alertService: AlertService,
    private loadingService: LoadingService,
    private cartService: CartService,
    public auth: AuthService,

  ){
    this.subscriptions.push(
      this.auth.currentUser.subscribe( user => {
        this.currentUser = user,
        cartService.selectedCart.next(user.id);
      })
    )
    var me = this;

    this.subscriptions.push(
      me.cartService.cartItems.subscribe( item =>{
          Object.assign(this.items, item)
          console.log(this.items)
          var totalQuantity = 0;
          for(var i = 0 ; i <this.items.length; i++){
            totalQuantity = totalQuantity + this.items[i].cartQuantity
          }
          this.takeTotalQuantity(totalQuantity) 
          
      })
    )
  }

  ngOnInit() {
    this.subscriptions.push(
    this.alertService.alerts.subscribe(alert => {
      this.alerts.push(alert);
    })
    )

    this.subscriptions.push(
      this.loadingService.isLoading.subscribe(isLoading => {
        this.loading = isLoading;
      })
    )

  
  }

  public takeTotalQuantity(value: number){
    this.totalQuantity = value;
    console.log(this.totalQuantity)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}

