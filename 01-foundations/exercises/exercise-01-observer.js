class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  subscribe(eventName, listener) {
    // TODO: create a Set for the event if it does not exist.
    // TODO: add the listener.
    // TODO: return an unsubscribe function.
    return () => {};
  }

  unsubscribe(eventName, listener) {
    // TODO: remove the listener from the event Set.
    // TODO: optionally delete the event when empty.
  }

  emit(eventName, payload) {
    // TODO: call every listener with the payload.
  }
}

const bus = new EventBus();
const unsubscribeUserCreated = bus.subscribe('user:created', (user) => console.log('User created:', user.name));
bus.subscribe('user:created', (user) => console.log('Audit log -> created user id:', user.id));

bus.emit('user:created', { id: 1, name: 'Ada' });
unsubscribeUserCreated();
bus.emit('user:created', { id: 2, name: 'Grace' });
