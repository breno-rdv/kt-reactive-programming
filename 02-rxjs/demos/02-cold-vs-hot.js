/**
 * Demo 02: cold vs hot observables and how share() multicasts
 * a cold source into a shared execution.
 */
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

console.log('\n=== Demo 02: Cold vs Hot ===');

const cold$ = new Observable(subscriber => {
  console.log('[cold] Producer started for a subscriber');
  let value = 1;
  const id = setInterval(() => {
    subscriber.next(value++);
    if (value > 3) {
      clearInterval(id);
      subscriber.complete();
    }
  }, 300);

  return () => {
    clearInterval(id);
    console.log('[cold] Producer cleaned up');
  };
});

console.log('\nCold observable: each subscriber gets a fresh execution');
cold$.subscribe({
  next: value => console.log(`[cold A] ${value}`),
  complete: () => console.log('[cold A] complete')
});

setTimeout(() => {
  cold$.subscribe({
    next: value => console.log(`[cold B] ${value}`),
    complete: () => console.log('[cold B] complete')
  });
}, 500);

setTimeout(() => {
  console.log('\nHot/shared observable via share(): subscribers share one execution');
  const shared$ = cold$.pipe(share());

  shared$.subscribe({
    next: value => console.log(`[hot A] ${value}`),
    complete: () => console.log('[hot A] complete')
  });

  setTimeout(() => {
    shared$.subscribe({
      next: value => console.log(`[hot B] ${value}`),
      complete: () => console.log('[hot B] complete')
    });
  }, 500);
}, 2400);
