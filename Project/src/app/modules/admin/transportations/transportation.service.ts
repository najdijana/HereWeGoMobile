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
import { Packages } from 'src/app/shared/models/packages.interface';
import { Transportation } from 'src/app/shared/models/transportation.interface';
import { AbstractFirestoreService } from 'src/app/shared/services/abstracts/AbstractFirestoreService';
import { AuthService } from 'src/app/shared/services/auth.service';


@Injectable()
export class TransportationService extends AbstractFirestoreService<Transportation> {

  onUserChanged$: BehaviorSubject<Transportation> = new BehaviorSubject<Transportation>(null);

    override COLLECTION = 'Transportation';

    constructor(authService: AuthService) {
        super(authService);
  }

    private _list: Transportation;

    set list(value: Transportation) {
        this._list = value;
        this.onUserChanged$.next(value);
    }
}