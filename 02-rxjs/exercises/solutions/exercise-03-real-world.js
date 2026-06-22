import { defer, interval, of, throwError } from 'rxjs';
import { catchError, mergeMap, take } from 'rxjs/operators';

console.log('\n=== Exercise 03 Solution ===');

let pollCount = 0;
const fetchStatus$ = defer(() => {
  pollCount += 1;

  if (pollCount === 3) {
    return throwError(() => new Error('temporary polling failure'));
  }

  return of({ pollCount, status: 'ok' });
});

interval(2000)
  .pipe(
    take(5),
    mergeMap(() =>
      fetchStatus$.pipe(
        catchError(err => of({ pollCount: 'error', status: err.message }))
      )
    )
  )
  .subscribe({
    next: value => console.log('[poll]', value),
    complete: () => console.log('[poll] complete')
  });
