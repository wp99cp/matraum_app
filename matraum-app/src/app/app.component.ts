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

    // settings for the getUserMedia call
    const constraints = {
      audio: false,
      video: {
        // the browser will try to honor this resolution, but it may end up being lower.
        facingMode: 'environment',
        width: {min: 100, ideal: 320, max: 500},
        height: {min: 100, ideal: 320, max: 500}
      }
    };

    navigator.mediaDevices.getUserMedia(constraints);

  }

}
