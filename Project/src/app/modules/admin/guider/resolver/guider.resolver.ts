import { Injectable, Self } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Guiders } from 'src/app/shared/models/guiders.interface';
import { AbstractFirestoreDocResolver } from 'src/app/shared/services/abstracts/AbstractFirestoreDocResolver';
import { GuiderService } from '../service/guider.service';
import { Observable, forkJoin } from 'rxjs';
import { Packages } from 'src/app/shared/models/packages.interface';
import { collection, collectionData, doc, docData } from '@angular/fire/firestore';

@Injectable()
export class GuiderResolver extends AbstractFirestoreDocResolver<Guiders> {

  constructor(route: ActivatedRoute, router: Router, @Self() service: GuiderService) {
    super(router, service);
  }

}

