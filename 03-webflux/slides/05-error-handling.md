# Error Handling

## Errors are terminal signals
In Reactor, an error is not just a thrown exception floating in space.
It is a **terminal signal** in the stream.

```text
A ---- B ---- X
```

Once a publisher terminates with `onError`, it does not keep emitting further values.

## `onErrorReturn`
Use when a single fallback value is enough.

```java
Mono.just("ok")
    .map(value -> risky(value))
    .onErrorReturn("fallback");
```

## `onErrorResume`
Use when recovery needs another publisher.

```java
Mono.just("42")
    .flatMap(this::callRemote)
    .onErrorResume(ex -> Mono.just("cached-result"));
```

## `onErrorMap`
Transform technical exceptions into domain-oriented ones.

```java
serviceCall()
    .onErrorMap(ex -> new IllegalStateException("Inventory lookup failed", ex));
```

## `retry` / `retryWhen`
Use retries for transient failures, not permanent ones.

```java
serviceCall()
    .retryWhen(Retry.backoff(3, Duration.ofMillis(100)));
```

Exponential backoff avoids turning a struggling downstream system into a denial-of-service target.

## Side-effect hooks
### `doOnError`
Observe failures for logging or metrics.

### `doFinally`
Run cleanup logic regardless of complete, error, or cancel.

## Error propagation in chains
If an inner publisher fails in `flatMap`, the error flows downstream unless you recover.
That is why recovery should happen near the boundary where you understand the business fallback.
