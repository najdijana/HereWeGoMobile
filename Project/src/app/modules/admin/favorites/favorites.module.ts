import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesPageRoutingModule } from './favorites-routing.module';

import { FavoritesPage } from './favorites.page';
import { AccommodationService } from '../accomodations/accomodations.service';
import { ActivitiesService } from '../activities/services/activities.services';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { TopDestinationService } from '../top-destinations/destinations/service/topdestination.service';
import { TransportationService } from '../transportations/transportation.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesPageRoutingModule
  ],
  declarations: [FavoritesPage],
  providers:[TopDestinationService,ActivitiesService,RestaurantsService,TransportationService,AccommodationService]
})
export class FavoritesPageModule {}
