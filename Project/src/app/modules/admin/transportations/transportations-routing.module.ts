import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportationsPage } from './transportations.page';
import { UserDataResolver } from 'src/app/app.resolver';

const routes: Routes = [
  {
    path: '',
    component: TransportationsPage,
    resolve:{
      user:UserDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportationsPageRoutingModule {}
