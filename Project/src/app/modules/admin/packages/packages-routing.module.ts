import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackagesPage } from './packages.page';
import { PackageResolver } from './resolver/package.resolver';

const routes: Routes = [
  {
    path: '',
    component: PackagesPage
  },
  {
    path: ':id/details',
    loadChildren: () => import('./packages-details/packages-details.module').then(m => m.PackagesDetailsPageModule),
    resolve: {
        package: PackageResolver
    }
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackagesPageRoutingModule {}
