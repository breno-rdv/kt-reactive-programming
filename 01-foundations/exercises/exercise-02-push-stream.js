class NumberStream {
  constructor(limit) {
    this.limit = limit;
    this.subscribers = new Set();
    this.timerId = null;
    this.current = 1;
  }

  subscribe(listener) {
    // TODO: add listener.
    // TODO: return unsubscribe function.
    return () => {};
  }

  start() {
    // TODO: do nothing if already running.
    // TODO: emit current every 100ms.
    // TODO: stop after N values.
  }

  stop() {
    // TODO: clear interval and reset timerId.
  }
}

const stream = new NumberStream(5);
stream.subscribe((value) => console.log('Subscriber A ->', value));
stream.subscribe((value) => console.log('Subscriber B ->', value));
stream.start();
