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
import { Activities } from 'src/app/shared/models/activities.interface';
import { AbstractFirestoreService } from 'src/app/shared/services/abstracts/AbstractFirestoreService';
import { AuthService } from 'src/app/shared/services/auth.service';


@Injectable()
export class ActivitiesService extends AbstractFirestoreService<Activities> {

  onUserChanged$: BehaviorSubject<Activities> = new BehaviorSubject<Activities>(null);

    override COLLECTION = 'Activities';

    constructor(authService: AuthService) {
        super(authService);
  }

    private _list: Activities;

    set list(value: Activities) {
        this._list = value;
        this.onUserChanged$.next(value);
    }
}