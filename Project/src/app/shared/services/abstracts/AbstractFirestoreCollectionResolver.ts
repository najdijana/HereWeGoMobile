import { QueryFn } from '@angular/fire/compat/firestore';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { AbstractFirestoreService } from '../abstracts/AbstractFirestoreService';
import { isNull, isUndefined } from 'lodash-es';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ParentPathBuilder {
  paramKey?: string;
  path?: string;
  deep?: number;
}

export abstract class AbstractFirestoreCollectionResolver<T> implements Resolve<T> {

  queryFn?: QueryFn;
  parentPathBuilderArray: ParentPathBuilder[];

  protected constructor(private router: Router,
                        private service: AbstractFirestoreService<T>) {
  }

  getDeepParentParams(route: ActivatedRouteSnapshot, deep: number) {
    switch (deep) {
      case 1:
        return route?.parent?.params;
      case 2:
        return route?.parent?.parent?.params;
      case 3:
        return route?.parent?.parent?.parent?.params;
      case 4:
        return route?.parent?.parent?.parent?.parent?.params;
      default:
        return route?.params;
    }
  }

  buildParentPath(route: ActivatedRouteSnapshot): any {
    console.log('buildParentPath 1 --> ', route.params);
    console.log('buildParentPath 2 --> ', route.parent.params);
    // console.log('buildParentPath 3 --> ', route.parent.parent.params);
    // console.log('buildParentPath 4 --> ', route.parent.parent.parent.params);
    if (this.parentPathBuilderArray?.length && this.parentPathBuilderArray?.length % 2 === 0) {
      console.log('parentPathBuilderArray', this.parentPathBuilderArray);
      const parentPath: string[] = this.parentPathBuilderArray.map(item => item?.paramKey ? item?.deep ? this.getDeepParentParams(route, item?.deep)[item.paramKey] : route.params[item.paramKey] : item?.path);
      if (parentPath.filter(item => isUndefined(item) || isNull(item))?.length > 0) {
        console.log('parentPath contains undefined or null');
        return;
      }
      console.log('parentPath step 1', parentPath);
      const parentPath2 = parentPath.join('/');
      console.log('parentPath step 2', parentPath2);
      return parentPath2;
    }
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<T> | T {
    console.log('Resolver is running for ' + this.service.COLLECTION);

    const parentPath: string = this.buildParentPath(route);
    console.log('parent path in final stage', parentPath);
    if (parentPath) {
      console.log('parent path in final stage is ok');
      this.service.parentPath = parentPath;
    }

    return new Promise((resolve, reject) => {
      firstValueFrom(
        this.service
          .collection(this.queryFn)
          .get()
          .pipe(map(doc => doc?.docs.map(doc => doc?.data()) as T), catchError((error) => {

            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            this.router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(error);
          })))
        .then((doc) => {
          console.log('doc found in firestore', doc);
          this.service.selected = doc;
          return resolve(doc);
        })
        .catch(err => {
          console.error('Error while fetching the collection --> ', this.service?.COLLECTION, err);
          // this.router.navigate(['immobilien']);
          // todo: go to error page
          this.router.navigate(['']);
          return reject();
        });
    });
  }
}
