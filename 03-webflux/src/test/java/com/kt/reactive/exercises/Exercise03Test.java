package com.kt.reactive.exercises;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.atomic.AtomicInteger;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;

class Exercise03Test {

    @Test
    void cachesSlowDatabaseResultsForLaterSubscribers() {
        var subscriptions = new AtomicInteger();
        var cachedProducts = Flux.defer(() -> {
                subscriptions.incrementAndGet();
                return Flux.just("p-100", "p-200", "p-300")
                    .delayElements(Duration.ofMillis(80));
            })
            // TODO: Add or remove cache() to see how it changes both timing and subscription count.
            .cache();

        StepVerifier.create(cachedProducts)
            .expectNext("p-100", "p-200", "p-300")
            .verifyComplete();

        var startedAt = Instant.now();

        StepVerifier.create(cachedProducts)
            .expectNext("p-100", "p-200", "p-300")
            .verifyComplete();

        var elapsedMillis = Duration.between(startedAt, Instant.now()).toMillis();

        assertThat(subscriptions.get()).isEqualTo(1);
        assertThat(elapsedMillis).isLessThan(50);
    }
}
