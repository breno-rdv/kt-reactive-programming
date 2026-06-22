# Project Reactor

## Reactor vs RxJava vs RxJS
Reactor, RxJava, and RxJS all come from the **ReactiveX lineage**:
- They model asynchronous work as streams
- They share familiar operator names like `map`, `filter`, `zip`, and `flatMap`
- They differ mainly in host language integration and ecosystem choices

For Java + Spring, Reactor is the native choice because Spring WebFlux is built on it.

## `Mono<T>` — 0 or 1 element
Think of `Mono<T>` as the Reactor type for:
- an optional async value
- a single async result
- a completion-only signal when the generic type is `Void`

```text
Mono marble diagram
-------------------
source:  ----(A)|
empty:   ----|
error:   ----X
```

## `Flux<T>` — 0 to N elements
`Flux<T>` is the stream type for multiple values over time.

```text
Flux marble diagram
-------------------
----A----B----C----D----|
----A----B----X
----|
```

## Cold vs Hot publishers
### Cold
A cold publisher starts work per subscriber.
Examples:
- `Flux.range(1, 3)`
- `Mono.fromCallable(...)`
- most HTTP/database pipelines

Each subscriber gets its own replay of the sequence.

### Hot
A hot publisher emits independently of late subscribers.
Examples:
- shared message stream
- SSE or WebSocket feed
- `Sinks.Many`-based live source

Late subscribers join the current moment, not the beginning.

## Publisher/Subscriber contract
Reactor implements the **Reactive Streams** contract:
1. `Publisher` exposes data
2. `Subscriber` subscribes
3. `Subscription` lets the subscriber request data with `request(n)` or cancel
4. Signals are serialized as `onSubscribe`, `onNext`, `onError`, `onComplete`

That contract matters because it standardizes **backpressure**, which is one of the biggest reasons Reactor is more than "just async callbacks".
