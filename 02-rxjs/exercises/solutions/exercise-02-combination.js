import { combineLatest, forkJoin, interval, of } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';

console.log('\n=== Exercise 02 Solution ===');

const apiUser$ = of({ id: 1, name: 'Ada' }).pipe(delay(300));
const apiOrders$ = of(['order-1', 'order-2']).pipe(delay(500));
const apiSettings$ = of({ theme: 'dark' }).pipe(delay(200));

forkJoin({
  user: apiUser$,
  orders: apiOrders$,
  settings: apiSettings$
}).subscribe(result => console.log('[task 1]', result));

const left$ = interval(400).pipe(
  take(3),
  map(value => `L${value}`)
);

const right$ = interval(700).pipe(
  take(3),
  map(value => `R${value}`)
);

combineLatest([left$, right$]).subscribe({
  next: values => console.log('[task 2]', values),
  complete: () => console.log('[task 2] complete')
});
