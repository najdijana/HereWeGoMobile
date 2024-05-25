import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivitiesPage } from './activities.page';
import { UserDataResolver } from 'src/app/app.resolver';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesPage,
    resolve:{
      user:UserDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivitiesPageRoutingModule {}
