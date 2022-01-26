import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonListComponent} from './components/button-list/button-list.component';
import {ButtonComponent} from './components/button/button.component';


@NgModule({
  declarations: [
    ButtonListComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonListComponent,
    ButtonComponent
  ],
})
export class ButtonModule {
}
