import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingTripStepperPageRoutingModule } from './tracking-trip-stepper-routing.module';

import { TrackingTripStepperPage } from './tracking-trip-stepper.page';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatButtonModule}from'@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { PackageResolver } from '../../packages/resolver/package.resolver';
import { PackageService } from '../../packages/Services/packages.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingTripStepperPageRoutingModule,
    MatStepperModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule, // Import MatFormFieldModule
    MatInputModule, // Import MatInputModule
    MatSelectModule, // Import MatSelectModule
    MatIconModule,
  ],
  declarations: [TrackingTripStepperPage],
  providers:[PackageResolver,PackageService]
})
export class TrackingTripStepperPageModule {}
