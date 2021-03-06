import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ChatroomService } from '../../../services/chatroom.service';
import { AngularFirestore} from 'angularfire2/firestore';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('scrollContainer', { static: false }) private scrollContainer: ElementRef;

  public subscriptions: Subscription[] = [];
  public chatroom: any;
  public messages: any;
  public user: any;


  constructor(
    private route: ActivatedRoute,
    public chatroomService: ChatroomService,
    public db: AngularFirestore,
    public authService: AuthService,
  
    //private loadingService: LoadingService,
  ) {
    this.subscriptions.push(
      this.chatroomService.selectedChatroom.subscribe(chatroom => {
        this.chatroom = chatroom;
        //this.LoadingService.isLoading.next(false);
      })
    );

    this.subscriptions.push(
      this.chatroomService.selectedChatroomMessages.subscribe(messages => {
        this.messages = messages;
        //this.loadingService.isLoading.next(false); 
      })
    );

    this.subscriptions.push(
      this.authService.currentUser.subscribe( user => {
        this.user = user;
        this.chatroomService.changeChatroom.next("mQluTbumTqUKznBUoiJCY4q9NXs2");
      }) 
    );
    
    
  }

  ngOnInit() {
    this.scrollToBotom();
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
          //this.chatroomService.changeChatroom.next(this.user.id);
      })
    );
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  ngAfterViewChecked(){
    this.scrollToBotom();
  }

  private scrollToBotom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =         this.scrollContainer.nativeElement.scrollHeight;

    }catch(err){}
  }
  
}