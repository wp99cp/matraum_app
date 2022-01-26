import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInPageComponent} from './pages/sign-in-page/sign-in-page.component';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {MaterialListPageComponent} from './pages/material-list-page/material-list-page.component';

import {ExternalRentalsPageComponent} from './pages/external-rentals-page/external-rentals-page.component';
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['overview-page']);

const routes: Routes = [

  {
    path: '',
    component: SignInPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectLoggedInToItems}
  },
  {
    path: 'overview-page',
    component: OverviewPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'material/:stufe',
    component: MaterialListPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'material/extern/rentals',
    component: ExternalRentalsPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'spatzen',
    loadChildren: () => import('./modules/spatzen/spatzen.module').then(m => m.SpatzenModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
