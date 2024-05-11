import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopDestinationsPage } from './top-destinations.page';

const routes: Routes = [
  {
    path: '',
    component: TopDestinationsPage
  },
  {
    path: 'destinations/:name',
    loadChildren: () => import('./destinations/destinations.module').then( m => m.DestinationsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopDestinationsPageRoutingModule {}
