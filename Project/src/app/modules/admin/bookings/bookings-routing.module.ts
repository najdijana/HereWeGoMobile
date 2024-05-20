import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingsPage } from './bookings.page';
import { PackageResolver } from '../packages/resolver/package.resolver';

const routes: Routes = [
  {
    path: '',
    component: BookingsPage
  },
  {
    path: ':id/tracking-trip-stepper',
    loadChildren: () => import('./tracking-trip-stepper/tracking-trip-stepper.module').then( m => m.TrackingTripStepperPageModule),
  },
  {
    path: ':id/trip-history',
    loadChildren: () => import('./tracking-trip-stepper/tracking-trip-stepper.module').then( m => m.TrackingTripStepperPageModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsPageRoutingModule {}
