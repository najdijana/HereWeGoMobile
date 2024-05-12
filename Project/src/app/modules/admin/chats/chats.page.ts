import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  @ViewChild('new_chat') modal: ModalController;
  @ViewChild('popover') popover: PopoverController;

  open_new_chat = false;
  users = [
    { id: 1, name: 'jana', photo: '../../../../assets/img/profile.jpg' },
    { id: 2, name: 'test', photo: '../../../../assets/img/profile.jpg' }
  ]

  chatRooms = [
    { id: 1, name: 'jana', photo: '../../../../assets/img/profile.jpg' },
    { id: 2, name: 'test', photo: '../../../../assets/img/profile.jpg' }
  ]
  constructor(private router: Router) { }

  ngOnInit() {
  }

  newChat() {
    this.open_new_chat = true;
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
