import { Component, OnInit } from '@angular/core';
import { ChatroomService } from '../../../services/chatroom.service';

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss']
})
export class ChatroomListComponent implements OnInit {

  constructor(
    public chatroomService: ChatroomService
  ) { }

  ngOnInit(): void {
  }

}

//This no need to touch first, onlt admin need to use this to choose hich user he want to reply
