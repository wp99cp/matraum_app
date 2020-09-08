import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.sass']
})
export class OverviewPageComponent implements OnInit {

  constructor(public fireAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }

  signOut(){

    this.fireAuth.signOut();
    this.router.navigate(['..']);


  }

}
