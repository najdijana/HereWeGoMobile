import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Payments } from 'src/app/shared/models/payments.interface';
import { AbstractFirestoreService } from 'src/app/shared/services/abstracts/AbstractFirestoreService';
import { AuthService } from 'src/app/shared/services/auth.service';


@Injectable()
export class PaymentsService extends AbstractFirestoreService<Payments> {

  onUserChanged$: BehaviorSubject<Payments> = new BehaviorSubject<Payments>(null);

    override COLLECTION = 'payments';

    constructor(authService: AuthService) {
        super(authService);
  }

    private _list: Payments;

    set list(value: Payments) {
        this._list = value;
        this.onUserChanged$.next(value);
    }

//     // This will save the token to Firebase, triggering the cloud function
// processPayment(token: any, amount) {
//     const payment={token,amount};
//     return this.db.list(`/payments/${this.userId}`).push(payment)
//   }
  
}