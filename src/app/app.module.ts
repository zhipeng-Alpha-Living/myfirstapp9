import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';

import { AlertModule } from 'ngx-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';


import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';
import { AuthService } from './services/auth.service';
import { ChatroomService } from './services/chatroom.service';
import { CartService } from './services/cart.service';
import { ProductService } from './services/product.service';
import { PaymentService } from './services/payment.service';

import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from "./signup/signup.component";
import { ChatComponent } from './chat/chat.component';
import { ChatInputComponent } from './chat/components/chat-input/chat-input.component';
import { ChatroomListComponent } from './chat/components/chatroom-list/chatroom-list.component';
import { ChatroomTittleBarComponent } from './chat/components/chatroom-tittle-bar/chatroom-tittle-bar.component';
import { ChatMessageComponent } from './chat/components/chat-message/chat-message.component';
import { ChatroomWindowComponent } from './chat/components/chatroom-window/chatroom-window.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { PaymentComponent } from './payment/payment.component';
import { BackButtonComponent } from './back-button/back-button.component';






@NgModule({
   imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      CommonModule,
      NgxLoadingModule,
      AngularFireModule.initializeApp(environment.firebase, 'webapp'),
      AngularFireStorageModule,
      AngularFirestoreModule,
      AngularFireAuthModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      CollapseModule.forRoot(),
      AlertModule.forRoot(),
      RouterModule.forRoot([
         { path: '', component: ProductListComponent },
       ])
   ],
   declarations: [
      AppComponent,
      TopBarComponent,
      ProductListComponent,
      ProductAlertsComponent,
      ProductDetailsComponent,
      CartComponent,
      ShippingComponent,
      LoginComponent,
      SignupComponent,
      ChatComponent,
      ChatInputComponent,
      ChatroomListComponent,
      ChatroomTittleBarComponent,
      ChatMessageComponent,
      ChatroomWindowComponent,
      ProfileComponent,
      EditProfileComponent,
      BottomBarComponent,
      PaymentComponent,
      BackButtonComponent,
      
   ],
  
   schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      
   ],
   providers: [
      AlertService,
      LoadingService,
      AuthService,
      AuthGuard,
      ChatroomService,
      CartService,
      ProductService,
      PaymentService,
   ],
   bootstrap: [
      AppComponent
   ],
})
export class AppModule { 
  constructor(router: Router) {
    

  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/