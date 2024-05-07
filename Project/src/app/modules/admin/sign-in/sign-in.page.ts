import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: 'sign-in.page.html',
  styleUrls: ['sign-in.page.scss'],
})
export class SignInPage {
  signInForm: FormGroup;
  signInData: User = {};
  signingIn: boolean = false;
  showAlert: boolean = false;
  alert: { type: string, message: string } = { type: '', message: '' };
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
  
  ) {
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

  }
  
  signUp() {
    // Navigate to the sign-up page or handle sign-up logic
  }

  registerWithGoogle() {
    // Implement Google authentication logic
  }

  registerWithFacebook() {
    // Implement Facebook authentication logic
  }
}
