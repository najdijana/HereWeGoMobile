import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopdestinationsLebPage } from './topdestinations-leb.page';

const routes: Routes = [
  {
    path: '',
    component: TopdestinationsLebPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopdestinationsLebPageRoutingModule {}
