import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Criterion} from './criterion';

export class Spatz {

  private _name: string;
  private _description: string;
  private _state: { refUuid: string, checked: boolean, note: string }[];


  // tslint:disable-next-line:variable-name
  constructor(data: any, private db: AngularFirestore, private _uuid?) {

    this._name = data?.name;
    this._state = data?.state ? data?.state : [];
    this._description = data?.description ? data.description : '';

  }

  exportData(): any {
    return {
      name: this.name,
      description: this.description,
      state: this._state
    };
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
    this.save();
  }

  get state(): { refUuid: string, checked: boolean, note: string }[] {
    return this._state;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
    this.save();
  }


  get uuid(): string {
    return this._uuid;
  }

  public checkIfBroken(criteria: Criterion[]): boolean {

    const presentUUId = this.state
      .filter(criterion => criterion.checked)
      .map(criterion => criterion.refUuid);

    return !criteria.every(criterion => presentUUId.includes(criterion.uuid));

  }

  public save(): void {

    if (this.uuid) {
      this.db.doc('spatzen/' + this.uuid)
        .update(this.exportData());
    } else {
      this.db.collection('spatzen')
        .add(this.exportData())
        .then(id => this._uuid = id);
    }
  }

  public delete(): Promise<void> {
    return this.db.doc('spatzen/' + this.uuid).delete();
  }

  getState(criterion: Criterion): { refUuid: string, checked: boolean, note: string } {

    const response = this.state.filter(cr => cr.refUuid === criterion.uuid)[0];
    return response ? response : {refUuid: criterion.uuid, checked: false, note: 'Noch nicht geprüft!'};

  }

  setCriterion(criterion: Criterion, state: boolean, note: string = ''): void {

    const includes = this._state.map(cr => cr.refUuid).includes(criterion.uuid);

    if (!includes) {
      this._state.push({
        refUuid: criterion.uuid,
        checked: state,
        note
      });
    } else {

      const element = this._state.filter(cr => cr.refUuid === criterion.uuid)[0];
      element.checked = state;
      element.note = note;

    }

    this.save();

  }

  clearState(): void {
    this._state = [];
    this.save();
  }
}
