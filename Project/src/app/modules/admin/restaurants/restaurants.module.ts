import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantsPageRoutingModule } from './restaurants-routing.module';

import { RestaurantsPage } from './restaurants.page';
import { RestaurantsService } from './restaurants.service';
import { FilterRestaurantsComponent } from './filter-restaurants/filter-restaurants.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantsPageRoutingModule
  ],
  declarations: [RestaurantsPage,FilterRestaurantsComponent],
  providers:[RestaurantsService]
})
export class RestaurantsPageModule {}
