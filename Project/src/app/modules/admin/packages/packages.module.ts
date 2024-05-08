import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PackagesPageRoutingModule } from './packages-routing.module';

import { PackagesPage } from './packages.page';
import { PackageService } from './Services/packages.service';
import { FilterPackagesComponent } from './filter-packages/filter-packages.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PackagesPageRoutingModule,
  ],
  exports: [
    FilterPackagesComponent 
  ],
  providers: [
    PackageService // Add PackageService here
  ],
  declarations: [PackagesPage,FilterPackagesComponent],
  
})
export class PackagesPageModule {}
