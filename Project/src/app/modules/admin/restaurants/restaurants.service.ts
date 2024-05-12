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
import { Restaurants } from 'src/app/shared/models/restaurants.interface';
import { AbstractFirestoreService } from 'src/app/shared/services/abstracts/AbstractFirestoreService';
import { AuthService } from 'src/app/shared/services/auth.service';


@Injectable()
export class RestaurantsService extends AbstractFirestoreService<Restaurants> {

  onUserChanged$: BehaviorSubject<Restaurants> = new BehaviorSubject<Restaurants>(null);

    override COLLECTION = 'Restaurants';

    constructor(authService: AuthService) {
        super(authService);
  }

    private _list: Restaurants;

    set list(value: Restaurants) {
        this._list = value;
        this.onUserChanged$.next(value);
    }
}