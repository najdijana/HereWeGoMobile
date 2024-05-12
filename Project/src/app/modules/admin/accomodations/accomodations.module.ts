import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccomodationsPageRoutingModule } from './accomodations-routing.module';

import { AccomodationsPage } from './accomodations.page';
import { AccommodationService } from './accomodations.service';
import { FilterAccommodationsComponent } from './filter-accommodations/filter-accommodations.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccomodationsPageRoutingModule
  ],
  declarations: [AccomodationsPage,FilterAccommodationsComponent],
  providers:[AccommodationService]
})
export class AccomodationsPageModule {}
