import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, NgForm, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  
  @ViewChild('signInNgForm') signInNgForm: NgForm;
  showAlert: boolean = false;
  signingIn: boolean;
  registeringWithGoogle: boolean;
  registeringWithFacebook: boolean;
  uid:any;

  signUpForm: UntypedFormGroup;
  signUpData: User = {};
  showPassword: boolean = false;
  registering: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _afa: AngularFireAuth,
    private router: Router,
    private usersService:UserService,
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  register() {
    if (this.signUpForm.invalid) {
      //this.snackbar.open('Please check your entries', 'OK', {duration: 5000});
      return;
    }
    this.signingIn = true;

    // Disable the form
    this.signUpForm.disable();

    // Hide the alert
    this.showAlert = false;

    const signUpData: { displayName: string; email: string; password: string } = this.signUpForm.value;

    this._afa
        .createUserWithEmailAndPassword(signUpData?.email, signUpData?.password)
        .then((res) => {
            // Set the alert
            // this.alert = {
            //     type: 'success',
            //     message: 'The registration has been successful! You will be redirected. Please be patient!'
            // };
            // Show the alert
            //this.showAlert = true;
            console.log("logged in successfully",res);
            const data:User={
              uid:res?.user?.uid,
              email:res?.user?.email,
              displayName:signUpData.displayName
            }
            this.usersService.doc(data?.uid).set(data, {merge: true});
            res.user.sendEmailVerification();
            console.log("confirmation email sent");
            //this.snackbar.open(`Comfirmation Email was sent uccessfully to ${data.email} `, 'OK', {duration: 5000});
            return Promise.all([res?.user?.updateProfile({displayName: signUpData.displayName})]);
        })
        .then((res) => {
          // this.router.navigate(['/verify-email']);
          //this.router.navigate(['/home']);

        })
        .catch((err) => {
          if (err.code === 'auth/email-already-in-use') {
            // this.alert = {
            //     type: 'error',
            //     message: 'This email address is already in use. Please try another.'
            // };
        } else {
            // General error handling
            // this.alert = {
            //     type: 'error',
            //     message: 'Something went wrong. Please try again.'
            // };
        }
            // Show the alert
            this.showAlert = true;
            // Re-enable the form
            this.signUpForm.enable();
            // Reset the form
            this.signInNgForm.resetForm();
        })
        .finally(() => {
            this.signingIn = false;
        });
  }
}
