import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Alert } from '../classes/alert';
import { AlertType } from '../enums/alert-type.enum';
import { AlertService } from '../services/alert.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  

  public signupForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor( 
     private fb: FormBuilder,
     private alertService: AlertService,
     private auth: AuthService,
     private loadingService: LoadingService,
     private router: Router
     ){
    this.createForm();
     }

  ngOnInit() {
  }

  private createForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      photoUrl:'',
      quote: 'It is not until you change your identity to match your life blueprint that you will understand why everything in the past never worked.',
      bio:'Bio is under construction...'
    })
  }

  public submit(): void {

    if(this.signupForm.valid){
      const {firstName, lastName, email, password} = this.signupForm.value;

      this.subscriptions.push(
          this.auth.signup(firstName, lastName, email, password).subscribe(success =>{
            if (success){
                this.router.navigate(['/']);   
            } else{
              const failedSigninAlert = new Alert('There was a problem signing up, try again.', AlertType.Danger);
              this.alertService.alerts.next(failedSigninAlert);
            }
        }));
    } else {
      const failedSignedAlert = new Alert('Please enter a valid name, email and password, try again.', AlertType.Danger);
      this.alertService.alerts.next(failedSignedAlert);
    }
 
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
