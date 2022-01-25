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
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireModule} from '@angular/fire/compat';
import {ExternalRentalsComponent} from './pages/external-rentals/external-rentals.component';
import {StockService} from './stock.service';
import {WebcamService} from './webcam.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {DetailsComponent} from './pages/details/details.component';
import { OrderComponent } from './pages/order/order.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInPageComponent,
    ScanPageComponent,
    OverviewPageComponent,
    MaterialListPageComponent,
    ExternalRentalsComponent,
    DetailsComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    AngularFireModule.initializeApp(environment.firebaseConfig, 'Matraum App'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [
    AngularFirestore,
    AngularFireAuth,
    StockService,
    WebcamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
