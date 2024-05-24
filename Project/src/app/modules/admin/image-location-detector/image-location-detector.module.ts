import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ActionSheetController, IonicModule } from '@ionic/angular';

import { ImageLocationDetectorPageRoutingModule } from './image-location-detector-routing.module';

import { ImageLocationDetectorPage } from './image-location-detector.page';
import { HttpClientModule } from '@angular/common/http';
import { ImageLocationService } from './image-location.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageLocationDetectorPageRoutingModule,
    HttpClientModule 
  ],
  declarations: [ImageLocationDetectorPage],
  providers:[ActionSheetController,ImageLocationService]
})
export class ImageLocationDetectorPageModule {}
