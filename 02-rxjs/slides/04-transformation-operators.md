# 04 — Transformation Operators

## `map`
Use when each input value becomes exactly one output value.

```text
source: --1--2--3--|
map x2: --2--4--6--|
```

## Flattening operators
These operators map each source value to an **inner Observable**.
The real difference is how they handle overlap.

### `mergeMap` / `flatMap`
Run all inner Observables concurrently.

```text
outer:      --A----B----C--|
inner(A):     ---a1-a2|
inner(B):          ---b1-b2|
result:     -----a1-a2-b1-b2-c1-c2|
```

Use when:
- concurrency is okay
- order is not strict
- you do not want cancellation

### `switchMap`
Cancel the previous inner Observable when a new source value arrives.

```text
outer:      --A----B----C--|
inner(A):     ---a1-a2|
inner(B):          ---b1-b2|
result:     ---------b1-----c1-c2|
```

Use when:
- only the latest request matters
- search/autocomplete
- route changes / live filters

### `concatMap`
Queue inner Observables and run one at a time in order.

```text
outer:      --A----B----C--|
result:     -----a1-a2---b1-b2---c1-c2|
```

Use when:
- order matters
- writes must be serialized
- concurrency should be 1

### `exhaustMap`
Ignore new source values while one inner Observable is active.

```text
outer:      --A--B--C------D--|
result:     -----a1-a2------d1-d2|
```

Use when:
- double-click protection
- login / submit buttons
- ignore spam until current work ends

## Decision table
| Operator | Concurrency | Cancels previous? | Preserves order? | Ignores new while active? | Best for |
|---|---:|---|---|---|---|
| `map` | n/a | n/a | yes | no | synchronous 1:1 transform |
| `mergeMap` | many | no | no | no | fire many async tasks |
| `switchMap` | 1 active latest | yes | latest only | no | search, live queries |
| `concatMap` | 1 queued | no | yes | no | sequential saves/jobs |
| `exhaustMap` | 1 active first | no | first wins | yes | submit guards |

## Rule of thumb
- transform value only → `map`
- keep all async work → `mergeMap`
- latest wins → `switchMap`
- order matters → `concatMap`
- ignore extra triggers → `exhaustMap`
