import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportationsPage } from './transportations.page';

const routes: Routes = [
  {
    path: '',
    component: TransportationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportationsPageRoutingModule {}
