import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from './shared/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserDataResolver implements Resolve<User | null> {
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private fireauth: AngularFireAuth
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User | null> {
    return this.fireauth.authState.pipe(
      switchMap(user => {
        if (user) {
        this.authService.authUser=user;
        console.log("this.authUser",this.authService.authUser)
         this.authService.initFirestoreUserListener(user);
        return of(user);
        } else {
        this.authService.authUser=null;
        this.authService.firestoreUser=null;
        return of(null);
        }
      })
    );
  }
}
