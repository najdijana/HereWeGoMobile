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
import { TopDest } from 'src/app/shared/models/topdest.interface';
import { User } from 'src/app/shared/models/user.interface';
import { AbstractFirestoreService } from 'src/app/shared/services/abstracts/AbstractFirestoreService';
import { AuthService } from 'src/app/shared/services/auth.service';


@Injectable()
export class TopDestinationService extends AbstractFirestoreService<TopDest> {

  onUserChanged$: BehaviorSubject<TopDest> = new BehaviorSubject<TopDest>(null);

    override COLLECTION = 'TopDestinations';

    constructor(authService: AuthService) {
        super(authService);
  }

    private _list: TopDest;

    set list(value: TopDest) {
        this._list = value;
        this.onUserChanged$.next(value);
    }
}