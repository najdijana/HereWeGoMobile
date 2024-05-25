import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopdestinationsLebPage } from './topdestinations-leb.page';
import { UserDataResolver } from 'src/app/app.resolver';

const routes: Routes = [
  {
    path: '',
    component: TopdestinationsLebPage,
    resolve:{
      user:UserDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopdestinationsLebPageRoutingModule {}
