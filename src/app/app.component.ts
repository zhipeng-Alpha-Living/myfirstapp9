import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from './services/alert.service';
import { Alert } from './classes/alert';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';
import { CartService } from './services/cart.service';
import { Cart } from './interfaces/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {
 
  private subscriptions: Subscription[] = [];
  public alerts: Array<Alert> = [];
  public loading: boolean = false;


  constructor(
    private alertService: AlertService,
    private loadingService: LoadingService,
    private cartService: CartService,

    ){
    
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

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}

