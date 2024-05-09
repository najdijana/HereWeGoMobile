import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PackagesDetailsPage } from './packages-details.page';

const routes: Routes = [
  {
    path: '',
    component: PackagesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackagesDetailsPageRoutingModule {}
