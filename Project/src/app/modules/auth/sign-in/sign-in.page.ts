import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'sign-in.page.html',
  styleUrls: ['sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  @ViewChild('signInNgForm') signInNgForm: NgForm;
  // alert: {
  //   type: FuseAlertType,
  //   message: string
  // } = {
  //   type: 'success',
  //   message: ''
  // };
  user:any;
  showAlert: boolean = false;
  signingIn: boolean;
  registeringWithGoogle: boolean;
  registeringWithFacebook: boolean;

  signInForm: UntypedFormGroup;
  signInData: User = {};
  alert: { type: string, message: string } = { type: '', message: '' };
  showPassword: boolean = false;

  constructor(private auth : AuthService,
    private _afa: AngularFireAuth,
    private formBuilder: UntypedFormBuilder) { }
  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  showAlertMessage(type: string, message: string) {
    this.alert.type = type;
    this.alert.message = message;
    this.showAlert = true;
  }
  login() {
    console.log('sign in');
    // Return if the form is invalid
    if (this.signInForm.invalid) {
        return;
    }
  console.log("test auth",this.auth.authUser)
    this.signingIn = true;
    // Disable the form
    this.signInForm.disable();
    // Hide the alert
    this.showAlert = false;
    const signInData: {
        email: string;
        password: string
    } = this.signInForm.value as {
        email: string,
        password: string
    };
    this._afa
        .signInWithEmailAndPassword(signInData?.email, signInData?.password)
        .then((res) => {
          console.log("res",res)
              // Check for email verification
              console.log("test auth",this.auth.authUser)
  
  
        if (!res.user?.emailVerified) {
          this.alert = {
            type: 'error',
            message: 'Please verify your email before logging in.'
          };
          this.showAlert = true;
          this.signInForm.enable();
          return null;
        }
         else{
          return res;
         }
         
        }).then((res)=>{
          if(res){
            this.auth.authUser=res?.user;
            this.auth.initFirestoreUserListener(res?.user);
            console.log("Signed In successfully",this.auth.authUser,this.auth.firestoreUser);
          }
         
        })
        .catch((err: {
            a: any;
            message: string;
            code: string
        }) => {
            // Re-enable the form
            this.signInForm.enable();
            // Reset the form
            this.signInNgForm.resetForm();
            // Set the alert
            this.alert = {
                type: 'error',
                message: 'Email or Password does not exist. Please Try Again!'
              };
            // Show the alert
            this.showAlert = true;
        })
        .finally(() => this.signingIn = false);
  }
  
  signUp() {
    // Navigate to the sign-up page or handle sign-up logic
  }

  registerWithGoogle() {
    this.registeringWithGoogle = true;
    // Disable the form
    this.signInForm.disable();
    // Hide the alert
    this.showAlert = false;
    this.auth.googleSignIn()
        .then((res) => {
          console.log("authuser : ",this.auth.authUser)
          console.log("firestoreUser : ",this.auth.firestoreUser)
        })
        .catch((err) => {
            // Re-enable the form
            this.signInForm.enable();
            // Reset the form
            this.signInNgForm.resetForm();
  
            // Set the alert
            this.alert = {
                type: 'error',
                message: 'Something went wrong. Please try again'
            };
            // Show the alert
            this.showAlert = true;
        })
        .finally(() => this.registeringWithGoogle = false);  }

  registerWithFacebook() {
    this.registeringWithFacebook = true;
    // Disable the form
    this.signInForm.disable();
    // Hide the alert
    this.showAlert = false;
    this.auth.facebookSignIn()
        .then((res) => {
        })
        .catch((err) => {
            // Re-enable the form
            this.signInForm.enable();
            // Reset the form
            this.signInNgForm.resetForm();
            // Set the alert
            this.alert = {
                type: 'error',
                message: 'Something went wrong. Please try again. '
            };
            // Show the alert
            this.showAlert = true;
        })
        .finally(() => this.registeringWithFacebook = false);  }
}
