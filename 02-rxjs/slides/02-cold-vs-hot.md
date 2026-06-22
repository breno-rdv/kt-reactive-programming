# 02 — Cold vs Hot Observables

## Cold Observable
A cold Observable creates a **new execution per subscriber**.

Examples:
- HTTP request function
- file read
- `of(...)`
- `interval(...)` created inside a pipeline per subscription

```text
source$:     --1--2--3--|
sub A:       ^-----------
A receives:  --1--2--3--|
sub B:         ^---------
B receives:    --1--2--3--|
```

Each subscriber gets its own timeline.

### Real-world intuition
Calling `getUser$()` twice can trigger **two separate HTTP requests**.

## Hot Observable
A hot Observable has **shared execution**.
Subscribers join an already-running stream.
Late subscribers can miss past values.

Examples:
- DOM clicks
- websocket messages
- shared timer
- central app event bus

```text
producer:    --1--2--3--4--5--
sub A:       ^----------------
A receives:  --1--2--3--4--5--
sub B:            ^-----------
B receives:       3--4--5--
```

## Key difference
- **Cold**: producer starts because you subscribe
- **Hot**: producer exists independently of your subscription

## `share()`
`share()` turns a cold source into a **shared** Observable.
Subscribers share one underlying execution while subscribed.

```js
const shared$ = httpLike$.pipe(share());
```

Use when:
- you want one execution shared by multiple subscribers
- you want to avoid duplicate side effects

## `shareReplay()`
`shareReplay()` also shares execution, but it **replays past values** to late subscribers.

```js
const cached$ = config$.pipe(shareReplay({ bufferSize: 1, refCount: true }));
```

Use when:
- late subscribers still need the latest value
- you want cache-like behavior

## ASCII comparison
```text
Cold:
sub A -> [new producer]
sub B -> [new producer]

Hot with share():
sub A -> [shared producer] <- sub B

Hot with shareReplay(1):
sub A -> [shared producer + last value cache] <- sub B
```

## Decision hints
- Use **cold** for isolated, repeatable work
- Use **share()** for multicasting ongoing work
- Use **shareReplay(1)** for "latest value" style state/config/cache
