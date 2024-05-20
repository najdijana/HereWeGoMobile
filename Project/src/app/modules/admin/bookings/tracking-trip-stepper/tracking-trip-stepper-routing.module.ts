import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingTripStepperPage } from './tracking-trip-stepper.page';
import { PackageResolver } from '../../packages/resolver/package.resolver';

const routes: Routes = [
  {
    path: '',
    component: TrackingTripStepperPage,
    resolve: {
      package: PackageResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingTripStepperPageRoutingModule {}
