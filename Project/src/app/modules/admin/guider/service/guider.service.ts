import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Guiders } from 'src/app/shared/models/guiders.interface';
import { Packages } from 'src/app/shared/models/packages.interface';
import { AbstractFirestoreService } from 'src/app/shared/services/abstracts/AbstractFirestoreService';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuiderService extends AbstractFirestoreService<Guiders> {

  onUserChanged$: BehaviorSubject<Guiders> = new BehaviorSubject<Guiders>(null);

  override COLLECTION = 'guiders';

  constructor(authService: AuthService, private afs: AngularFirestore) {
    super(authService);
  }

  private _list: Guiders;

  set list(value: Guiders) {
    this._list = value;
    this.onUserChanged$.next(value);
  }

  getGuiderById(id: string): Observable<Guiders> {
    const guiderDocRef: AngularFirestoreDocument<Guiders> = this.afs.doc<Guiders>(`${this.COLLECTION}/${id}`);
    return guiderDocRef.valueChanges();
  }

  getPackagesByGuiderId(id: string): Observable<Packages[]> {
    const packagesCollectionRef: AngularFirestoreCollection<Packages> = this.afs.collection<Packages>(`${this.COLLECTION}/${id}/packages`);
    return packagesCollectionRef.valueChanges();
  }

  getAllGuiders(): Observable<Guiders[]> {
    const guidersCollectionRef: AngularFirestoreCollection<Guiders> = this.afs.collection<Guiders>(this.COLLECTION);
    return guidersCollectionRef.valueChanges();
  }
}
