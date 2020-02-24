import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage} from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { User } from '../interfaces/user';
import { AlertService } from '../services/alert.service';
import { Alert } from '../classes/alert';
import { AlertType } from '../enums/alert-type.enum';
import {Location} from '@angular/common';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  public currentUser: any = null;
  public userId: string = '';
  private subsubscriptions: Subscription[] = [];
  public  uploadPercent: number = 0;
  public downloadUrl: Observable<string> | null = null;

  
  



  constructor(
    private auth: AuthService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private fs: AngularFireStorage,
    private db: AngularFirestore,
    private location: Location,
    private alertService: AlertService,
    
  ) { 
    this.loadingService.isLoading.next(true);

  }

  ngOnInit() {
    this.subsubscriptions.push(
      this.auth.currentUser.subscribe(user => {
        this.currentUser = user;
        this.loadingService.isLoading.next(false);
      })
    );

    this.subsubscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.userId = params.get('userId');
      })
    )

  }

  public async uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `${file.name}_${this.currentUser.id}`;
    const uploadTask = this.fs.upload(filePath, file);
    const ref = this.fs.ref(filePath);
    
    
    this.subsubscriptions.push(
      uploadTask.percentageChanges().subscribe(percentage => {
        if (percentage < 100) {
          this.loadingService.isLoading.next(true);
        } else {
          this.loadingService.isLoading.next(false);
        }
        this.uploadPercent = percentage
      })
    )
    await uploadTask.snapshotChanges().toPromise();
    this.downloadUrl = await ref.getDownloadURL().toPromise();
    
  }
      
  public save(): void{
    
    let photo;
 
    if(this.downloadUrl){
      photo = this.downloadUrl;

    }else{
      photo = this.currentUser.photoUrl;
    }

    const user = Object.assign({}, this.currentUser, {photoUrl: photo});
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.id}`);
    userRef.set(user);
    this.alertService.alerts.next(new Alert('Your profile was successfully updated', AlertType.Success));
    this.location.back();

  }

  ngOnDestroy(){
    this.subsubscriptions.forEach(sub => sub.unsubscribe());
  }

}
