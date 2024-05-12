import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.currentUser$.pipe(
      take(1), // Ensure the subscription completes after receiving the first value
      map(user => {
        const isAuthenticated = !!user; // Check if user is logged in
        if (isAuthenticated) {
          return true; // Proceed to the requested route
        } else {
          // User is not logged in, redirect to the sign-in page
          return this.router.createUrlTree(['/sign-in']);
        }
      })
    );
  }
}
