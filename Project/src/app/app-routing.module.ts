import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserDataResolver } from './app.resolver';
import { ProfileResolver } from './modules/auth/user-profile/profile.resolver';
import { AuthGuard } from './permissions.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full'
  },
  // {
  //   path: '**',
  //   redirectTo: 'loader',
  //   pathMatch: 'full'
  // },
  {
    path: 'home',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule),
    canActivate: [AuthGuard],
    resolve: {
      userDataResolver: UserDataResolver
    }
  },
  {
    path: 'user-profile/:id',
    loadChildren: () => import('./modules/auth/user-profile/user-profile.module').then(m => m.UserProfilePageModule),
    canActivate: [AuthGuard],
    resolve: {
      profileResolver: ProfileResolver,
      userDataResolver: UserDataResolver
    }
  },
  // Add AuthGuard to other protected routes
  {
    path: 'chats',
    loadChildren: () => import('./modules/admin/chats/chats.module').then(m => m.ChatsPageModule),
    canActivate: [AuthGuard],
    resolve: {
      userDataResolver: UserDataResolver
    }
  },
  {
    path: 'bookings',
    loadChildren: () => import('./modules/admin/bookings/bookings.module').then(m => m.BookingsPageModule),
    canActivate: [AuthGuard],
    resolve: {
      user: UserDataResolver
    }
  },
  {
    path: 'loader',
    loadChildren: () => import('./modules/auth/loader/loader.module').then(m => m.LoaderPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./modules/auth/sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./modules/auth/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'forgot-pass',
    loadChildren: () => import('./modules/auth/forgot-pass/forgot-pass.module').then(m => m.ForgotPassPageModule)
  },
  {
    path: 'top-destinations',
    loadChildren: () => import('./modules/admin/top-destinations/top-destinations.module').then(m => m.TopDestinationsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'topdestinations-leb',
    loadChildren: () => import('./modules/admin/topdestinations-leb/topdestinations-leb.module').then(m => m.TopdestinationsLebPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'packages',
    loadChildren: () => import('./modules/admin/packages/packages.module').then(m => m.PackagesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'restaurants',
    loadChildren: () => import('./modules/admin/restaurants/restaurants.module').then(m => m.RestaurantsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'transportations',
    loadChildren: () => import('./modules/admin/transportations/transportations.module').then(m => m.TransportationsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'accommodations',
    loadChildren: () => import('./modules/admin/accomodations/accomodations.module').then(m => m.AccomodationsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'activities',
    loadChildren: () => import('./modules/admin/activities/activities.module').then(m => m.ActivitiesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'favorites',
    loadChildren: () => import('./modules/admin/favorites/favorites.module').then(m => m.FavoritesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'guider',
    loadChildren: () => import('./modules/admin/guider/guider.module').then(m => m.GuiderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'image-location-detector',
    loadChildren: () => import('./modules/admin/image-location-detector/image-location-detector.module').then(m => m.ImageLocationDetectorPageModule),
    canActivate: [AuthGuard]
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
