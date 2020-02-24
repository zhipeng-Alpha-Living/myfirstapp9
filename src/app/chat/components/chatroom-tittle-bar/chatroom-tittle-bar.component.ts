import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-chatroom-tittle-bar',
  templateUrl: './chatroom-tittle-bar.component.html',
  styleUrls: ['./chatroom-tittle-bar.component.scss']
})
export class ChatroomTittleBarComponent implements OnInit {

  @Input() tittle : string;
  

  constructor() { }

  ngOnInit(): void {
  }


}
