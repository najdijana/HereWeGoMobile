import { Injectable, Self } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.interface';
import { AbstractFirestoreDocResolver } from 'src/app/shared/services/abstracts/AbstractFirestoreDocResolver';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable()
export class ProfileResolver extends AbstractFirestoreDocResolver<User> {

  constructor(route: ActivatedRoute, router: Router, @Self() service: UserService) {
    super(router, service);
  }
}

