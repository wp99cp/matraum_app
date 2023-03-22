import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.sass']
})
export class SignInPageComponent {

  constructor(public fireAuth: AngularFireAuth) {
  }


  async signIn(): Promise<void> {
    this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch(console.error);
  }

}
