// 03-pull-vs-push.js
// Run with:
// node 01-foundations/demos/03-pull-vs-push.js

// TEMPLATE APPROACH
// Fill the TODOs and compare how each example delivers values.

console.log('\n=== Pull boilerplate ===');

const getValue = () => {
  // TODO: return a single value.
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
    this.subscribers.add(listener);
    return () => this.subscribers.delete(listener);
  }

  emit(value) {
    // TODO: notify all subscribers.
    console.log('TODO: implement emit(value). Value was:', value);
  }
}

const stream = new PushStream();
stream.subscribe((value) => console.log('Subscriber A ->', value));
stream.subscribe((value) => console.log('Subscriber B ->', value));
stream.emit('stream-event');
