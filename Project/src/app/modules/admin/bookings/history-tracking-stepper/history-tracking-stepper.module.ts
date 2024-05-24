import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryTrackingStepperPageRoutingModule } from './history-tracking-stepper-routing.module';

import { HistoryTrackingStepperPage } from './history-tracking-stepper.page';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { ReviewResolver } from './review.resolver';
import { ReviewService } from '../tracking-trip-stepper/reviews.service';
import { PackageResolver } from '../../packages/resolver/package.resolver';
import { PackageService } from '../../packages/Services/packages.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatStepperModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule, // Import MatFormFieldModule
    MatInputModule, // Import MatInputModule
    MatSelectModule, // Import MatSelectModule
    MatIconModule,
    HistoryTrackingStepperPageRoutingModule
  ],
  declarations: [HistoryTrackingStepperPage],
  providers:[ReviewResolver,ReviewService]
})
export class HistoryTrackingStepperPageModule {}
