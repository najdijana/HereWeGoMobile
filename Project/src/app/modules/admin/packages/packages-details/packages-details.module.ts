import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PackagesDetailsPageRoutingModule } from './packages-details-routing.module';

import { PackagesDetailsPage } from './packages-details.page';
import { PackageResolver } from '../resolver/package.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PackagesDetailsPageRoutingModule
  ],
  providers: [PackageResolver],
  
  declarations: [PackagesDetailsPage]
})
export class PackagesDetailsPageModule {}
