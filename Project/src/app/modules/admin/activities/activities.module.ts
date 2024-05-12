import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivitiesPageRoutingModule } from './activities-routing.module';

import { ActivitiesPage } from './activities.page';
import { FilterActivitiesComponent } from './filter-activities/filter-activities.component';
import { ActivitiesService } from './services/activities.services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivitiesPageRoutingModule
  ],
  exports: [
    FilterActivitiesComponent 
  ],
  providers: [
    ActivitiesService,
  ],
  declarations: [ActivitiesPage, FilterActivitiesComponent]
})
export class ActivitiesPageModule {}
