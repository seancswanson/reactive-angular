import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {
    console.log("LoadingService instantiated...")
  }

  showLoaderUntilComplete<T>(obs$:Observable<T>): Observable<T>{
    // Create default observable to create an observable chain
    return of(null)
      .pipe(
        // When we see this initial value (null) turn on the loading indicator.
        tap(() => this.loadingOn()),
        // Switch to outputting the values of input observable
        concatMap(() => obs$),
        // When input observable stops emitting, turn the loading indicator off.
        finalize(() => this.loadingOff())
      )
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}
