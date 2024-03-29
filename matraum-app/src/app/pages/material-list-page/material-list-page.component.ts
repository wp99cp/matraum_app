import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {StockService} from '../../services/stock.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {first} from 'rxjs/operators';
import {ScannerComponent} from '../../components/scanner/scanner.component';
import {MatDialog} from '@angular/material/dialog';
import {DetailsComponent} from '../../components/details/details.component';
import {OrderComponent} from '../../components/order/order.component';


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
              private auth: AngularFireAuth,
              public dialog: MatDialog) {

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
      case 'enomine':
        this.stufenName = 'Enomine';
        break;
      case 'masada':
        this.stufenName = 'Masada';
        break;
      case 'nameless':
        this.stufenName = 'Nameless';
        break;
    }


  }

  async ngOnInit(): Promise<void> {

    // await authentication
    await this.auth.authState.pipe(first()).toPromise();

    this.db.doc('open_borrowings/' + this.name).snapshotChanges().subscribe(async ref => {

      this.materials = [];

      const data = ref.payload.data() as any;

      for (const id in data.materials) {

        if (!id) {
          continue;
        }

        const material = await this.stockService.getMaterialById(parseInt(id, 10));
        this.materials.push({
          name: material.material,
          amount: data.materials[id].amount,
          notes: data.materials[id].notes ? data.materials[id].notes : '',
          id
        });
        console.log(this.materials);
      }

    });

  }

  async openScanner(): Promise<void> {

    await this.dialog.open(ScannerComponent, {
      maxWidth: 'calc(100% - 10px)',
      position: {bottom: '10px'},
      data: {}
    }).afterClosed()
      .pipe(first())
      .toPromise();


  }


  public async openDetails(mat: any): Promise<void> {

    await this.dialog.open(DetailsComponent, {
      maxWidth: 'calc(100% - 10px)',
      position: {bottom: '10px'},
      data: {material: mat, amount: mat.amount}
    }).afterClosed()
      .pipe(first())
      .toPromise();

  }

  public async showOrder(): Promise<void> {

    await this.dialog.open(OrderComponent, {
      maxWidth: 'calc(100% - 10px)',
      position: {bottom: '10px'},
      data: {}
    }).afterClosed()
      .pipe(first())
      .toPromise();


  }
}
