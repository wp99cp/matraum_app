import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {SettingsPageComponent} from './pages/settings/settings-page.component';
import {DetailsPageComponent} from './pages/details/details-page.component';
import {SettingsSpatzPageComponent} from './pages/settings-spatz-page/settings-spatz-page.component';
import {CheckPageComponent} from './pages/check-page/check-page.component';
import {CriterionDetailsPageComponent} from './pages/criterion-details-page/criterion-details-page.component';

const routes: Routes = [

  {
    path: '',
    component: OverviewPageComponent
  },
  {
    path: 'einstellungen',
    component: SettingsPageComponent
  },
  {
    path: 'einstellungen/:uuid',
    component: CriterionDetailsPageComponent
  },
  {
    path: ':uuid',
    component: DetailsPageComponent
  },
  {
    path: ':uuid/settings',
    component: SettingsSpatzPageComponent
  },
  {
    path: ':uuid/check',
    component: CheckPageComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpatzenRoutingModule {
}
