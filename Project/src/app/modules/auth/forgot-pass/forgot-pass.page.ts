import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.page.html',
  styleUrls: ['./forgot-pass.page.scss'],
})
export class ForgotPassPage implements OnInit {
  @ViewChild('signInNgForm') signInNgForm: NgForm;
  email : string;
  signInForm: UntypedFormGroup;

  alert: {
    type: string,
    message: string
  } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;
  signingIn: boolean;

  constructor(private auth : AuthService,
    private userService:UserService,
    private _formBuilder: UntypedFormBuilder,
    private _afa: AngularFireAuth) { }

    ngOnInit(): void {
      this.signInForm = this._formBuilder.group({
        email: [null, [Validators.required, Validators.email]],
    });  }

    async checkIfEmailExists(email) {
      return this.userService.collection((ref) => ref.where('email', '==', email)).get()
      .pipe(
        take(1),
        map(res => res.size > 0)
      ).toPromise();  }
  
  
    forgotPassword() {
      console.log('reset pass');
      if (this.signInForm.invalid) {
        return;
      }
      this.signingIn = true;
      // Disable the form
      this.signInForm.disable();
      // Hide the alert
      this.showAlert = false;
  
      this.email=this.signInForm.get('email').value;
  
      this.checkIfEmailExists(this.email).then(emailExists => {
        if(!emailExists){
          this.alert = {
                type: 'error',
                message: 'Email does not exist. Please Try Again!'
              };
            // Show the alert
            this.showAlert = true;
            this.signInForm.enable();
            this.signingIn = false
            return;
        }
        else{
          this._afa.sendPasswordResetEmail(this.email).then((res)=>{
            //this.auth.authUser.email=this.email;
            console.log("res",res);
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
                message: 'Email does not exist. Please Try Again!'
              };
            // Show the alert
            this.showAlert = true;
        })
        .finally(() => this.signingIn = false);
        }
      });
  
    }

}
