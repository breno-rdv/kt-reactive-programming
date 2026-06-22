/**
 * Demo 03: RxJS creation operators in Node.js, including fromEvent
 * using EventEmitter as a DOM-like event source.
 */
import { EventEmitter } from 'node:events';
import {
  EMPTY,
  NEVER,
  defer,
  from,
  fromEvent,
  interval,
  of,
  throwError,
  timer
} from 'rxjs';
import { take } from 'rxjs/operators';

console.log('\n=== Demo 03: Creation Operators ===');

of('A', 'B', 'C').subscribe({
  next: value => console.log(`[of] ${value}`),
  complete: () => console.log('[of] complete\n')
});

from([10, 20, 30]).subscribe({
  next: value => console.log(`[from array] ${value}`),
  complete: () => console.log('[from array] complete\n')
});

from(Promise.resolve('resolved promise')).subscribe(value => {
  console.log(`[from promise] ${value}\n`);
});

interval(250)
  .pipe(take(3))
  .subscribe({
    next: value => console.log(`[interval] ${value}`),
    complete: () => console.log('[interval] complete\n')
  });

timer(700).subscribe({
  next: value => console.log(`[timer once] ${value}`),
  complete: () => console.log('[timer once] complete\n')
});

timer(500, 300)
  .pipe(take(3))
  .subscribe({
    next: value => console.log(`[timer periodic] ${value}`),
    complete: () => console.log('[timer periodic] complete\n')
  });

const deferred$ = defer(() => {
  const now = new Date().toISOString();
  return of(`fresh timestamp: ${now}`);
});

deferred$.subscribe(value => console.log(`[defer #1] ${value}`));
setTimeout(() => {
  deferred$.subscribe(value => console.log(`[defer #2] ${value}\n`));
}, 400);

EMPTY.subscribe({
  complete: () => console.log('[EMPTY] completed immediately\n')
});

const neverSubscription = NEVER.subscribe({
  next: value => console.log(`[NEVER] ${value}`),
  complete: () => console.log('[NEVER] complete')
});
setTimeout(() => {
  console.log('[NEVER] still silent, unsubscribing manually\n');
  neverSubscription.unsubscribe();
}, 900);

throwError(() => new Error('boom')).subscribe({
  error: err => console.log(`[throwError] ${err.message}\n`)
});

const emitter = new EventEmitter();
fromEvent(emitter, 'message').subscribe(value => {
  console.log(`[fromEvent] ${value}`);
});

setTimeout(() => emitter.emit('message', 'hello'), 100);
setTimeout(() => emitter.emit('message', 'world'), 250);
setTimeout(() => console.log('[fromEvent] demo done\n'), 500);
