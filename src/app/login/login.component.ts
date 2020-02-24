import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Alert } from '../classes/alert';
import { AlertType } from '../enums/alert-type.enum';
import { AlertService } from '../services/alert.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  

  public loginForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl: string;
  

  constructor( 
    private fb: FormBuilder, 
    private alertService: AlertService,
    private loadingService: LoadingService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    ){
    this.createForm();
     }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.subscriptions.push(
      this.auth.currentUser.subscribe(user => {
        if(!!user) {
          this.router.navigateByUrl('/');
        }
      })
    )
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  public submit(): void {

    if(this.loginForm.valid){
    
      const {email, password} = this.loginForm.value;
      this.subscriptions.push(
        this.auth.login(email, password).subscribe(success => {
          if(success){
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.displayFailedLogin();
          }
        })
      );

    } else {
      
      this.displayFailedLogin();
    }
     
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private displayFailedLogin(): void {
    const failedLoginAlert = new Alert('Your email or password were invalid, try again.', AlertType.Danger);
    this.alertService.alerts.next(failedLoginAlert);
  }
}
