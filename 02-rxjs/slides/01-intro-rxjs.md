# 01 — Intro to RxJS

## What is RxJS?
RxJS stands for **Reactive Extensions for JavaScript**.
It is the JavaScript implementation of the broader **ReactiveX** family.

ReactiveX gives us a common model for working with:
- asynchronous values
- event streams
- time-based flows
- composition through operators

Think of RxJS as:
- **Observer pattern + collections over time + powerful operators**

## Core idea
A Promise gives you **one future value**.
An Observable gives you **zero to many values over time**.

## Observable contract
An Observable can send three kinds of notifications:
- `next(value)` — emitted value
- `error(err)` — terminal failure
- `complete()` — terminal success

Rules:
- zero or more `next`
- then either **one `error`** or **one `complete`**
- after `error` or `complete`, nothing else can happen

## Subscription lifecycle
1. Create an Observable
2. Call `subscribe(...)`
3. Producer starts work
4. Subscriber receives `next/error/complete`
5. Optionally call `unsubscribe()` early
6. Teardown logic runs

## Lazy by default
Most Observables are lazy.
Nothing happens until someone subscribes.

```js
const stream$ = new Observable(subscriber => {
  console.log('started');
  subscriber.next(1);
  subscriber.complete();
});

stream$.subscribe(); // 'started' happens here, not at definition time
```

## Marble diagrams
Marble diagrams visualize values over time.

```text
source$:   --1--2--3--|
map(x*10): --10-20-30-|
error$:    --1--2--X
never$:    ----------
```

Legend:
- `-` passage of time
- letters/numbers are emitted values
- `|` completed
- `X` errored

## The `pipe()` API
Operators are pure functions that transform Observables.
We chain them with `pipe()`.

```js
source$.pipe(
  filter(x => x % 2 === 0),
  map(x => x * x)
);
```

Benefits:
- readable composition
- reusable pipelines
- declarative async logic

## Why RxJS matters
RxJS is useful when you need to coordinate:
- UI events
- HTTP requests
- retries and cancellation
- websockets
- polling
- live search / autocomplete

## Mental model
- **Observable** = source of values over time
- **Observer** = consumer of those values
- **Subscription** = execution handle
- **Operator** = transformation step
