import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { ScanPageComponent } from './pages/scan-page/scan-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInPageComponent,
    ScanPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
