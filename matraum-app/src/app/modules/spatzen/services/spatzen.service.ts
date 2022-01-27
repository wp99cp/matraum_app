import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {Spatz} from '../classes/spatz';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SpatzenService {

  private readonly spatzen = new Observable<Spatz[]>();

  constructor(private db: AngularFirestore) {
    this.spatzen = this.db.collection('spatzen')
      .snapshotChanges()
      .pipe(map(docs =>
        docs.map(doc => new Spatz(doc.payload.doc.data(), this.db, doc.payload.doc.id))
      ));
  }

  public getSpatzen(): Observable<Spatz[]> {
    return this.spatzen;
  }

  public getSpatz(uuid: string): Observable<Spatz> {
    return this.db.doc('spatzen/' + uuid).snapshotChanges()
      .pipe(map(doc => new Spatz(doc.payload.data(), this.db, doc.payload.id)));
  }

  public addSpatz(): void {
    const newSpatz = new Spatz({name: 'sparrow'}, this.db);
    newSpatz.save();
  }

}
