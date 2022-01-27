import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {mergeMap, Observable, take} from 'rxjs';
import {CriterionService} from '../../services/criterion.service';
import {Criterion} from '../../classes/criterion';

@Component({
  selector: 'app-criterion-details-page',
  templateUrl: './criterion-details-page.component.html',
  styleUrls: ['./criterion-details-page.component.sass']
})
export class CriterionDetailsPageComponent {

  public criterion: Observable<Criterion>;
  public formControl = new FormGroup({
    name: new FormControl(),
    description: new FormControl()
  });

  constructor(route: ActivatedRoute, criterionService: CriterionService) {

    this.criterion = route.url
      .pipe(mergeMap(url => criterionService.getCriterion(url[1].path)));

    this.criterion
      .pipe(take(1))
      .subscribe(criterion =>
        this.formControl.setValue({
          name: criterion.name,
          description: criterion.description
        }));

  }

  public delete(): void {
    this.criterion
      .pipe(take(1))
      .subscribe(spatz => spatz.delete());
  }

  save(): void {

    this.criterion
      .pipe(take(1))
      .subscribe(spatz => {
        spatz.name = this.formControl.get('name').value;
        spatz.description = this.formControl.get('description').value;
      });

  }


}
