// solution: exercise-01-observer.js

class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  subscribe(eventName, listener) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }

    this.listeners.get(eventName).add(listener);
    return () => this.unsubscribe(eventName, listener);
  }

  unsubscribe(eventName, listener) {
    const eventListeners = this.listeners.get(eventName);
    if (!eventListeners) {
      return;
    }

    eventListeners.delete(listener);
    if (eventListeners.size === 0) {
      this.listeners.delete(eventName);
    }
  }

  emit(eventName, payload) {
    const eventListeners = this.listeners.get(eventName);
    if (!eventListeners) {
      return;
    }

    for (const listener of eventListeners) {
      listener(payload);
    }
  }
}

const bus = new EventBus();
const unsubscribe = bus.subscribe('user:created', (user) => console.log('User created:', user.name));
bus.subscribe('user:created', (user) => console.log('Audit log -> created user id:', user.id));

bus.emit('user:created', { id: 1, name: 'Ada' });
unsubscribe();
bus.emit('user:created', { id: 2, name: 'Grace' });
