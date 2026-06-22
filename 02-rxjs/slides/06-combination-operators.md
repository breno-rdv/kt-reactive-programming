# 06 — Combination Operators

## `merge`
Subscribe to many sources and emit values as they arrive.

```text
A:       --1-----3--|
B:       ---2--4----|
merge:   --1-2--43--|
```

Use when concurrency is fine and timing order is natural.

## `concat`
Run sources sequentially.

```text
A:        --1--2--|
B:        ---3--4--|
concat:   --1--2-----3--4--|
```

Use when next source should wait for previous completion.

## `combineLatest`
After every source has emitted once, emit whenever any source changes using the latest values.

```text
A:             --1-----2---|
B:             ----a-b-----|
combineLatest: ----[1,a]-[1,b]-[2,b]-|
```

Use for derived UI state, filters, and form combination.

## `zip`
Pair values by index.

```text
A:     --1----2----3--|
B:     ---a----b----c-|
zip:   ---[1,a]-[2,b]-[3,c]|
```

Use when "first with first, second with second" matters.

## `forkJoin`
Wait for all sources to complete, then emit their final values once.

```text
A:         --1--2--|
B:         ---a--b-|
forkJoin:  ---------[2,b]|
```

Use like `Promise.all` for Observables that complete.

## `withLatestFrom`
When the primary source emits, pair it with the latest value from another source.

```text
main:            --M----M------M--|
other:           ---a-----b-------|
withLatestFrom:  ----[M,a]--[M,b]-[M,b]|
```

Use when one stream is the trigger and another is contextual data.

## Quick choice table
| Operator | Emits when | Requires completion? | Typical use |
|---|---|---|---|
| `merge` | any source emits | no | parallel event streams |
| `concat` | current source emits | yes, to move next | ordered workflows |
| `combineLatest` | any source emits after all started | no | derived state |
| `zip` | every source has next item | no | pair-by-position |
| `forkJoin` | all sources complete | yes | parallel requests |
| `withLatestFrom` | primary emits | no | trigger + latest context |
