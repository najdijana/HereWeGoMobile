import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, combineLatest, from, of } from 'rxjs';
import { RoleTypeOptions, User } from '../models/user.interface';
import firebase from 'firebase/compat/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {debounceTime, filter, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    currentUser$: Observable<User>;
    firestoreUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    authUser$: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(null);
    unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(public fireauth : AngularFireAuth,
              public afs: AngularFirestore,
              public router : Router) {
              this.initFirestoreUserListener(this.authUser);
            }

  public _authUser: firebase.User;

  get authUser(): firebase.User {
      return this._authUser;
  }

  //store data in authUser
  set authUser(value: firebase.User) {
    this._authUser = value;
    this.authUser$.next(value);
    if (!value) {
        this.firestoreUser = null;
    } 
  }

  public _firestoreUser: User;

  get firestoreUser(): User {
      return this._firestoreUser;
  }

  set firestoreUser(value: User) {
      this._firestoreUser = value;
      this.firestoreUser$.next(value);
  }

  
  initFirestoreUserListener(user:any):any{
    if(user){
      const userDoc= this.afs.doc<User>(`users/${user.uid}`).valueChanges().pipe(takeUntil(this.unsubscribeAll));
      this.currentUser$ = userDoc;
      console.log('user documnet as observable :', userDoc);
      this.currentUser$.pipe(takeUntil(this.unsubscribeAll)).subscribe((user) => {
        console.log('user document as model:', user);
        this.firestoreUser = user;
        console.log('firestoreUser', this.firestoreUser);
      }, error => console.error('Error: ', error));
    }
    else{
      this.firestoreUser=null;
    }
   
  }

  completeSubscription(): void {
    console.log('completeSubscription()');
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
}

reInitSubscription(): void {
    this.completeSubscription();
    this.resetEveryThing();
}

resetEveryThing(): void {
    this.unsubscribeAll = new Subject<any>();
    this.authUser=null;
    this.firestoreUser=null;
}

  isAdminUser(): boolean {
    return this.firestoreUser?.role === RoleTypeOptions.ADMIN;  
  }

  isguiderUser(): boolean {
    return this.firestoreUser?.role === RoleTypeOptions.TOURIST;  
  }

  async resendConfirmationEmail(): Promise<any> {
    return await this.authUser.sendEmailVerification();
  }


  // login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        if(res.user?.emailVerified == true) {
          this.router.navigate(['/home']);
          console.log("logged in successfully");
        } 
        else {
        console.log("Kindly verify your email before logging in")
        this.router.navigate(['/verify-email']);
        }

    }, err => {
        alert(err.message);
        console.log("err",err,err.message)
        this.router.navigate(['/signIn']);
    })
  }

  // sign out
  logout(): void {
    this.fireauth.signOut().then(() => {
      this.reInitSubscription();
      console.log("Logged out successfully");
      this.router.navigate(['/sign-in']);
    }).catch(err => {
      alert(err.message);
      console.error("Logout error:", err.message);
    });
  }

  // forgot password
  forgotPassword(email : string) {
      this.fireauth.sendPasswordResetEmail(email).then(() => {
      }, err => {
        alert('Something went wrong');
      })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.authUser=res?.user;
      const data:User={
        uid:res?.user?.uid,
        email:res?.user?.email,
        displayName:res?.user?.displayName
      }
      this.afs.doc<User>(`users/${data.uid}`).set(data, {merge: true});
      this.initFirestoreUserListener(this.authUser);
      console.log(this.authUser.email,this.authUser.uid,this.firestoreUser);
      console.log("signed In successfully")
    }, err => {
      alert(err.message);
    })
  }

  facebookSignIn() {
    return this.fireauth.signInWithPopup(new FacebookAuthProvider).then(res => {
      this.authUser=res?.user;
      const data:User={
        uid:res?.user?.uid,
        email:res?.user?.email,
      }
      this.afs.doc<User>(`users/${data.uid}`).set(data, {merge: true});
      console.log(this.authUser.email,this.authUser.uid,this.firestoreUser);
      console.log("signed In successfully");
    }, err => {
      alert(err.message);
    })
  }

  updateUser(user: User): Observable<void> {
    return from(this.afs.doc<User>(`users/${user.uid}`).update({ ...user }));
    // const ref = doc(this.firestore, 'users', user.uid);
    //  from(updateDoc(ref, { ...user }));
  }


}
