import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {DetailsComponent} from './pages/details/details.component';

const routes: Routes = [

  {
    path: '',
    component: OverviewPageComponent
  },
  {
    path: 'einstellungen',
    component: SettingsComponent
  },
  {
    path: ':uuid',
    component: DetailsComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpatzenRoutingModule {
}
