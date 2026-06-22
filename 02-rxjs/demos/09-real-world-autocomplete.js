/**
 * Demo 09: simulated autocomplete using debounceTime,
 * distinctUntilChanged, and switchMap to cancel stale API calls.
 */
import { concat, of, timer } from 'rxjs';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  finalize,
  map,
  switchMap,
  tap
} from 'rxjs/operators';

console.log('\n=== Demo 09: Real-world Autocomplete ===');

const keystrokes$ = concat(
  of('r').pipe(delay(0)),
  of('re').pipe(delay(100)),
  of('rea').pipe(delay(100)),
  of('reac').pipe(delay(450)),
  of('react').pipe(delay(100)),
  of('react').pipe(delay(500)),
  of('rxjs').pipe(delay(700))
).pipe(tap(value => console.log(`[typing] ${value}`)));

const fakeSearchApi = term => {
  console.log(`  [api] start request for "${term}"`);
  return timer(800).pipe(
    map(() => [`${term}-guide`, `${term}-tutorial`, `${term}-examples`]),
    finalize(() => console.log(`  [api] end/cancel request for "${term}"`))
  );
};

keystrokes$
  .pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(term => console.log(`\n[search trigger] ${term}`)),
    switchMap(term =>
      fakeSearchApi(term).pipe(
        map(results => ({ term, results }))
      )
    )
  )
  .subscribe({
    next: ({ term, results }) => {
      console.log(`[results] ${term} -> ${results.join(', ')}`);
    },
    complete: () => console.log('\n[autocomplete] complete')
  });
