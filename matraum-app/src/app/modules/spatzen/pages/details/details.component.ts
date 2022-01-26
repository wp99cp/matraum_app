import {Component} from '@angular/core';
import {SpatzenService} from '../../services/spatzen.service';
import {mergeMap, Observable, take} from 'rxjs';
import {Spatz} from '../../classes/spatz';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent {

  public spatz: Observable<Spatz>;

  constructor(route: ActivatedRoute, private spatzService: SpatzenService) {
    this.spatz = route.url.pipe(mergeMap(url => this.spatzService.getSpatz(url[0].path)));
  }

  public delete(): void {
    this.spatz.pipe(take(1)).subscribe(spatz => spatz.delete());
  }
}
