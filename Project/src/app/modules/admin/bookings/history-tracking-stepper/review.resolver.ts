import { Injectable, Self } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ReviewService } from '../tracking-trip-stepper/reviews.service';
import { Review } from 'src/app/shared/models/review.interface';
import { AbstractFirestoreDocResolver } from 'src/app/shared/services/abstracts/AbstractFirestoreDocResolver';

@Injectable()
export class ReviewResolver extends AbstractFirestoreDocResolver<Review> {

    constructor(route: ActivatedRoute, router: Router, @Self() service: ReviewService) {
      super(router, service);
    }
}
