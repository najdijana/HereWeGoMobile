import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentPage } from './payment.page';
import { UserDataResolver } from 'src/app/app.resolver';

const routes: Routes = [
  {
    path: '',
    component: PaymentPage,
    resolve:{
      userData:UserDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentPageRoutingModule {}
