import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritesPage } from './favorites.page';
import { UserDataResolver } from 'src/app/app.resolver';

const routes: Routes = [
  {
    path: '',
    component: FavoritesPage,
    resolve:{
      user:UserDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesPageRoutingModule {}
