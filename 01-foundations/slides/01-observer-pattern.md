# 01 — Observer Pattern

## Overview

- GoF behavioral pattern
- one subject notifies many observers
- useful when many consumers react to one source of change

## Key Concepts

- **Subject**: stores subscribers
- **Observer**: reacts to updates
- **Subscription**: connection between them

```text
+--------- Subject ---------+
| subscribe | unsubscribe   |
| notify(value)             |
+-------------+-------------+
              |
        +-----+-----+-----+
        |           |     |
   Observer A  Observer B Observer C
```

### When to use it

- event systems
- browser event listeners

## Code Example

```js
class Subject {
  subscribe(observer) {
    // TODO
  }

  unsubscribe(observer) {
    // TODO
  }

  notify(value) {
    // TODO
  }
}
```

## Key Takeaways

- one-to-many communication
- loose coupling between producer and consumers
- foundation for observables
