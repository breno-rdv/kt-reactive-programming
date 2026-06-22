# Exercises

These exercises follow the same boilerplate-first approach as the demos.

## Shared approach

1. read the goal
2. complete the TODOs
3. run the file with Node
4. compare with the solution

## Exercise 1 — Observer pattern

File: `exercise-01-observer.js`

### Goal

Implement a small `EventBus` with `subscribe`, `unsubscribe`, and `emit`.

### Hints

- `Map` for event names
- `Set` for listeners
- return an unsubscribe function

## Exercise 2 — Push stream

File: `exercise-02-push-stream.js`

### Goal

Build a number stream that emits every 100ms and stops after `N` values.

### Hints

- `setInterval`
- multiple subscribers
- guard against multiple timers
- cleanup in `stop()`
