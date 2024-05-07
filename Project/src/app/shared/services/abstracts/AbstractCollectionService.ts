import { BehaviorSubject } from 'rxjs';

export abstract class AbstractCollectionService<T> {

  onSelectedChanged$: BehaviorSubject<T> = new BehaviorSubject<T>(null);

  private _selected: T;

  set selected(value: T) {
    this._selected = value;
    this.onSelectedChanged$.next(value);
  }

  get selected(): T {
    return this._selected;
  }

  clearSelected(): void {
    this._selected = null;
  }


}
