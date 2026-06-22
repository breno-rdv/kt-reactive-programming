class Subject {
  constructor() {
    this.observers = new Set();
  }

  subscribe(observer) {
    this.observers.add(observer);
    return () => {
      this.observers.delete(observer);
    };
  }

  notify(value) {
    for (const observer of this.observers) {
      observer(value);
    }
  }
}

const subject = new Subject();
const unsubscribeA = subject.subscribe((value) => console.log('Observer A ->', value));
subject.subscribe((value) => console.log('Observer B ->', value));
subject.notify('hello observers');
unsubscribeA();
subject.notify('second notification');
