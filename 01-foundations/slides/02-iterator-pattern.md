# 02 — Iterator Pattern

## Overview

- access values one at a time
- hide the collection internals
- common pull-based pattern

## Key Concepts

- `next()` returns `{ value, done }`
- `[Symbol.iterator]` makes an object iterable in JS
- iterators are often lazy

```text
Consumer --next()--> Iterator --returns--> { value, done }
```

## Code Example

```js
const range = {
  [Symbol.iterator]() {
    return {
      next() {
        // TODO
      },
    };
  },
};
```

## Key Takeaways

- the consumer controls timing
- JavaScript generators are convenient iterators
- iterators are the pull counterpart to observables
