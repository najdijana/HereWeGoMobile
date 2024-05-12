import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-conv',
  templateUrl: './chat-conv.page.html',
  styleUrls: ['./chat-conv.page.scss'],
})
export class ChatConvPage implements OnInit {

name: string = 'Sender';
message: string;
isLoading = false;
currentUserId =1;
chats =[
{id:1, sender:1, message:'hi' },
{id:2, sender:2, message:'hi 2' }
]
  constructor() { }

  ngOnInit() {
  }
sendMessage(){

}
}
