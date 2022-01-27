import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SpatzenRoutingModule} from './spatzen-routing.module';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {ButtonModule} from '../button/button.module';
import {SettingsPageComponent} from './pages/settings/settings-page.component';
import {DetailsPageComponent} from './pages/details/details-page.component';
import {SettingsSpatzPageComponent} from './pages/settings-spatz-page/settings-spatz-page.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CheckPageComponent } from './pages/check-page/check-page.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CriterionDetailsPageComponent } from './pages/criterion-details-page/criterion-details-page.component';

@NgModule({
  declarations: [
    OverviewPageComponent,
    SettingsPageComponent,
    DetailsPageComponent,
    SettingsSpatzPageComponent,
    CheckPageComponent,
    CriterionDetailsPageComponent
  ],
  imports: [
    CommonModule,
    SpatzenRoutingModule,
    ButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ]
})
export class SpatzenModule {
}
