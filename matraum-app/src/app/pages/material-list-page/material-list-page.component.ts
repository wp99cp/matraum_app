import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-material-list-page',
  templateUrl: './material-list-page.component.html',
  styleUrls: ['./material-list-page.component.sass']
})
export class MaterialListPageComponent implements OnInit {

  public stufenName: string;
  public materials: any[] = [];
  private name: string;

  constructor(private router: Router, private db: AngularFirestore) {

    // set name
    const name = this.router.url.split('/')[2];
    this.name = name;

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

    this.db.doc('open_borrowings/' + this.name).get().subscribe(ref => {

      for (const id in ref.data().materials) {
        this.db.doc('stock/' + id).get().subscribe(ref2 => {
          this.materials.push({
            name: ref2.data().material,
            amount: ref.data().materials[id].amount
          });
          console.log(this.materials)
        });
      }

    });

  }

}
