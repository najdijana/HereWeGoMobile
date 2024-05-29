import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { RoleTypeOptions, User } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ImageUploadService } from 'src/app/shared/services/storage.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  uploadedCertificateName: string = ''; // Add this line

  @ViewChild('userNgForm') userNgForm: NgForm;
  @ViewChild('fileInput') fileInput: ElementRef;

  userForm: UntypedFormGroup;
  selectedFile: File = null;
  user:User;
  userDetected:User;
  updating: boolean;
  deleting:boolean;
  roleTypeOptions = RoleTypeOptions;
  isValidCertificate:boolean;
  deletingCertificate: boolean;
  uploadLogo:boolean;

  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      handler: () => {
        this.delete(); // Call your delete method
      }
    },
    {
      text: 'Add Profile',
      handler: () => {
        this.fileInput.nativeElement.click(); // Trigger file input click
      }
    },
    {
      text: 'Cancel',
      role: 'cancel',
    },
  ];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(public userService:UserService,
              private route: ActivatedRoute,
              private http: HttpClient,
              private router:Router,
              public formBuilder: UntypedFormBuilder,
              public storageService:ImageUploadService,
              public authService:AuthService,
              private toastController: ToastController 
  ){}

  ngOnInit(): void {
    this.user = this.authService.firestoreUser as User;
    console.log("user is :",this.user);

     // Create the form
     this.userForm = this.formBuilder.group({
      uid:this.user?.uid,
      role: this.formBuilder.control(this.user?.role || RoleTypeOptions.TOURIST),
      profilePicture:this.user?.profilePicture,
      firstName:this.user?.firstName,
      lastName:this.user?.lastName,
      displayName:this.user?.displayName,
      email:this.user?.email,
      phone:this.user?.phone,
      address:this.formBuilder.group({
        country:this.user?.address?.country,
        city:this?.user?.address?.city
      }),
      isValidCertificate:this.user?.isValidCertificate,
      guiderCertificateName:[this.user?.guiderCertificateName,[Validators.required]],
      guiderCertificateURL:this.user?.guiderCertificateURL
    });

    this.listenOnValueChanges();
    console.log("this.user in da form",this.userForm.value);

    this.authService.authUser$.subscribe(user => {
      if (!user) {
        this.router.navigate(['home']);
      }
    });
    
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  listenOnValueChanges(){
    this.userForm.valueChanges .pipe(
      tap((value) => {
        this.user=value;
          console.log("updated form",value);
          console.log("updated form", this.user);
      }),
      debounceTime(300),
      takeUntil(this._unsubscribeAll),
  )
  .subscribe((value) => {
    console.log("value",value)
  });
  }

  uploadImage(event: any, user: User) {
    const file = event.target.files[0];
    if (file) {
      this.uploadLogo=true;
      this.storageService.uploadImage(file, `images/${user.uid}`).subscribe({
        next: (imageUrl: string) => {
          //this.user.profilePicture=imageUrl;
          this.userForm.patchValue({ profilePicture: imageUrl });
          console.log('Image uploaded and form updated:', imageUrl);
          this.uploadLogo=false;
        },
        error: (error) => {
          console.error('Error uploading image:', error);
          this.uploadLogo=false;
        }
      });
    }
  }

  delete() {
    if (!this.user.profilePicture) {
        return;
    }
    const imageUrl = this.user.profilePicture;
    this.deleting = true; // to show a spinner or disable button

    this.storageService.deleteImage(imageUrl).subscribe({
        next: () => {
            //this.user.profilePicture = null; // Assuming default image is handled in the UI
            this.userForm.patchValue({ profilePicture: null });
            this.deleting = false;
        },
        error: (error) => {
            console.error('Error deleting image:', error);
            this.deleting = false;
        }
    });
  }

  listenOnChanges(event){
    console.log('event',event)
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      return; // No file selected
    }
    if (file) {
      this.userForm.patchValue({ guiderCertificateName: file.name });
      this.selectedFile = file;

  } else {
      this.userForm.patchValue({ guiderCertificateName: null });
  }
  }

  onUpload() {
    // if (!this.selectedFile || !this.userForm.get('guiderCertificateName').value) {
    if (!this.selectedFile || !this.user.guiderCertificateName) {
      this.showToast('No selected certificate!', 'danger'); // Show error toast
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:5000/predict', formData).subscribe(
      (response) => {
        console.log(response);
        if(response.toString()==='CertificateCourse'){
          console.log("its real");
          this.storageService.uploadImage(this.selectedFile, `certificates/${this.user?.uid}`).subscribe({
            next: (imageUrl: string) => {
              this.userForm.patchValue({ guiderCertificateName: this.selectedFile.name });
              this.userForm.patchValue({ guiderCertificateURL: imageUrl });
              this.userForm.patchValue({ isValidCertificate: true });
              this.isValidCertificate=true;
              console.log('Image uploaded and form updated:', imageUrl);
              this.showToast('Certificate validated and uploaded successfully!', 'primary'); // Show success toast
            },
            error: (error) => {
              console.error('Error uploading image:', error);
              this.showToast('Error uploading certificate!', 'danger'); // Show error toast
            }
          });
        }else{
          console.log("its not a valid certificate")
          this.isValidCertificate=false;
          this.userForm.patchValue({ guiderCertificateName: null});
          this.userForm.patchValue({ isValidCertificate: false });
          this.userForm.patchValue({ guiderCertificateURL: null });
          this.showToast('Invalid certificate!', 'danger'); // Show error toast

        }
      },
      (error) => {
        console.error('Error:', error);
        this.showToast('Error validating certificate!', 'danger'); // Show error toast
      }
    );
  }


  saveUser(){
    if (this.userForm.invalid && this.user?.role===this.roleTypeOptions.GUIDER && !this.user?.isValidCertificate) {
      this.userForm.markAllAsTouched();
      this.showToast('No selected certificate!', 'danger'); // Show error toast
      return;
    }
   
    this.updating = true;
    this.userForm.disable();

    const data: Partial<User> = this.userForm.getRawValue() as User;
    if(data.role===this.roleTypeOptions.TOURIST){
      data.guiderCertificateName=null;
      data.guiderCertificateURL=null;
      data.isValidCertificate=null;
    }

    this.userService
    .doc(data.uid)
    .update(data)
    .catch((err) => {
        console.error("errorUpdatingTaskMessage", err);
    }).finally(() => {
    this.userForm.enable();
    this.updating = false;
    this.router.navigate(['home']);
    });
    console.log("form data",data);
  }

  removeCertificate():void{
    if (!this.userForm.get('guiderCertificateName').value) {
      return;
    }
    if(!this.isValidCertificate){
      this.userForm.patchValue({ guiderCertificateName: null });
      this.userForm.patchValue({ guiderCertificateURL: null });
      this.userForm.patchValue({ isValidCertificate: false });
      return;
    }

  const imageUrl = this.user.guiderCertificateURL;
  this.deletingCertificate = true; // to show a spinner or disable button

  this.storageService.deleteImage(imageUrl).subscribe({
      next: () => {
          this.userForm.patchValue({ guiderCertificateName: null });
          this.userForm.patchValue({ guiderCertificateURL: null });
          this.userForm.patchValue({ isValidCertificate: false });
          this.deletingCertificate = false;
      },
      error: (error) => {
          console.error('Error deleting Certificate:', error);
          this.deletingCertificate = false;
      }
  });
  }
}
