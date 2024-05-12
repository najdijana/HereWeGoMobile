import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, filter, from, map, Observable, of, switchMap } from 'rxjs';
import { Accommodations } from 'src/app/shared/models/accommodations.interface';
import { Packages } from 'src/app/shared/models/packages.interface';
import { AbstractFirestoreService } from 'src/app/shared/services/abstracts/AbstractFirestoreService';
import { AuthService } from 'src/app/shared/services/auth.service';


@Injectable()
export class AccommodationService extends AbstractFirestoreService<Accommodations> {

  onUserChanged$: BehaviorSubject<Accommodations> = new BehaviorSubject<Accommodations>(null);

    override COLLECTION = 'Accomodation';

    constructor(authService: AuthService) {
        super(authService);
  }

    private _list: Accommodations;

    set list(value: Accommodations) {
        this._list = value;
        this.onUserChanged$.next(value);
    }
}