import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuiderPageRoutingModule } from './guider-routing.module';

import { GuiderPage } from './guider.page';
import { GuiderService } from './service/guider.service';
import { GuiderResolver } from './resolver/guider.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuiderPageRoutingModule
  ],
  providers: [
    GuiderService,
    GuiderResolver,
  ],
  declarations: [GuiderPage]
})
export class GuiderPageModule {}
