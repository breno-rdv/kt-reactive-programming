# 05 — Filtering Operators

## `filter`
Keep only values matching a predicate.

```text
source:  --1--2--3--4--|
filter:  -----2-----4--|
```

## `take`
Take the first `n` values, then complete.

```text
source:  --1--2--3--4--|
take(2): --1--2|
```

## `takeUntil`
Keep values until another Observable emits.

```text
source:     --1--2--3--4--5-->
stop$:      --------S
result:     --1--2--3|
```

## `skip`
Ignore the first `n` values.

```text
source:  --1--2--3--4--|
skip(2): ------3--4--|
```

## `debounceTime`
Wait for silence before emitting the most recent value.

```text
source:        -a-b---c----d----|
debounce(3):   -------b---c----d|
```

Great for search boxes and typing.

## `throttleTime`
Emit one value, then suppress new ones for a window.

```text
source:        -a-b-c---d-e----|
throttle(3):   -a-----d--------|
```

Great for scroll/resize rate limiting.

## `distinctUntilChanged`
Emit only when the current value differs from the previous one.

```text
source:   --a--a--b--b--a--|
result:   --a-----b-----a--|
```

## `first`
Emit the first matching value and complete.

```text
source:  --1--2--3--|
first(): --1|
```

## `last`
Wait for completion, then emit the last matching value.

```text
source: --1--2--3--|
last(): ---------3|
```

## Choosing quickly
- value-based predicate → `filter`
- only first few → `take`
- stop on signal → `takeUntil`
- ignore warm-up values → `skip`
- wait for pause → `debounceTime`
- rate-limit bursts → `throttleTime`
- drop consecutive duplicates → `distinctUntilChanged`
- first matching item → `first`
- final item after completion → `last`
