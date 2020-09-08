import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInPageComponent} from './pages/sign-in-page/sign-in-page.component';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {MaterialListPageComponent} from './pages/material-list-page/material-list-page.component';
import {ScanPageComponent} from "./pages/scan-page/scan-page.component";

const routes: Routes = [

  {
    path: '',
    component: SignInPageComponent

  },
  {
    path: 'overview-page',
    component: OverviewPageComponent
  },
  {
    path: 'material/:stufe',
    component: MaterialListPageComponent
  },
  {
    path: 'material/:stufe/scan-page/:action',
    component: ScanPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
