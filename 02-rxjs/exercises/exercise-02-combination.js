import { combineLatest, forkJoin, interval, of } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';

console.log('\n=== Exercise 02 ===');

// Task 1:
// Use forkJoin to "fetch" 3 simulated API calls in parallel.
// Print the final combined result once all 3 complete.

const apiUser$ = of({ id: 1, name: 'Ada' }).pipe(delay(300));
const apiOrders$ = of(['order-1', 'order-2']).pipe(delay(500));
const apiSettings$ = of({ theme: 'dark' }).pipe(delay(200));

// TODO: combine apiUser$, apiOrders$, and apiSettings$ with forkJoin
// and subscribe to log the object result.

// Task 2:
// Combine two interval streams with combineLatest.
// Left stream: emits every 400ms, take 3
// Right stream: emits every 700ms, take 3

const left$ = interval(400).pipe(
  take(3),
  map(value => `L${value}`)
);

const right$ = interval(700).pipe(
  take(3),
  map(value => `R${value}`)
);

// TODO: use combineLatest([left$, right$])
// and log each tuple.
