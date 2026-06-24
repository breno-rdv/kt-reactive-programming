console.log('\n=== Pull boilerplate ===');

const getValue = () => {
  return 'TODO-pull-value';
};

console.log('Function result ->', getValue());

function* items() {
  // TODO: yield multiple values.
}

const iterator = items();
console.log('Iterator next ->', iterator.next());
console.log('Iterator next ->', iterator.next());

console.log('\n=== Push boilerplate ===');

const promise = new Promise((resolve) => {
  // TODO: resolve after a timeout.
  resolve('TODO-promise-value');
});

promise.then((value) => console.log('Promise pushed ->', value));

class PushStream {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(listener) {
    // TODO: add listener and return unsubscribe.
    return () => {};
  }

  emit(value) {
    // TODO: notify all subscribers.
  }
}

const stream = new PushStream();
stream.subscribe((value) => console.log('Subscriber A ->', value));
stream.subscribe((value) => console.log('Subscriber B ->', value));
stream.emit('stream-event');
