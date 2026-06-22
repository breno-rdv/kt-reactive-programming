/**
 * Demo 08: Subject, BehaviorSubject, ReplaySubject, and AsyncSubject
 * with early/late subscribers to show multicasting behavior.
 */
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

console.log('\n=== Demo 08: Subjects ===');

const subject = new Subject();
subject.subscribe(value => console.log(`[Subject A] ${value}`));
subject.next(1);
subject.next(2);
subject.subscribe(value => console.log(`[Subject B] ${value}`));
subject.next(3);
subject.complete();
console.log('');

const behavior = new BehaviorSubject('initial');
behavior.subscribe(value => console.log(`[BehaviorSubject A] ${value}`));
behavior.next('ready');
behavior.next('running');
behavior.subscribe(value => console.log(`[BehaviorSubject B] ${value}`));
behavior.next('done');
behavior.complete();
console.log('');

const replay = new ReplaySubject(2);
replay.next('first');
replay.next('second');
replay.next('third');
replay.subscribe(value => console.log(`[ReplaySubject late] ${value}`));
replay.next('fourth');
replay.complete();
console.log('');

const asyncSubject = new AsyncSubject();
asyncSubject.subscribe(value => console.log(`[AsyncSubject A] ${value}`));
asyncSubject.next('draft');
asyncSubject.next('almost final');
asyncSubject.subscribe(value => console.log(`[AsyncSubject B] ${value}`));
asyncSubject.next('final value');
console.log('[AsyncSubject] subscribers see nothing yet...');
asyncSubject.complete();
