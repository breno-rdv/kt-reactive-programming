/**
 * Demo 07: catchError, retry, retryWhen, and finalize,
 * showing recovery, retries, and cleanup behavior.
 */
import { defer, of, throwError, timer } from 'rxjs';
import {
  catchError,
  delay,
  finalize,
  mergeMap,
  retry,
  retryWhen,
  scan
} from 'rxjs/operators';

console.log('\n=== Demo 07: Error Handling ===');

throwError(() => new Error('primary API failed'))
  .pipe(catchError(() => of('fallback data')))
  .subscribe({
    next: value => console.log(`[catchError] ${value}`),
    complete: () => console.log('[catchError] complete\n')
  });

let retryAttempt = 0;
const retrySource$ = defer(() => {
  retryAttempt += 1;
  console.log(`[retry] attempt ${retryAttempt}`);
  return retryAttempt < 3 ? throwError(() => new Error('temporary failure')) : of('success on retry');
});

retrySource$
  .pipe(retry(3))
  .subscribe({
    next: value => console.log(`[retry] ${value}`),
    complete: () => console.log('[retry] complete\n')
  });

let retryWhenAttempt = 0;
const retryWhenSource$ = defer(() => {
  retryWhenAttempt += 1;
  console.log(`[retryWhen] attempt ${retryWhenAttempt}`);
  return retryWhenAttempt < 3
    ? throwError(() => new Error('network glitch'))
    : of('success after backoff').pipe(delay(100));
});

retryWhenSource$
  .pipe(
    retryWhen(errors =>
      errors.pipe(
        scan((count, error) => {
          if (count >= 2) {
            throw error;
          }
          return count + 1;
        }, 0),
        mergeMap(count => {
          const wait = (count + 1) * 300;
          console.log(`[retryWhen] waiting ${wait}ms before retry`);
          return timer(wait);
        })
      )
    ),
    finalize(() => console.log('[retryWhen] finalize ran\n'))
  )
  .subscribe({
    next: value => console.log(`[retryWhen] ${value}`),
    error: err => console.log(`[retryWhen] final error -> ${err.message}`),
    complete: () => console.log('[retryWhen] complete')
  });
