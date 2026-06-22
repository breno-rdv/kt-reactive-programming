# Testing Reactor and WebFlux

## `StepVerifier`
`StepVerifier` subscribes to a publisher and lets you describe expected signals.

```java
StepVerifier.create(Flux.just(1, 2, 3))
    .expectNext(1, 2, 3)
    .verifyComplete();
```

## Common assertions
- `expectNext(...)`
- `expectNextCount(n)`
- `expectError(...)`
- `verifyComplete()`

These assertions matter because reactive correctness is about signal order, termination, and timing — not just final values.

## Virtual time
Use `StepVerifier.withVirtualTime(...)` when the sequence depends on timers.

```java
StepVerifier.withVirtualTime(() -> Flux.interval(Duration.ofSeconds(1)).take(3))
    .thenAwait(Duration.ofSeconds(3))
    .expectNext(0L, 1L, 2L)
    .verifyComplete();
```

Virtual time keeps tests fast and deterministic.

## `WebTestClient`
Use `WebTestClient` for WebFlux integration tests.

```java
webTestClient.get()
    .uri("/products")
    .exchange()
    .expectStatus().isOk()
    .expectBodyList(Product.class).hasSize(3);
```

## Testing error scenarios
Reactive tests should verify:
- the exception type
- the fallback behavior
- retry behavior when time is involved
- whether cleanup hooks ran when cancellation or failure happened
