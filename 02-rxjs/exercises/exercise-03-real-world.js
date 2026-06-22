import { defer, interval, of, throwError } from 'rxjs';
import { catchError, mergeMap, take } from 'rxjs/operators';

console.log('\n=== Exercise 03 ===');

// Build a polling system with these rules:
// 1. Poll a data source every 2 seconds
// 2. Stop after 5 polls
// 3. Handle errors gracefully
// 4. Log each result to the console

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
    // TODO: for each tick, call fetchStatus$
    // TODO: gracefully recover from errors
    // Example fallback shape: { pollCount: 'error', status: err.message }
  )
  .subscribe({
    next: value => console.log('[poll]', value),
    complete: () => console.log('[poll] complete')
  });
