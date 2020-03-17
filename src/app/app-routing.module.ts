import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from "./signup/signup.component";
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PaymentComponent } from './payment/payment.component';
import { BackButtonComponent } from './back-button/back-button.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products/:productId', component: ProductDetailsComponent},
  { path: 'cart', component: CartComponent,canActivate:[AuthGuard]},
  { path: 'shipping', component: ShippingComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path:'chat', canActivate: [AuthGuard],
      children : [
        {path: '', component: ChatComponent},
        {path: ':chatroomId', component: ChatComponent},
      ]
  },
  { path: 'profile/:userId', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'profile/:userId/edit', component: EditProfileComponent, canActivate: [AuthGuard]},
  { path: 'payment', component: PaymentComponent},
  { path: 'back-button', component: BackButtonComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }