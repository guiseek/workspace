import { BehaviorSubject, Observable } from 'rxjs';

export interface StoreOptions {
  /** The name of the state store */
  store: string;

  /** The name of the state store */
  prod?: boolean;

  /** The persist defines whether to create a backup in indexedDb */
  // persist?: boolean;
}
/**
 * StoreConfig decorator
 *
 * @param {StoreOptions} options
 *
 * @example
 * ```@StoreConfig({
 *   name: 'employees',
 *   prod: environment.production
 * })```
 */
export function StoreConfig(options: StoreOptions) {

  return (constructor) => {
    Object.keys(options).forEach((key) => {
      console.log(options, key);

      (constructor[key] = options[key])
    });
  };
}

export abstract class StateStore<T = Record<string, any>> {
  protected prod = false;
  protected store: string;
  protected bs: BehaviorSubject<T>;
  state$: Observable<T>;
  state: T;
  previous: T;

  constructor(initialValue: Partial<T>) {
    this.bs = new BehaviorSubject<T>(initialValue as T);
    this.state$ = this.bs.asObservable();
    this.state = initialValue as T;
    this.state$.subscribe((s) => {
      this.state = s;
    });
  }

  patch(newValue: Partial<T>, event: string = 'Not specified') {
    this.previous = this.state;
    const newState = Object.assign({}, this.state, newValue);
    if (!this.prod) {
      console.groupCollapsed(`[${this.store} store] [patch] [event: ${event}]`);
      console.log('change', newValue);
      console.log('prev', this.previous);
      console.log('next', newState);
      console.groupEnd();
    }
    this.bs.next(newState);
  }

  set(newValue: Partial<T>, event: string = 'Not specified') {
    this.previous = this.state;
    const newState = Object.assign({}, newValue) as T;
    if (!this.prod) {
      console.groupCollapsed(`[${this.store} store] [set] [event: ${event}]`);
      console.log('change', newValue);
      console.log('prev', this.previous);
      console.log('next', newState);
      console.groupEnd();
    }
    this.bs.next(newState);
  }
}
