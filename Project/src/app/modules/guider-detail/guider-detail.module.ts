import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuiderDetailPageRoutingModule } from './guider-detail-routing.module';

import { GuiderDetailPage } from './guider-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuiderDetailPageRoutingModule
  ],
  declarations: [GuiderDetailPage]
})
export class GuiderDetailPageModule {}
