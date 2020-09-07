import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-material-list-page',
  templateUrl: './material-list-page.component.html',
  styleUrls: ['./material-list-page.component.sass']
})
export class MaterialListPageComponent implements OnInit {

  public stufenName: string;

  constructor(private router: Router) {

    // set name
    const name = this.router.url.split('/')[2];
    switch (name) {
      case 'sinai':
        this.stufenName = 'Sinai';
        break;
      case 'froeschli':
        this.stufenName = 'Fröschli';
        break;
      case 'amos':
        this.stufenName = 'Amos';
        break;
      case 'esperia':
        this.stufenName = 'Esperia';
        break;
      case 'nameless':
        this.stufenName = 'Nameless';
        break;
    }


  }

  ngOnInit(): void {
  }

}
