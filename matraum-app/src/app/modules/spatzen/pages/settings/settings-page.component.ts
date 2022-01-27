import {Component, OnInit} from '@angular/core';
import {CriterionService} from '../../services/criterion.service';
import {Observable} from 'rxjs';
import {Criterion} from '../../classes/criterion';

@Component({
  selector: 'app-settings',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsPageComponent implements OnInit {

  public criteria: Observable<Criterion[]>;

  constructor(private criterionService: CriterionService) {
    this.criteria = criterionService.getCriteria();
  }

  ngOnInit(): void {
  }

  newCriterion(): void {
    this.criterionService.addCriterion();
  }
}
