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
import { Guiders } from 'src/app/shared/models/guiders.interface';
import { AbstractFirestoreService } from 'src/app/shared/services/abstracts/AbstractFirestoreService';
import { AuthService } from 'src/app/shared/services/auth.service';



@Injectable()
export class GuiderService extends AbstractFirestoreService<Guiders> {

  onUserChanged$: BehaviorSubject<Guiders> = new BehaviorSubject<Guiders>(null);

    override COLLECTION = 'guiders';

    constructor(authService: AuthService) {
        super(authService);
  }

    private _list: Guiders;

    set list(value: Guiders) {
        this._list = value;
        this.onUserChanged$.next(value);
    }
}