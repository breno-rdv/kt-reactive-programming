package com.kt.reactive.demos;

import java.time.Duration;
import java.util.concurrent.atomic.AtomicInteger;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

public final class D04_ErrorHandling {

    private D04_ErrorHandling() {
    }

    public static void main(String[] args) {
        Mono.just("start")
            .map(D04_ErrorHandling::riskyTransform)
            .onErrorReturn("fallback-value")
            .subscribe(value -> System.out.println("onErrorReturn -> " + value));

        Mono.just("resume")
            .flatMap(value -> failingRemoteCall())
            .onErrorResume(error -> Mono.just("fallback-publisher"))
            .subscribe(value -> System.out.println("onErrorResume -> " + value));

        Mono.just("map-error")
            .flatMap(value -> failingRemoteCall())
            .onErrorMap(error -> new IllegalStateException("Wrapped failure", error))
            .subscribe(
                value -> System.out.println("unexpected value -> " + value),
                error -> System.out.println("onErrorMap -> " + error)
            );

        var attempts = new AtomicInteger();
        Mono.defer(() -> {
                var attempt = attempts.incrementAndGet();
                if (attempt < 3) {
                    return Mono.error(new IllegalStateException("transient failure on attempt " + attempt));
                }
                return Mono.just("success on attempt " + attempt);
            })
            .retryWhen(Retry.backoff(3, Duration.ofMillis(50)))
            .doOnError(error -> System.out.println("doOnError saw -> " + error.getMessage()))
            .doFinally(signal -> System.out.println("doFinally signal -> " + signal))
            .blockOptional()
            .ifPresent(value -> System.out.println("retryWhen -> " + value));

        Flux.just("A", "B")
            .concatWith(Mono.error(new RuntimeException("terminal failure")))
            .doOnError(error -> System.out.println("propagated error -> " + error.getMessage()))
            .subscribe(
                value -> System.out.println("value -> " + value),
                error -> System.out.println("subscriber saw -> " + error.getMessage())
            );
    }

    private static String riskyTransform(String value) {
        throw new IllegalArgumentException("Cannot transform " + value);
    }

    private static Mono<String> failingRemoteCall() {
        return Mono.delay(Duration.ofMillis(10))
            .flatMap(ignored -> Mono.error(new RuntimeException("remote call failed")));
    }
}
