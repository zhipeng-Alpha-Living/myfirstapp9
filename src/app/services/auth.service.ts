import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Alert } from './../classes/alert';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs'
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;
  public currentUserSnapshot: User | null;  
  
  constructor(
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
  
  ) { 

    this.currentUser = this.afAuth.authState.pipe(switchMap((user) => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null)
        }
    }));

    this.setCurrentUserSnapshot();
  }
  

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean>{

    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
            const updatedUser = {
              id: user.user.uid,
              email: user.user.email,
              firstName,
              lastName,
              photoUrl:'https://firebasestorage.googleapis.com/v0/b/firstproject-ae61e.appspot.com/o/default_profile_pic.jpg?alt=media&token=14032ebc-0157-4ff1-b5b5-6e3f45a15997',
              quote: 'It is not until you change your identity to match your life blueprint that you will understand why everything in the past never worked.',
              bio:'Bio is under construction...'
            }

            userRef.set(updatedUser);
            return true;
        })
        .catch((err) => false)
    );
  }

  public login(email: string, password: string): Observable<boolean>{
    
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user => true))
      .catch((err) => false)
    );
    
  }

  public logout(): void{
    this.afAuth.auth.signOut().then(() => {
    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert('You have been signed out.'));
    });
  }

  private setCurrentUserSnapshot(): void {
    this.currentUser.subscribe(user => this.currentUserSnapshot = user);
}}

