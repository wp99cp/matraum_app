import {Component} from '@angular/core';
import {take} from 'rxjs';
import {SingleSpatzPage} from '../single-spatz-page';
import {ActivatedRoute} from '@angular/router';
import {SpatzenService} from '../../services/spatzen.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-settings-spatz-page',
  templateUrl: './settings-spatz-page.component.html',
  styleUrls: ['./settings-spatz-page.component.sass']
})
export class SettingsSpatzPageComponent extends SingleSpatzPage {

  public formControl = new FormGroup({
    name: new FormControl(),
    description: new FormControl()
  });

  constructor(route: ActivatedRoute, spatzService: SpatzenService) {
    super(route, spatzService);

    this.spatz
      .pipe(take(1))
      .subscribe(spatz =>
        this.formControl.setValue({
          name: spatz.name,
          description: spatz.description
        }));

  }

  public delete(): void {
    this.spatz
      .pipe(take(1))
      .subscribe(spatz => spatz.delete());
  }

  save(): void {

    this.spatz
      .pipe(take(1))
      .subscribe(spatz => {
        spatz.name = this.formControl.get('name').value;
        spatz.description = this.formControl.get('description').value;
      });

  }
}
