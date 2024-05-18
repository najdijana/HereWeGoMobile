import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuiderPage } from './guider.page';
import { GuiderResolver } from './resolver/guider.resolver';

const routes: Routes = [
  {
    path: '',
    component: GuiderPage
  },

  {
    path: ':id/details',
    loadChildren: () => import('./guider-detail/guider-detail.module').then(m => m.GuiderDetailPageModule),
    resolve: {
        package: GuiderResolver
    }
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuiderPageRoutingModule {}
