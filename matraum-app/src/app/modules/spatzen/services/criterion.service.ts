import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Criterion} from '../classes/criterion';

@Injectable({
  providedIn: 'root'
})
export class CriterionService {

  private readonly criteria = new Observable<Criterion[]>();

  constructor(private db: AngularFirestore) {
    this.criteria = this.db.collection('spatzen_criteria')
      .snapshotChanges()
      .pipe(map(docs =>
        docs.map(doc => new Criterion(doc.payload.doc.data(), this.db, doc.payload.doc.id))
      ));
  }

  public getCriteria(): Observable<Criterion[]> {
    return this.criteria;
  }

  public getCriterion(uuid: string): Observable<Criterion> {
    return this.db.doc('spatzen_criteria/' + uuid).snapshotChanges()
      .pipe(map(doc => new Criterion(doc.payload.data(), this.db, doc.payload.id)));

  }


  public addCriterion(): void {
    const criterion = new Criterion({name: 'flying sparrows', description: 'Sparrows should always fly!'}, this.db);
    criterion.save();
  }
}
