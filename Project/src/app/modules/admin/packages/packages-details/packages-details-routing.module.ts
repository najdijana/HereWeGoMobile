import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PackagesDetailsPage } from './packages-details.page';
import { UserDataResolver } from 'src/app/app.resolver';

const routes: Routes = [
  {
    path: '',
    component: PackagesDetailsPage,
    resolve:{
      user:UserDataResolver
    }
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackagesDetailsPageRoutingModule {}
