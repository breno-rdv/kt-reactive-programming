import { defer, from, throwError } from 'rxjs';
import { catchError, filter, map, retry } from 'rxjs/operators';

console.log('\n=== Exercise 01 ===');

// Task 1:
// Create an observable that emits numbers 1–10,
// filters even numbers, and maps them to their squares.
// Expected output: 4, 16, 36, 64, 100

const numbers$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

numbers$
  .pipe(
    // TODO: filter even numbers

    // TODO: map to squares
  )
  .subscribe(value => console.log('[task 1]', value));

// Task 2:
// Implement a stream that auto-retries 3 times on error.
// Hint: use defer(...) so each subscription attempt can behave differently.

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
    // TODO: retry 3 times
    catchError(err => from([`still failed: ${err.message}`]))
  )
  .subscribe(value => console.log('[task 2]', value));
