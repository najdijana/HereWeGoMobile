import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserDataResolver } from './app.resolver';
import { ProfileResolver } from './modules/auth/user-profile/profile.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    resolve:{
      userDataResolver:UserDataResolver
  },
  },
  {
    path: 'user-profile/:id',
    loadChildren: () => import('./modules/auth/user-profile/user-profile.module').then( m => m.UserProfilePageModule),
    resolve:{
      profileRoslver:ProfileResolver,
      userDataResolver:UserDataResolver
  },
  },
  {
    path: 'loader',
    loadChildren: () => import('./modules/auth/loader/loader.module').then( m => m.LoaderPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./modules/auth/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./modules/auth/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'forgot-pass',
    loadChildren: () => import('./modules/auth/forgot-pass/forgot-pass.module').then( m => m.ForgotPassPageModule)
  },
  {
    path: 'top-destinations',
    loadChildren: () => import('./modules/admin/top-destinations/top-destinations.module').then( m => m.TopDestinationsPageModule)
  },
  {
    path: 'topdestinations-leb',
    loadChildren: () => import('./modules/admin/topdestinations-leb/topdestinations-leb.module').then( m => m.TopdestinationsLebPageModule)
  },
  {
    path: 'packages',
    loadChildren: () => import('./modules/admin/packages/packages.module').then( m => m.PackagesPageModule)
  },
  {
    path: 'restaurants',
    loadChildren: () => import('./modules/admin/restaurants/restaurants.module').then( m => m.RestaurantsPageModule)
  },
  {
    path: 'transportations',
    loadChildren: () => import('./modules/admin/transportations/transportations.module').then( m => m.TransportationsPageModule)
  },
  {
    path: 'accomodations',
    loadChildren: () => import('./modules/admin/accomodations/accomodations.module').then( m => m.AccomodationsPageModule)
  },
  {
    path: 'activities',
    loadChildren: () => import('./modules/admin/activities/activities.module').then( m => m.ActivitiesPageModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('./modules/admin/chats/chats.module').then( m => m.ChatsPageModule),
    resolve:{
      userDataResolver:UserDataResolver
  },
  },
  {
    path: 'guider-detail',
    loadChildren: () => import('./modules/guider-detail/guider-detail.module').then( m => m.GuiderDetailPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./modules/admin/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'bookings',
    loadChildren: () => import('./modules/admin/bookings/bookings.module').then( m => m.BookingsPageModule),
    resolve:{
      user:UserDataResolver
  },
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
