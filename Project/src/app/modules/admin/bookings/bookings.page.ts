import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentStatus, Payments } from 'src/app/shared/models/payments.interface';
import { User } from 'src/app/shared/models/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { Timestamp } from 'firebase/firestore';
import { PackageService } from '../packages/Services/packages.service';
import { PackageResolver } from '../packages/resolver/package.resolver';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  user: User;
  payments: Payments[];
  groupedPayments: { date: Date, payments: Payments[] }[];
 dateString: any;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private packageService:PackageService,
    private router:Router,
    private alertController: AlertController  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data.user as User;
    console.log("user", this.user);
    this.userService
      .collection()
      .doc(this.user?.uid)
      .collection('payments')
      .valueChanges()
      .subscribe(
        (payments) => {
          this.payments = payments.map((payment) => {
            if (payment.bookingDate) {
              payment.bookingDate = (payment.bookingDate as Timestamp).toDate();
            }
            if (payment.package && payment.package.startDate) {
              payment.package.startDate = (payment.package.startDate as Timestamp).toDate();
            }
            return payment;
          });
          this.filterActivePayments();
          console.log('Filtered Payments:', this.payments);
          this.groupPaymentsByDate();
        },
        (error) => {
          console.error('Error fetching payments:', error);
        }
      );     
    }
    filterActivePayments() {
      this.payments = this.payments.filter(payment => payment.paymentStatus === PaymentStatus.ACTIVE);
    }

    getHistory( packageid:string){
      this.packageService
      .collection()
      .doc(packageid)
      .collection('review', ref => ref.where('user.uid', '==', this.user.uid).orderBy('ratedAt', 'desc').limit(1))
      .valueChanges()
      .subscribe(
        (review) => {
          if(review[0]){
            console.log("review",review[0]);
            this.router.navigate(['bookings',packageid,'history-tracking-stepper',review[0].id])
            // [routerLink]="'/bookings/' + payment.package.id + '/trip-history'"
          }
          else{
            this.router.navigate(['bookings',packageid,'tracking-trip-stepper'])
          }
        }
      );    
    }

    groupPaymentsByDate() {
      const grouped = {};
      this.payments.forEach(payment => {
        const date = payment?.package?.startDate;
        if(date){
           this.dateString = date?.toISOString().split('T')[0]; // YYYY-MM-DD format
           if (!grouped[this.dateString]) {
            grouped[this.dateString] = [];
          }
          grouped[this.dateString].push(payment);
        }
       
      });
      this.groupedPayments = Object.keys(grouped)
        .map(dateString => ({
          date: new Date(dateString),
          payments: grouped[dateString]
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime()); // Sort by date
    }

  isPastDate(date: Date): boolean {
    const today = new Date();
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  async openCancelModal(paymentId: string) {
    const alert = await this.alertController.create({
      header: 'Confirm Cancel',
      message: 'Are you sure you want to cancel this trip?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel action cancelled');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.cancelTrip(paymentId);
          }
        }
      ]
    });

    await alert.present();
  }

  cancelTrip(paymentId: string) {
    this.userService
      .collection()
      .doc(this.user.uid)
      .collection('payments')
      .doc(paymentId)
      .update({ paymentStatus: PaymentStatus.CANCELED })
      .then(() => {
        console.log('Trip cancelled successfully');
        // Re-fetch payments or update local state
        this.payments = this.payments.filter(payment => payment.id !== paymentId);
        this.groupPaymentsByDate();
      })
      .catch(error => {
        console.error('Error cancelling trip:', error);
      });
  }
}
