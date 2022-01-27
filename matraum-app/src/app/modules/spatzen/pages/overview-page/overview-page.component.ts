import {Component, OnInit} from '@angular/core';
import {SpatzenService} from '../../services/spatzen.service';
import {Observable} from 'rxjs';
import {Criterion} from '../../classes/criterion';
import {CriterionService} from '../../services/criterion.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.sass']
})
export class OverviewPageComponent implements OnInit {

  public criteria: Observable<Criterion[]>;

  constructor(public spatzenService: SpatzenService, criterionService: CriterionService) {

    this.criteria = criterionService.getCriteria();

  }

  ngOnInit(): void {
  }

}
