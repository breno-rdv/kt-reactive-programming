package com.kt.reactive.exercises;

import java.time.Duration;
import java.util.concurrent.atomic.AtomicInteger;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;
import reactor.util.retry.Retry;

class Exercise02Test {

    @Test
    void combinesTwoMonosWithZip() {
        // TODO: Try replacing zip with nested flatMap calls, then compare readability.
        var combined = Mono.zip(
                Mono.just("spring"),
                Mono.just("webflux"),
                (left, right) -> left + "-" + right
            );

        StepVerifier.create(combined)
            .expectNext("spring-webflux")
            .verifyComplete();
    }

    @Test
    void retriesWithBackoffUntilTheThirdAttempt() {
        var attempts = new AtomicInteger();

        // TODO: Experiment with the backoff and max attempts to see when the test starts failing.
        StepVerifier.withVirtualTime(() -> Mono.defer(() -> {
                var attempt = attempts.incrementAndGet();
                if (attempt < 3) {
                    return Mono.error(new IllegalStateException("attempt " + attempt));
                }
                return Mono.just("success");
            }).retryWhen(Retry.backoff(2, Duration.ofSeconds(1))))
            .thenAwait(Duration.ofSeconds(3))
            .expectNext("success")
            .verifyComplete();
    }
}
