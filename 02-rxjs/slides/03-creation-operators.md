# 03 — Creation Operators

## `of`
**Purpose:** emit literal values in order, then complete

**Signature:** `of(...values)`

```text
of(1,2,3): --1--2--3--|
```

**Use case:** quick test streams, static config, demo values

## `from`
**Purpose:** convert iterable, Promise, array-like, or Observable-like into an Observable

**Signature:** `from(input)`

```text
from([1,2,3]): --1--2--3--|
from(Promise): ----resolved|
```

**Use case:** bridge existing async/data structures into RxJS

## `interval`
**Purpose:** emit incrementing numbers forever on a cadence

**Signature:** `interval(periodMs)`

```text
interval(1000): --0--1--2--3--...
```

**Use case:** polling, heartbeats, animation ticks

## `timer`
**Purpose:** emit after a delay, optionally continue periodically

**Signature:** `timer(dueMs, periodMs?)`

```text
timer(1000): ----0|
timer(1000,500): ----0-1-2-3-...
```

**Use case:** delayed actions, timeouts, scheduled starts

## `fromEvent`
**Purpose:** turn event emitters or DOM events into Observables

**Signature:** `fromEvent(target, eventName)`

```text
click$: --c----c-c-----c-->
```

**Use case:** clicks, keypresses, websocket events, Node EventEmitter

## `EMPTY`
**Purpose:** immediately completes without values

```text
EMPTY: |
```

**Use case:** no-op branch, graceful short-circuit

## `NEVER`
**Purpose:** never emits and never completes

```text
NEVER: ----------
```

**Use case:** testing, disabling a branch, "wait forever" semantics

## `throwError`
**Purpose:** immediately terminate with an error

**Signature:** `throwError(() => new Error('boom'))`

```text
throwError: X
```

**Use case:** validation failure, test failure path, conditional error stream

## `defer`
**Purpose:** create the Observable **at subscription time**

**Signature:** `defer(factory)`

```text
defer(() => of(now())):
sub A -> --t1|
sub B -> --t2|
```

**Use case:** fresh timestamps, lazy HTTP creation, latest environment-dependent values

## Operator choice cheat sheet
- known values now → `of`
- existing array/promise/iterable → `from`
- endless cadence → `interval`
- delayed start / one-shot timer → `timer`
- external events → `fromEvent`
- do nothing but complete → `EMPTY`
- do nothing forever → `NEVER`
- fail immediately → `throwError`
- recreate lazily per subscription → `defer`
