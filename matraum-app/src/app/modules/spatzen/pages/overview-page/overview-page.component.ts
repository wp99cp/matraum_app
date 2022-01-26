import {Component, OnInit} from '@angular/core';
import {SpatzenService} from '../../services/spatzen.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.sass']
})
export class OverviewPageComponent implements OnInit {

  constructor(public spatzenService: SpatzenService) {
  }

  ngOnInit(): void {
  }

}
