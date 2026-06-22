/**
 * Demo 05: filter, take, debounceTime, distinctUntilChanged,
 * and takeUntil with console output that highlights timing.
 */
import { concat, from, interval, of, timer } from 'rxjs';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  map,
  take,
  takeUntil
} from 'rxjs/operators';

console.log('\n=== Demo 05: Filtering Operators ===');

from([1, 2, 3, 4, 5, 6])
  .pipe(
    filter(value => value % 2 === 0),
    take(2)
  )
  .subscribe({
    next: value => console.log(`[filter + take] ${value}`),
    complete: () => console.log('[filter + take] complete\n')
  });

const typing$ = concat(
  of('r').pipe(delay(0)),
  of('rx').pipe(delay(100)),
  of('rx').pipe(delay(100)),
  of('rxjs').pipe(delay(400)),
  of('rxjs').pipe(delay(400)),
  of('rxjs 7').pipe(delay(400))
);

typing$
  .pipe(debounceTime(250), distinctUntilChanged())
  .subscribe({
    next: value => console.log(`[debounce + distinct] ${value}`),
    complete: () => console.log('[debounce + distinct] complete\n')
  });

const stop$ = timer(1400);
interval(250)
  .pipe(
    map(value => value + 1),
    takeUntil(stop$)
  )
  .subscribe({
    next: value => console.log(`[takeUntil] ${value}`),
    complete: () => console.log('[takeUntil] stopped by signal')
  });
