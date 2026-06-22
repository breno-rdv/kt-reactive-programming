package com.kt.reactive.demos;

import java.time.Duration;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public final class D01_MonoFluxBasics {

    private D01_MonoFluxBasics() {
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== Mono examples ===");
        Mono.just("hello reactor")
            .log("mono.just")
            .subscribe(
                value -> System.out.println("Mono.just value: " + value),
                error -> System.err.println("Mono.just error: " + error.getMessage()),
                () -> System.out.println("Mono.just complete")
            );

        Mono.<String>empty()
            .log("mono.empty")
            .subscribe(
                value -> System.out.println("Mono.empty value: " + value),
                error -> System.err.println("Mono.empty error: " + error.getMessage()),
                () -> System.out.println("Mono.empty complete")
            );

        Mono.<String>error(new IllegalStateException("boom"))
            .log("mono.error")
            .subscribe(
                value -> System.out.println("Mono.error value: " + value),
                error -> System.err.println("Mono.error error: " + error.getMessage()),
                () -> System.out.println("Mono.error complete")
            );

        System.out.println("\n=== Flux examples ===");
        Flux.just("red", "green", "blue")
            .log("flux.just")
            .subscribe(
                value -> System.out.println("Flux.just value: " + value),
                error -> System.err.println("Flux.just error: " + error.getMessage()),
                () -> System.out.println("Flux.just complete")
            );

        Flux.fromIterable(List.of("spring", "reactor", "webflux"))
            .subscribe(value -> System.out.println("fromIterable: " + value));

        Flux.range(1, 5)
            .subscribe(value -> System.out.println("range: " + value));

        var latch = new CountDownLatch(1);
        Flux.interval(Duration.ofMillis(250))
            .take(4)
            .log("flux.interval")
            .subscribe(
                value -> System.out.println("interval tick: " + value),
                error -> {
                    System.err.println("interval error: " + error.getMessage());
                    latch.countDown();
                },
                latch::countDown
            );

        // block() is occasionally useful in tests or migration seams, but it defeats non-blocking execution in live request paths.
        var blockedValue = Mono.just("only for demos").block();
        System.out.println("block() returned: " + blockedValue);

        latch.await();
    }
}
