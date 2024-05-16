import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent  implements OnInit {

  constructor(private modalController: ModalController) {}
  isLoading: boolean;
  message: string;
  dismiss() {
    this.modalController.dismiss();
  }

  sendMessage(){

  }
  ngOnInit() {}

}
