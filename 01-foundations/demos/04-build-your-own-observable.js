class Observable {
  constructor(subscribeFn) {
    this.subscribeFn = subscribeFn;
  }

  subscribe(observer) {
    // TODO: normalize observer shape: next, error, complete.
    // TODO: call this.subscribeFn(observer).
    console.log('TODO: implement subscribe(observer)');
    return undefined;
  }
}

console.log('\n--- Synchronous observable boilerplate ---');
const sync$ = new Observable((observer) => {
  // TODO: call observer.next(...)
  // TODO: call observer.complete()
});

sync$.subscribe({
  next: (value) => console.log('sync next ->', value),
  error: (error) => console.log('sync error ->', error),
  complete: () => console.log('sync complete'),
});

console.log('\n--- Asynchronous observable boilerplate ---');
const async$ = new Observable((observer) => {
  // TODO: emit values with setTimeout
});

async$.subscribe({
  next: (value) => console.log('async next ->', value),
  complete: () => console.log('async complete'),
});
