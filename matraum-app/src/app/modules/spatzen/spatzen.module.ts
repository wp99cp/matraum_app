import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SpatzenRoutingModule} from './spatzen-routing.module';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {ButtonModule} from '../button/button.module';
import { SettingsComponent } from './pages/settings/settings.component';
import { DetailsComponent } from './pages/details/details.component';


@NgModule({
  declarations: [
    OverviewPageComponent,
    SettingsComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    SpatzenRoutingModule,
    ButtonModule
  ]
})
export class SpatzenModule {
}
