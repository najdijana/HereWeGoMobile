import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
   path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./modules/admin/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'loader',
    loadChildren: () => import('./modules/admin/loader/loader.module').then( m => m.LoaderPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./modules/admin/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./modules/admin/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'forgot-pass',
    loadChildren: () => import('./modules/admin/forgot-pass/forgot-pass.module').then( m => m.ForgotPassPageModule)
  },
  {
    path: 'packages',
    loadChildren: () => import('./modules/admin/packages/packages.module').then( m => m.PackagesPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
