import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopdestinationsLebPageRoutingModule } from './topdestinations-leb-routing.module';

import { TopdestinationsLebPage } from './topdestinations-leb.page';
import { TopDestinationService } from '../top-destinations/destinations/service/topdestination.service';
import { FilterDestinationsComponent } from './filter-destinations/filter-destinations.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopdestinationsLebPageRoutingModule
  ],
  declarations: [TopdestinationsLebPage,FilterDestinationsComponent],
  providers:[TopDestinationService]
})
export class TopdestinationsLebPageModule {}
