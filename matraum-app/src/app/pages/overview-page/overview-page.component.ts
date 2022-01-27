import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.sass']
})
export class OverviewPageComponent {

  constructor(public fireAuth: AngularFireAuth, private router: Router) {
  }

  async signOut(): Promise<void> {
    await this.fireAuth.signOut();
    await this.router.navigate(['..']);
  }

}
