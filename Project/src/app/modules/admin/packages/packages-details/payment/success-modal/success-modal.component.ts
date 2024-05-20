import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
})
export class SuccessModalComponent  implements OnInit {

    constructor(private modalController: ModalController,private router: Router) {}

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
    this.router.navigate(['/bookings']); // Navigate to the bookings page

  }

}
