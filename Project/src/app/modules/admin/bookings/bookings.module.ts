import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingsPageRoutingModule } from './bookings-routing.module';

import { BookingsPage } from './bookings.page';
import { PackageService } from '../packages/Services/packages.service';
import { PackageResolver } from '../packages/resolver/package.resolver';
import { GmapserviceService } from './services/gmapservice.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingsPageRoutingModule
  ],
  declarations: [BookingsPage],
  providers:[PackageService,PackageResolver,GmapserviceService],
})
export class BookingsPageModule {}
