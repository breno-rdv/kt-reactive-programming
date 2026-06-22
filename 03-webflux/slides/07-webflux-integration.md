# WebFlux Integration

## Two endpoint styles
### Annotated controllers
Closest to Spring MVC, but return `Mono`/`Flux` instead of concrete values.

```java
@RestController
@RequestMapping("/products")
class ProductController {
    @GetMapping
    Flux<Product> findAll() { ... }
}
```

### Functional routing
Separates route declarations from handler logic.

```java
@Bean
RouterFunction<ServerResponse> routes(ProductHandler handler) {
    return RouterFunctions.route()
        .GET("/functional/products", handler::getAll)
        .build();
}
```

## `RouterFunction` + `HandlerFunction`
This pattern is useful when:
- you want explicit routing as code
- you like composable request pipelines
- you prefer lightweight handlers over annotation-based controllers

## `WebClient`
`WebClient` is Spring's non-blocking HTTP client.

```java
var client = WebClient.builder()
    .baseUrl("https://example.org")
    .build();

Mono<String> body = client.get()
    .uri("/api/status")
    .retrieve()
    .bodyToMono(String.class);
```

## SSE with `Flux`
Server-Sent Events fit naturally with a stream.

```java
@GetMapping(value = "/events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
Flux<String> events() {
    return Flux.interval(Duration.ofSeconds(1))
        .map(tick -> "tick-" + tick);
}
```

## WebSocket overview
WebFlux also supports WebSockets via reactive handlers:
- inbound messages are a `Flux`
- outbound messages are usually a `Flux` or `Mono<Void>`
- great fit for live updates and bidirectional messaging

## Practical rule of thumb
Choose the style that keeps your team productive.
The important part is not the syntax — it is preserving non-blocking boundaries through the whole request path.
