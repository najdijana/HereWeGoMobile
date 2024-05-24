import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PackagesDetailsPageRoutingModule } from './packages-details-routing.module';

import { PackagesDetailsPage } from './packages-details.page';
import { PackageResolver } from '../resolver/package.resolver';
import { ReviewService } from '../../bookings/tracking-trip-stepper/reviews.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PackagesDetailsPageRoutingModule
  ],
  providers: [PackageResolver,ReviewService],
  
  declarations: [PackagesDetailsPage]
})
export class PackagesDetailsPageModule {}
