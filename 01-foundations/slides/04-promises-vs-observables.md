# 04 — Promises vs Observables

## Overview

- promise = one future value
- observable = many future values
- both are useful, but for different shapes of work

## Key Concepts

| Topic | Promise | Observable |
|---|---|---|
| Eager vs lazy | Eager | Lazy |
| Values | Single | Multiple |
| Cancellable | No | Yes |
| Synchronous possible? | No | Yes |
| Composition | `then` | operators |

## Code Example

```js
const promise = new Promise((resolve) => resolve('done'));

const observable = {
  subscribe(observer) {
    // TODO
  },
};
```

## Key Takeaways

- promises are great for one async result
- observables fit streams and composition
- observables add unsubscribe behavior
