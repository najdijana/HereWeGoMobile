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
            console.log("logged in successfully",res);
            const data:User={
              uid:res?.user?.uid,
              email:res?.user?.email,
              displayName:signUpData.displayName
            }
            this.usersService.doc(data?.uid).set(data, {merge: true});
            res.user.sendEmailVerification();
            console.log("confirmation email sent");
           return Promise.all([res?.user?.updateProfile({displayName: signUpData.displayName})]);
        })
        .then((res) => {
      
        })
        .catch((err) => {
          if (err.code === 'auth/email-already-in-use') {
          
        } else {}
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
