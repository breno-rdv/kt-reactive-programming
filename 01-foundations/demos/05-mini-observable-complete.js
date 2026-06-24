class Observable {
  constructor(subscribeFn) {
    this.subscribeFn = subscribeFn;
  }

  subscribe(observer) {
    // TODO: return an object with unsubscribe().
    console.log('TODO: implement subscribe(observer) with cleanup support');
    return {
      unsubscribe() {
        console.log('TODO: cleanup');
      },
    };
  }

  map(project) {
    // TODO: return a new Observable that transforms values.
    console.log('TODO: implement map(project)');
    return this;
  }

  filter(predicate) {
    // TODO: return a new Observable that filters values.
    console.log('TODO: implement filter(predicate)');
    return this;
  }
}

const numbers$ = new Observable((observer) => {
  // TODO: emit a small sequence and complete.
});

const result$ = numbers$
  .filter((value) => value % 2 === 0)
  .map((value) => value * 10);

result$.subscribe({
  next: (value) => console.log('next ->', value),
  complete: () => console.log('complete'),
});
