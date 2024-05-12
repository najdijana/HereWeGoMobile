import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportationsPageRoutingModule } from './transportations-routing.module';

import { TransportationsPage } from './transportations.page';
import { TransportationService } from './transportation.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportationsPageRoutingModule
  ],
  declarations: [TransportationsPage],
  providers:[TransportationService]
})
export class TransportationsPageModule {}
