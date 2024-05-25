import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccomodationsPage } from './accomodations.page';
import { UserDataResolver } from 'src/app/app.resolver';

const routes: Routes = [
  {
    path: '',
    component: AccomodationsPage,
    resolve:{
      user:UserDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccomodationsPageRoutingModule {}
