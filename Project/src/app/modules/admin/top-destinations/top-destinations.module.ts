import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopDestinationsPageRoutingModule } from './top-destinations-routing.module';

import { TopDestinationsPage } from './top-destinations.page';
import { DestinationService } from './destination.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopDestinationsPageRoutingModule
  ],
  declarations: [TopDestinationsPage],
  providers:[DestinationService]
})
export class TopDestinationsPageModule {}
