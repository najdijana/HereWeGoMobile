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
import { AbstractFirestoreService } from 'src/app/shared/services/abstracts/AbstractFirestoreService';
import { AuthService } from 'src/app/shared/services/auth.service';


@Injectable()
export class PackageService extends AbstractFirestoreService<Packages> {

  onUserChanged$: BehaviorSubject<Packages> = new BehaviorSubject<Packages>(null);

    override COLLECTION = 'Packages';

    constructor(authService: AuthService) {
        super(authService);
  }

    private _list: Packages;

    set list(value: Packages) {
        this._list = value;
        this.onUserChanged$.next(value);
    }
}