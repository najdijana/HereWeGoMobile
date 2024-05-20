import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Packages } from 'src/app/shared/models/packages.interface';
import { Payments } from 'src/app/shared/models/payments.interface';
import { User } from 'src/app/shared/models/user.interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-packages-details',
  templateUrl: './packages-details.page.html',
  styleUrls: ['./packages-details.page.scss'],
})
export class PackagesDetailsPage implements OnInit {
  package: Packages;
  isPlanOpen: boolean[];
  user: User;
  payment: Payments | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertController: AlertController // Import AlertController
  ) {}

  ngOnInit(): void {
    this.package = this.route.snapshot.data.package as Packages;
    this.user = this.route.snapshot.data.user as User;
    this.isPlanOpen = new Array(this.package.plan.length).fill(false);
    console.log('test --> package = ', this.package);

    this.userService
      .collection()
      .doc(this.user?.uid)
      .collection('payments', ref => 
        ref.where('package.id', '==', this.package.id)
           .where('paymentStatus', '==', 'ACTIVE')
           .limit(1)
      )
      .snapshotChanges()
      .subscribe(actions => {
        if (actions.length > 0) {
          const data = actions[0].payload.doc.data() as Payments;
          const id = actions[0].payload.doc.id;
          this.payment = { id, ...data };
          console.log('Payment: ', this.payment);
        } else {
          this.payment = null;
          console.log('No active payment found');
        }
      });
  }

  togglePlan(index: number) {
    this.isPlanOpen[index] = !this.isPlanOpen[index];
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Already Booked',
      subHeader: 'You have already booked this package.',
      message: 'Check your bookings for more details.',
      buttons: [
        {
          text: 'Check Bookings',
          handler: () => {
            this.router.navigate(['/bookings']);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  handleBookNow() {
    if (this.payment) {
      this.showAlert();
    } else {
      this.router.navigate(['/packages/' + this.package.id + '/details/payment']);
    }
  }
}
