# Schedulers

## Why schedulers matter
Reactor is concurrency-agnostic by default.
Nothing happens on another thread unless you say so or an async source already uses one.

## Common schedulers
### `Schedulers.parallel()`
Use for CPU-oriented parallel work.
- Fixed-size worker pool
- Good when tasks are short and compute-heavy

### `Schedulers.boundedElastic()`
Use when you must isolate blocking or slow I/O code.
- Grows within safe bounds
- Prevents blocking calls from freezing event-loop threads

### `Schedulers.single()`
One dedicated thread reused for serialized work.
- Useful for ordering-sensitive flows or demonstrations

## `publishOn` vs `subscribeOn`
### `subscribeOn`
Changes where the subscription and upstream source run.

```text
subscriber -> subscribeOn(single)
           -> source runs on [single-1]
```

### `publishOn`
Changes the thread used by downstream operators after the handoff point.

```text
source [thread-A] -> map [thread-A] -> publishOn(parallel)
                                   -> filter [parallel-1]
                                   -> reduce [parallel-1]
```

### Critical difference
- `subscribeOn` affects the **upstream starting point**
- `publishOn` affects the **downstream continuation point**

## WebFlux threading model
Spring WebFlux commonly runs on Netty's event-loop threads.
That is great for non-blocking handlers because a few threads can serve many sockets.

It is dangerous to block those threads because one blocked event loop delays unrelated requests.
If you must call blocking code, isolate it with `boundedElastic()` or, better, use a non-blocking driver.
