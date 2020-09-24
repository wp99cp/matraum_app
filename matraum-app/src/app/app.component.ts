import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  // the AngularFireAuth Service is needed, to ensure that the user is signed in
  constructor(fireAuth: AngularFireAuth) {


  }

}
