import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInPageComponent} from './pages/sign-in-page/sign-in-page.component';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {MaterialListPageComponent} from './pages/material-list-page/material-list-page.component';
import {ExternalRentalsComponent} from './pages/external-rentals/external-rentals.component';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);

const routes: Routes = [

  {
    path: '',
    component: SignInPageComponent

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
    component: ExternalRentalsComponent,
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
