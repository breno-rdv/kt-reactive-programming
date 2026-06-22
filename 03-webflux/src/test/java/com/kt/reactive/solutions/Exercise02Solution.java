package com.kt.reactive.solutions;

import java.time.Duration;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

public final class Exercise02Solution {

    private Exercise02Solution() {
    }

    public static Mono<String> zipNames(Mono<String> left, Mono<String> right) {
        return Mono.zip(left, right, (first, second) -> first + "-" + second);
    }

    public static <T> Mono<T> retryWithBackoff(Mono<T> source, long maxRetries, Duration firstBackoff) {
        // Centralizing retry policy avoids scattering magic timing values through business pipelines.
        return source.retryWhen(Retry.backoff(maxRetries, firstBackoff));
    }
}
