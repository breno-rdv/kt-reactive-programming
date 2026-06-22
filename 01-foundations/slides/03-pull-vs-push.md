# 03 — Pull vs Push

## Overview

- ask one question: who decides when data arrives?
- pull = consumer decides
- push = producer decides

## Key Concepts

|           | Single value | Multiple values |
|-----------|--------------|-----------------|
| **Pull**  | Function     | Iterator        |
| **Push**  | Promise      | Observable      |

- pull fits direct requests
- push fits events over time
- push is strong for async streams

## Code Example

```js
const getValue = () => 42; // pull
const promise = new Promise((resolve) => resolve(42)); // push
```

## Key Takeaways

- functions and iterators are pull-based
- promises and observables are push-based
- observables model async streams naturally
