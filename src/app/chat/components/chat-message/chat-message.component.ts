import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../classes/message';
import { User } from '../../../interfaces/user';


@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: Message; 
  @Input() user: User;

   constructor() { 
     
   }

  ngOnInit(){
  }    

}
