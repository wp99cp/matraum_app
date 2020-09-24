import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignInPageComponent} from './pages/sign-in-page/sign-in-page.component';
import {ScanPageComponent} from './pages/scan-page/scan-page.component';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {MaterialListPageComponent} from './pages/material-list-page/material-list-page.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { ExternalRentalsComponent } from './pages/external-rentals/external-rentals.component';
import {StockService} from './stock.service';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    SignInPageComponent,
    ScanPageComponent,
    OverviewPageComponent,
    MaterialListPageComponent,
    ExternalRentalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebaseConfig, 'Matraum App'),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [
    AngularFirestore,
    AngularFireAuth,
    StockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
