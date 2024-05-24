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
import { Review } from 'src/app/shared/models/review.interface';
import { AbstractFirestoreService } from 'src/app/shared/services/abstracts/AbstractFirestoreService';
import { AuthService } from 'src/app/shared/services/auth.service';


@Injectable()
export class ReviewService extends AbstractFirestoreService<Review> {

  onUserChanged$: BehaviorSubject<Review> = new BehaviorSubject<Review>(null);

    override COLLECTION = 'review';

    constructor(authService: AuthService) {
        super(authService);
  }

    private _list: Review;

    set list(value: Review) {
        this._list = value;
        this.onUserChanged$.next(value);
    }

    setParentPathPackage(packageId: string): void {
      this.parentPath = `Packages/${packageId}`;
    }
    setParentPathUser(userId: string): void {
      this.parentPath = `users/${userId}`;
    }
}