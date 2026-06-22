/**
 * Demo 04: map, mergeMap, switchMap, and concatMap with timing
 * so the flattening differences are visible in the console.
 */
import { from, of, timer } from 'rxjs';
import { concatMap, delay, map, mergeMap, switchMap } from 'rxjs/operators';

console.log('\n=== Demo 04: Transformation Operators ===');

of(1, 2, 3)
  .pipe(map(value => value * 10))
  .subscribe(value => console.log(`[map] ${value}`));

const requests = [
  { label: 'A', waitBeforeEmit: 0, duration: 500 },
  { label: 'B', waitBeforeEmit: 200, duration: 500 },
  { label: 'C', waitBeforeEmit: 200, duration: 500 }
];

const outer$ = from(requests).pipe(
  concatMap(request => of(request).pipe(delay(request.waitBeforeEmit)))
);

const fakeRequest = request =>
  timer(request.duration).pipe(
    map(() => `result(${request.label}) after ${request.duration}ms`)
  );

const run = (name, operator, offset) => {
  setTimeout(() => {
    console.log(`\n[${name}] starting`);
    outer$
      .pipe(
        operator(request => {
          console.log(`[${name}] source emitted ${request.label}`);
          return fakeRequest(request);
        })
      )
      .subscribe({
        next: value => console.log(`[${name}] ${value}`),
        complete: () => console.log(`[${name}] complete`)
      });
  }, offset);
};

run('mergeMap', mergeMap, 0);
run('switchMap', switchMap, 2200);
run('concatMap', concatMap, 4400);
