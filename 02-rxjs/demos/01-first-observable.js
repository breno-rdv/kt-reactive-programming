/**
 * Demo 01: creating a custom Observable, showing laziness,
 * next/error/complete notifications, and early unsubscribe.
 */
// TODO: understand the teardown logic and how it works with multiple subscribers
import { Observable } from 'rxjs';

console.log('\n=== Demo 01: First Observable ===');
console.log('Observable created. Nothing runs yet.\n');

const custom$ = new Observable(subscriber => {
  console.log('[producer] Subscription started');

  let count = 1;
  const intervalId = setInterval(() => {
    console.log(`[producer] Emitting ${count}`);
    subscriber.next(count);

    if (count === 3) {
      console.log('[producer] Completing stream');
      subscriber.complete();
      clearInterval(intervalId);
    }

    count += 1;
  }, 300);

  return () => {
    clearInterval(intervalId);
    console.log('[producer] Teardown: interval cleared');
  };
});

console.log('Subscribing to custom$...');
custom$.subscribe({
  next: value => console.log(`[subscriber A] next -> ${value}`),
  error: err => console.log(`[subscriber A] error -> ${err.message}`),
  complete: () => console.log('[subscriber A] complete')
});

setTimeout(() => {
  console.log('\nSubscribing again to prove laziness / new execution...');
  const secondSubscription = custom$.subscribe({
    next: value => console.log(`[subscriber B] next -> ${value}`),
    complete: () => console.log('[subscriber B] complete')
  });

  setTimeout(() => {
    console.log('[subscriber B] unsubscribe() before completion');
    secondSubscription.unsubscribe();
  }, 500);
}, 1300);

setTimeout(() => {
  console.log('\nError example:');
  const error$ = new Observable(subscriber => {
    subscriber.next('before error');
    subscriber.error(new Error('Something went wrong'));
  });

  error$.subscribe({
    next: value => console.log(`[error stream] next -> ${value}`),
    error: err => console.log(`[error stream] error -> ${err.message}`),
    complete: () => console.log('[error stream] complete')
  });
}, 2400);
