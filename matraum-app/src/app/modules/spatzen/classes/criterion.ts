import {AngularFirestore} from '@angular/fire/compat/firestore';

export class Criterion {

  private _name: string;
  private _description: string;

  // tslint:disable-next-line:variable-name
  constructor(data: any, private db: AngularFirestore, private _uuid?) {

    this._name = data?.name;
    this._description = data?.description ? data.description : '';

  }

  exportData(): any {
    return {
      name: this.name,
      description: this.description
    };
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
    this.save();
  }

  set name(value: string) {
    this._name = value;
    this.save();
  }

  get uuid(): string {
    return this._uuid;
  }


  public save(): void {

    if (this.uuid) {
      this.db.doc('spatzen_criteria/' + this.uuid)
        .update(this.exportData());
    } else {
      this.db.collection('spatzen_criteria')
        .add(this.exportData())
        .then(id => this._uuid = id);
    }
  }

  public delete(): Promise<void> {
    return this.db.doc('spatzen_criteria/' + this.uuid).delete();
  }

}
