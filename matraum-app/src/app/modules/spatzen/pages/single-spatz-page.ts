import {mergeMap, Observable} from 'rxjs';
import {Spatz} from '../classes/spatz';
import {ActivatedRoute} from '@angular/router';
import {SpatzenService} from '../services/spatzen.service';

export abstract class SingleSpatzPage {

  public spatz: Observable<Spatz>;

  protected constructor(route: ActivatedRoute, protected spatzService: SpatzenService) {
    this.spatz = route.url
      .pipe(mergeMap(url => this.spatzService.getSpatz(url[0].path)));
  }

}
