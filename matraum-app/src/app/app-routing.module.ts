import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInPageComponent} from './pages/sign-in-page/sign-in-page.component';
import {ScanPageComponent} from './pages/scan-page/scan-page.component';

const routes: Routes = [

  {
    path: '',
    component: SignInPageComponent

  },

  {
    path: 'overview-page',
    component: ScanPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
