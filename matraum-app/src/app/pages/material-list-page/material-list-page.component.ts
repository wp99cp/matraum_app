import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {StockService} from '../../stock.service';
import {AngularFireAuth} from "@angular/fire/auth";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-material-list-page',
  templateUrl: './material-list-page.component.html',
  styleUrls: ['./material-list-page.component.sass']
})
export class MaterialListPageComponent implements OnInit {

  public stufenName: string;
  public materials: any[] = [];
  private name: string;

  constructor(private router: Router,
              private db: AngularFirestore,
              private stockService: StockService,
              private auth: AngularFireAuth) {

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

   async ngOnInit(): Promise<void> {

    // await authentication
     await this.auth.authState.pipe(first()).toPromise();

     this.db.doc('open_borrowings/' + this.name).get().subscribe(ref => {

       for (const id in ref.data().materials) {

         this.stockService.getMaterialById(parseInt(id, 10)).then(ref2 => {
           this.materials.push({
             name: ref2.material,
             amount: ref.data().materials[id].amount
           });
           console.log(this.materials);
         });
       }

     });

   }

}
