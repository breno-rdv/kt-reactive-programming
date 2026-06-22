/**
 * Demo 06: merge, combineLatest, forkJoin, zip, and concat
 * with short finite streams so differences are easy to compare.
 */
import { combineLatest, concat, forkJoin, interval, merge, of, zip } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';

console.log('\n=== Demo 06: Combination Operators ===');

merge(
  of('A1').pipe(delay(100)),
  of('B1').pipe(delay(200)),
  of('A2').pipe(delay(300))
).subscribe({
  next: value => console.log(`[merge] ${value}`),
  complete: () => console.log('[merge] complete\n')
});

concat(
  of('first').pipe(delay(100)),
  of('second').pipe(delay(200)),
  of('third').pipe(delay(100))
).subscribe({
  next: value => console.log(`[concat] ${value}`),
  complete: () => console.log('[concat] complete\n')
});

combineLatest([
  interval(250).pipe(take(3), map(value => `L${value}`)),
  interval(400).pipe(take(3), map(value => `R${value}`))
]).subscribe({
  next: ([left, right]) => console.log(`[combineLatest] ${left} + ${right}`),
  complete: () => console.log('[combineLatest] complete\n')
});

zip(
  of('zip-1').pipe(delay(100)),
  of('zip-A').pipe(delay(250)),
  of('zip-X').pipe(delay(400))
).subscribe({
  next: values => console.log(`[zip] ${values.join(', ')}`),
  complete: () => console.log('[zip] complete\n')
});

forkJoin({
  user: of('Ada').pipe(delay(600)),
  repo: of('kt-reactive-programming').pipe(delay(450)),
  level: of('RxJS').pipe(delay(300))
}).subscribe({
  next: value => console.log('[forkJoin]', value),
  complete: () => console.log('[forkJoin] complete')
});
