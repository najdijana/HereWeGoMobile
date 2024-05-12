import { Injectable, Self } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { AbstractFirestoreDocResolver } from 'src/app/shared/services/abstracts/AbstractFirestoreDocResolver';
import { Packages } from 'src/app/shared/models/packages.interface';
import { PackageService } from '../Services/packages.service';

@Injectable()
export class PackageResolver extends AbstractFirestoreDocResolver<Packages> {

  constructor(route: ActivatedRoute, router: Router, @Self() service: PackageService) {
    super(router, service);
  }
}

