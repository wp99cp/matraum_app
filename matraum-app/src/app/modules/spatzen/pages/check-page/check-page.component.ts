import {Component, OnInit} from '@angular/core';
import {SingleSpatzPage} from '../single-spatz-page';
import {ActivatedRoute, Router} from '@angular/router';
import {SpatzenService} from '../../services/spatzen.service';
import {CriterionService} from '../../services/criterion.service';
import {take} from 'rxjs';
import {Criterion} from '../../classes/criterion';
import {Spatz} from '../../classes/spatz';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-check-page',
  templateUrl: './check-page.component.html',
  styleUrls: ['./check-page.component.sass']
})
export class CheckPageComponent extends SingleSpatzPage implements OnInit {

  public criteria: Criterion[];
  public criterionIndex = 0;

  public formControl = new FormGroup({
    notes: new FormControl(),
  });


  constructor(private route: ActivatedRoute,
              spatzService: SpatzenService,
              criterionService: CriterionService,
              private router: Router) {

    super(route, spatzService);

    this.spatz
      .pipe(take(1))
      .subscribe((spatz: Spatz) => spatz.clearState());

    criterionService.getCriteria()
      .pipe(take(1))
      .subscribe(criteria => {
        this.criteria = criteria;
      });

  }

  ngOnInit(): void {
  }

  nextCriterion(isOK: boolean): void {


    this.spatz
      .pipe(take(1))
      .subscribe(spatz => {
        spatz.setCriterion(this.criteria[this.criterionIndex], isOK, this.formControl.get('notes').value);

        this.criterionIndex++;

        this.formControl.setValue({notes: ''});

        if (this.criterionIndex >= this.criteria?.length) {
          this.router.navigate(['..'], {relativeTo: this.route});
        }
      });

  }
}
