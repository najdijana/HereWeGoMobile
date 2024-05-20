import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payments } from 'src/app/shared/models/payments.interface';
import { User } from 'src/app/shared/models/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  user: User;
  payments: Payments[];
  groupedPayments: { date: Date, payments: Payments[] }[];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

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
          this.groupPaymentsByDate();
          console.log('Grouped Payments:', this.groupedPayments);
        },
        (error) => {
          console.error('Error fetching payments:', error);
        }
      );
  }

  groupPaymentsByDate() {
    const grouped = {};
    this.payments.forEach(payment => {
      const date = payment.package.startDate;
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      if (!grouped[dateString]) {
        grouped[dateString] = [];
      }
      grouped[dateString].push(payment);
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
}
