import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from "./signup/signup.component";
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo: '/login'},
  { path:'login', component: LoginComponent},
  { path:'signup', component: SignupComponent},
  { path:'chat', canActivate: [AuthGuard]},
  { path:'**', redirectTo:'/login'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }