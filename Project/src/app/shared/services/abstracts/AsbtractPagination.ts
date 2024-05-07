import { AngularFirestoreCollection, Query, QueryFn } from '@angular/fire/compat/firestore';
import { AbstractFirestoreService } from './AbstractFirestoreService';
import { BehaviorSubject, Observable, scan, take, tap } from 'rxjs';
import { finalize } from 'rxjs/operators';


// Options to reproduce firestore queries consistently
interface QueryConfig {
  limit?: number, // limit per query
  reverse?: boolean, // reverse order?
  prepend?: boolean // prepend to source?
  queryFn?: QueryFn
}

export abstract class AbstractPaginationService<T> {

  // Observable data
  data: Observable<any>;
  // Source data
  private _done = new BehaviorSubject(false);
  done: Observable<boolean> = this._done.asObservable();
  private _loading = new BehaviorSubject(false);
  loading: Observable<boolean> = this._loading.asObservable();
  private _data = new BehaviorSubject([]);
  private _initialLoad = new BehaviorSubject(true);
  initialLoad: Observable<boolean> = this._initialLoad.asObservable();
  private query: QueryConfig;

  constructor(private service: AbstractFirestoreService<T>) {
  }

  // Initial query sets options and defines the Observable
  init(limit: number, queryFn?: QueryFn) {
    this.query = {
      limit,
      reverse: false,
      prepend: false,
      queryFn
    };

    this.mapAndUpdate(this.service.collection(ref => {
      if (queryFn) {
        return queryFn(ref).limit(this.query.limit);
      }
      return ref;
    }));

    // Create the observable array for consumption in components
    this.data = this._data
      .asObservable()
      .pipe(scan((acc, val) => {
        return this.query.prepend ? val.concat(acc) : acc.concat(val);
      }));
  }


  // Retrieves additional data from firestore
  more() {

    if (this._done.value) {
      console.log('done no more loading');
      return;
    }

    const cursor = this.getCursor();

    const more = this.service.collection(ref => {

      if (this.query?.queryFn) {
        return this.query.queryFn(ref).limit(this.query.limit).startAfter(cursor);
      }

      let query: Query = ref;
      query = query.limit(this.query.limit).startAfter(cursor);
      return query;
    });

    // const more = this.afs.collection(this.query.path, ref => {
    //   return ref
    //     .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
    //     .limit(this.query.limit)
    //     .startAfter(cursor);
    // });
    this.mapAndUpdate(more);
  }

  // Reset the page
  reset() {
    this._initialLoad.next(true);
    this._data.next([]);
    this._done.next(false);
  }

  // Determines the doc snapshot to paginate query
  private getCursor() {
    const current = this._data.value;
    if (current.length) {
      return this.query.prepend ? current[0].doc : current[current.length - 1].doc;
    }
    return null;
  }

  // Maps the snapshot to usable format the updates source
  private mapAndUpdate(col: AngularFirestoreCollection<T>) {

    if (this._done.value || this._loading.value) {
      console.log('done or loading');
      return;
    }


    // loading
    this._loading.next(true);

    // Map snapshot with doc ref (needed for cursor)
    return col.snapshotChanges()
      .pipe(tap(arr => {
        let values = arr.map(snap => {
          const data = snap.payload.doc.data();
          const doc = snap.payload.doc;
          return { ...data, doc };
        });

        // If prepending, reverse array
        values = this.query.prepend ? values.reverse() : values;

        // update source with new values, done loading
        this._data.next(values);
        this._loading.next(false);

        // no more values, mark done
        if (!values.length) {
          this._done.next(true);
        }
      }), take(1), finalize(() => {
        if (this._initialLoad.value) {
          this._initialLoad.next(false);
        }
      }))
      .subscribe();

  }


}

