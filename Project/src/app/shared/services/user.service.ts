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
import { User } from '../models/user.interface';
import { AuthService } from './auth.service';
import { AbstractFirestoreService } from './abstracts/AbstractFirestoreService';

@Injectable({
  providedIn: 'root',
})
export class UserService extends AbstractFirestoreService<User> {

  onUserChanged$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    override COLLECTION = 'users';

    constructor(authService: AuthService) {
        super(authService);
  }

    private _list: User;

    set list(value: User) {
        this._list = value;
        this.onUserChanged$.next(value);
    }
}