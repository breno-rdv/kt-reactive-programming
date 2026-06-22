# Operators

## Transforming streams
### `map`
One input becomes one output.

```text
1 -- 2 -- 3 --|
map(x * 10)
10 - 20 - 30 -|
```

### `flatMap`
One input becomes another publisher and results may interleave.

```text
A ----- B -----|
flatMap
(a1-a2) (b1-b2)
a1-a2-b1-b2 or a1-b1-a2-b2
```

### `concatMap`
Preserves source order by waiting for each inner publisher.

```text
A ----- B -----|
concatMap
(a1-a2) then (b1-b2)
a1-a2-b1-b2-|
```

### `switchMap`
Switches to the latest inner publisher and abandons older ones.

```text
A ---- B ----|
switchMap
(a1-a2-a3)
      (b1-b2)
a1----b1-b2-|
```

## Filtering and limiting
### `filter`
```text
1 -- 2 -- 3 -- 4 --|
filter(even)
2 -------- 4 ------|
```

### `take`
Take the first `n` values, then complete.

### `takeUntil`
Continue until a predicate becomes true.

## Combining streams
### `zip`
Pair values by position.

```text
A --- B --- C ---|
1 --- 2 --- 3 ---|
zip
(A,1)-(B,2)-(C,3)-|
```

### `merge`
Interleave values as they arrive.

### `combineLatest`
Emit whenever either side updates, using the latest value from both.

## Aggregation
### `collectList`
Turn many signals into one `Mono<List<T>>`.

### `reduce`
Fold the stream into one accumulated value.

## RxJS ↔ Reactor quick comparison
| Concept | RxJS | Reactor |
|---|---|---|
| Single async value | `Observable<T>` | `Mono<T>` |
| Many async values | `Observable<T>` | `Flux<T>` |
| transform | `map` | `map` |
| async transform | `mergeMap` / `flatMap` | `flatMap` |
| ordered async transform | `concatMap` | `concatMap` |
| latest-only async transform | `switchMap` | `switchMap` |
| pair by position | `zip` | `zip` |
| combine latest values | `combineLatest` | `combineLatest` |
| gather all values | `toArray` | `collectList` |
| accumulate | `reduce` | `reduce` |

The big mental shift for RxJS users is usually not operators — it is remembering when a Reactor pipeline is being executed on the server event loop and when a blocking call would be harmful.
