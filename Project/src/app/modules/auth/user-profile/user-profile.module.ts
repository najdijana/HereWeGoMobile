import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfilePageRoutingModule } from './user-profile-routing.module';

import { UserProfilePage } from './user-profile.page';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.service';
import { ProfileResolver } from './profile.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule ,
    IonicModule,
    ReactiveFormsModule  ,
    UserProfilePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [UserProfilePage],
  providers: [ProfileResolver,UserService]

})
export class UserProfilePageModule {}
