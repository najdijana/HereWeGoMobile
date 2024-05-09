import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PackagesDetailsPageRoutingModule } from './packages-details-routing.module';

import { PackagesDetailsPage } from './packages-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PackagesDetailsPageRoutingModule
  ],
  declarations: [PackagesDetailsPage]
})
export class PackagesDetailsPageModule {}
