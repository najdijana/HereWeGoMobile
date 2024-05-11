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
import { destination, TopDest } from 'src/app/shared/models/topdest.interface';
import { User } from 'src/app/shared/models/user.interface';
import { AbstractFirestoreService } from 'src/app/shared/services/abstracts/AbstractFirestoreService';
import { AuthService } from 'src/app/shared/services/auth.service';


@Injectable()
export class DestinationService extends AbstractFirestoreService<destination> {

  onUserChanged$: BehaviorSubject<destination> = new BehaviorSubject<destination>(null);

    override COLLECTION = 'destinations';

    constructor(authService: AuthService) {
        super(authService);
  }

    private _list: destination;

    set list(value: destination) {
        this._list = value;
        this.onUserChanged$.next(value);
    }
}