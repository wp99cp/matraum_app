import {Component} from '@angular/core';
import {SpatzenService} from '../../services/spatzen.service';
import {ActivatedRoute} from '@angular/router';
import {SingleSpatzPage} from '../single-spatz-page';
import {CriterionService} from '../../services/criterion.service';
import {Observable, take} from 'rxjs';
import {Criterion} from '../../classes/criterion';


@Component({
  selector: 'app-details',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsPageComponent extends SingleSpatzPage {

  public criteria: Observable<Criterion[]>;

  constructor(route: ActivatedRoute, spatzService: SpatzenService, criterionService: CriterionService) {
    super(route, spatzService);

    this.criteria = criterionService.getCriteria();

  }

  checked(criterion: Criterion, checked: boolean): void {

    this.spatz
      .pipe(take(1))
      .subscribe(spatz => spatz.setCriterion(criterion, checked));

  }

}
