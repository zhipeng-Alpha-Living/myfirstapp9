import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from './services/alert.service';
import { Alert } from './classes/alert';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {
 
  title: any;
  private subscriptions: Subscription[] = [];
  public alerts: Array<Alert> = [];
  public loading: boolean = false;

  constructor(
    private alertService: AlertService,
    private loadingService: LoadingService,

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


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/