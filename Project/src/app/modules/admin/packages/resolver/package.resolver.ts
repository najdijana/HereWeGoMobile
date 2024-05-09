import { Injectable, Self } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { PackageService } from '../services/packages.service';
import { AbstractFirestoreDocResolver } from 'src/app/shared/services/abstracts/AbstractFirestoreDocResolver';
import { Packages } from 'src/app/shared/models/packages.interface';

@Injectable()
export class PackageResolver extends AbstractFirestoreDocResolver<Packages> {

  constructor(route: ActivatedRoute, router: Router, @Self() service: PackageService) {
    super(router, service);
  }
}

