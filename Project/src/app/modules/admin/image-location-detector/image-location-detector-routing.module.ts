import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageLocationDetectorPage } from './image-location-detector.page';

const routes: Routes = [
  {
    path: '',
    component: ImageLocationDetectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageLocationDetectorPageRoutingModule {}
