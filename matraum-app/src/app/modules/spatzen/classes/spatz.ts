import {AngularFirestore} from '@angular/fire/compat/firestore';

export class Spatz {


  private _name;
  private _isBroken = false;

  // tslint:disable-next-line:variable-name
  constructor(data: any, private db: AngularFirestore, private _uuid?) {

    this._name = data?.name;
    this._isBroken = !!data?.isBroken;

  }

  exportData(): any {
    return {
      name: this.name,
      isBroken: this.isBroken
    };
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
    this.save();
  }

  get uuid(): string {
    return this._uuid;
  }

  get isBroken(): boolean {
    return this._isBroken;
  }

  set isBroken(value: boolean) {
    this._isBroken = value;
    this.save();
  }

  public save(): void {

    this.db.collection('spatzen')
      .add(this.exportData())
      .then(id => this._uuid = id);

  }

  public delete(): Promise<void> {
    return this.db.doc('spatzen/' + this.uuid).delete();
  }

}
