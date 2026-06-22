import { defer, from, throwError } from 'rxjs';
import { catchError, filter, map, retry } from 'rxjs/operators';

console.log('\n=== Exercise 01 Solution ===');

from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  .pipe(
    filter(value => value % 2 === 0),
    map(value => value * value)
  )
  .subscribe(value => console.log('[task 1]', value));

let attempt = 0;
const unstable$ = defer(() => {
  attempt += 1;
  console.log(`[task 2] attempt ${attempt}`);

  if (attempt < 4) {
    return throwError(() => new Error('temporary failure'));
  }

  return from(['success']);
});

unstable$
  .pipe(
    retry(3),
    catchError(err => from([`still failed: ${err.message}`]))
  )
  .subscribe(value => console.log('[task 2]', value));
