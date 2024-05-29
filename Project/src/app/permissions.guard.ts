import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, take, tap, switchMap } from 'rxjs/operators';
import { User } from './shared/models/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges().pipe(
            take(1),
            map(userData => {
              if (userData) {
                return true;
              } else {
                this.router.navigate(['/sign-in']);
                return false;
              }
            })
          );
        } else {
          this.router.navigate(['/sign-in']);
          return of(false);
        }
      }),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/sign-in']);
        }
      })
    );
  }
}
