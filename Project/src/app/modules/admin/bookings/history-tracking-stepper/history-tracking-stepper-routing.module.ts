import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryTrackingStepperPage } from './history-tracking-stepper.page';
import { ReviewResolver } from './review.resolver';
import { UserDataResolver } from 'src/app/app.resolver';
import { PackageResolver } from '../../packages/resolver/package.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: HistoryTrackingStepperPage,
    resolve:{
      review:ReviewResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryTrackingStepperPageRoutingModule {}
