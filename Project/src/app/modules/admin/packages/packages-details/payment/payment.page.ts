import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Packages } from 'src/app/shared/models/packages.interface';
import { environment } from 'src/environments/environment';
import { PaymentsService } from './service/payments.service';
import { UserService } from 'src/app/shared/services/user.service';
import { PaymentStatus, Payments } from 'src/app/shared/models/payments.interface';
import { User } from 'src/app/shared/models/user.interface';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  package: Packages;
  payment: Payments;
  user: User;
  handler: any;
  paymentProcessed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentsService,
    private userService: UserService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.package = this.route.snapshot.data.package as Packages;
    this.user = this.route.snapshot.data.userData as User;
    console.log('package :', this.package);
    console.log('user :', this.user);

    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      locale: 'auto',
      token: async (token) => {
        this.payment = {
          token: token, // Use token.id instead of token
          amount: this.package.budget.toString(),
          package:this.package,
          bookingDate: new Date(),
          paymentStatus:PaymentStatus.ACTIVE
        };

        try {
          await this.userService
            .collection()
            .doc(this.user?.uid)
            .collection('payments')
            .doc()
            .set(this.payment, { merge: true }).then(data => {
              this.paymentProcessed = true;
            }).finally(()=>{
              this.showSuccessModal();
              this.paymentProcessed = false;
            });
        } catch (error) {
          console.error('Error saving payment:', error);
        }
      },
    });
  }

  handlePayment(event: Event) {
    event.preventDefault();
    this.handler.open({
      name: 'Payment',
      description: 'Book your selected package',
      amount: this.package.budget * 100, // Stripe expects amount in cents
      email: this.user.email,
    });
  }

  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }

  async showSuccessModal() {
    console.log("test")
    try {
      const modal = await this.modalController.create({
        component: SuccessModalComponent
      });
      return await modal.present();
    } catch (error) {
      console.error('Error presenting modal:', error);
    }
  }
  
}
