import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit, OnDestroy {

  private removed = false;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { material: any, amount: number },
    private db: AngularFirestore) {

  }

  ngOnInit(): void {
  }

  public async ngOnDestroy(): Promise<void> {

    const name = this.router.url.split('/')[2];

    if (this.removed) {
      return;
    }

    await this.db.doc('open_borrowings/' + name).update({
      [`materials.${this.data.material.id}.notes`]: (document.getElementById('notiz') as HTMLInputElement).value
    });

  }

  public async removeEntry(): Promise<void> {

    this.removed = true;

    const name = this.router.url.split('/')[2];

    this.db.doc('open_borrowings/' + name).get().subscribe(ref => {

      const mats = (ref.data() as any).materials;
      delete mats[this.data.material.id];

      this.db.doc('open_borrowings/' + name).update({
        materials: mats
      });

    });


  }

}
