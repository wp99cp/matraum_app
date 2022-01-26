import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignInPageComponent} from './pages/sign-in-page/sign-in-page.component';
import {ScannerComponent} from './components/scanner/scanner.component';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {MaterialListPageComponent} from './pages/material-list-page/material-list-page.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AngularFireAuth, AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR} from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreModule,
  USE_EMULATOR as USE_FIRESTORE_EMULATOR
} from '@angular/fire/compat/firestore';
import {AngularFireModule} from '@angular/fire/compat';
import {ExternalRentalsPageComponent} from './pages/external-rentals-page/external-rentals-page.component';
import {StockService} from './services/stock.service';
import {WebcamService} from './services/webcam.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {DetailsComponent} from './components/details/details.component';
import {OrderComponent} from './components/order/order.component';
import {USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from '@angular/fire/compat/functions';
import {GoogleSignInButtonComponent} from './components/google-sign-in-button/google-sign-in-button.component';
import {BackgroundComponent} from './components/background/background.component';
import {ButtonModule} from './modules/button/button.module';


@NgModule({

  providers: [
    AngularFirestore,
    AngularFireAuth,
    StockService,
    WebcamService,
    {provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:9099'] : undefined},
    {provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined},
    {provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5001] : undefined},
  ],
  declarations: [
    AppComponent,
    SignInPageComponent,
    ScannerComponent,
    OverviewPageComponent,
    MaterialListPageComponent,
    ExternalRentalsPageComponent,
    DetailsComponent,
    OrderComponent,
    GoogleSignInButtonComponent,
    BackgroundComponent
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
    MatIconModule,
    ButtonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
