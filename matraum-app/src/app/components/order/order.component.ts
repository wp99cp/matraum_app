import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  public order: Observable<any>;


  constructor(private db: AngularFirestore, private router: Router,
  ) {

    const name = this.router.url.split('/')[2];

    this.order = db.doc('newest_orders/' + name).get();


  }

  ngOnInit(): void {

  }


}
