import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RoleTypeOptions, User } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userForm!: FormGroup;
  user!: User; // Use the User interface
  deleting: boolean = false;
  uploadedCertificateName: string = ''; // Add this line

  constructor() {
    this.initForm();
  }
  
  initForm(): void {
    this.userForm = new FormGroup({
      role: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      displayName: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      address: new FormGroup({
        country: new FormControl(''),
        city: new FormControl('')
      })
    });
  }

  onCertificateUpload(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let file = element.files ? element.files[0] : null;
    if (file) {
      this.uploadedCertificateName = file.name; // Update the filename here
      // Handle file upload, e.g., uploading to a server
    }
  }

  removeUploadedCertificate() {
    this.uploadedCertificateName = ''; // Clear the filename here
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.user = {
      uid: '12345',
      firstName: 'John',
      lastName: 'Doe',
      displayName: 'johndoe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      role: RoleTypeOptions.TOURIST,
      address: {
        country: 'USA',
        city: 'New York'
      }
    };
    this.userForm.patchValue(this.user);
    if (this.user.address) {
      this.userForm.get('address')!.patchValue(this.user.address);  // Non-null assertion
    }
  }
}
