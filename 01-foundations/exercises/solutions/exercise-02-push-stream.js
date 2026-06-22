// solution: exercise-02-push-stream.js

class NumberStream {
  constructor(limit) {
    this.limit = limit;
    this.subscribers = new Set();
    this.timerId = null;
    this.current = 1;
  }

  subscribe(listener) {
    this.subscribers.add(listener);

    return () => {
      this.subscribers.delete(listener);
      if (this.subscribers.size === 0) {
        this.stop();
      }
    };
  }

  start() {
    if (this.timerId !== null) {
      return;
    }

    this.timerId = setInterval(() => {
      for (const listener of this.subscribers) {
        listener(this.current);
      }

      if (this.current >= this.limit) {
        this.stop();
        return;
      }

      this.current += 1;
    }, 100);
  }

  stop() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}

const stream = new NumberStream(5);
stream.subscribe((value) => console.log('Subscriber A ->', value));
stream.subscribe((value) => console.log('Subscriber B ->', value));
stream.start();
