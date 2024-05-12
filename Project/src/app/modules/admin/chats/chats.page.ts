import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { ChatService } from './services/chat.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  @ViewChild('new_chat') modal: ModalController;
  @ViewChild('popover') popover: PopoverController;

  open_new_chat = false;
  users: User[];
    uid : string;

  /*
  users = [
    { id: 1, name: 'jana', photo: '../../../../assets/img/profile.jpg' },
    { id: 2, name: 'test', photo: '../../../../assets/img/profile.jpg' }
  ]
  */

  chatRooms = [
    { id: 1, name: 'jana', photo: '../../../../assets/img/profile.jpg' },
    { id: 2, name: 'test', photo: '../../../../assets/img/profile.jpg' }
  ]
  constructor(private router: Router, private chatService: ChatService, private userService: UserService) { }

  ngOnInit() {
    this.uid=this.userService.authService.authUser.uid;
  }


  getUsers() {
    this.userService.collection((ref) =>
      ref.where('uid', '!=', this.uid)
    ).valueChanges().subscribe(users => {
      this.users = users;
    });

  }

  /*  getUsers(){
this.chatService.getUsers();
this.users= this.chatService.users;
  }*/

  newChat() {
    this.open_new_chat = true;
    if(!this.users)
      this.getUsers();
  }

  onWillDismiss(event: any) { }

  cancel() {
    this.modal.dismiss();
    this.open_new_chat = false;
  }
  startChat(item) { }

  getChat(item) {
    this.router.navigate(['/', 'chats', 'chat-conv', item?.id]);
  }
}
