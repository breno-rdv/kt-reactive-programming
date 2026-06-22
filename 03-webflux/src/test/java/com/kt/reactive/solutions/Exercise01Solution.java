package com.kt.reactive.solutions;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public final class Exercise01Solution {

    private Exercise01Solution() {
    }

    public static Flux<Integer> evenSquares(Flux<Integer> source) {
        // Keeping transformation logic as a pure pipeline makes it easy to test and compose later.
        return source
            .filter(number -> number % 2 == 0)
            .map(number -> number * number);
    }

    public static Mono<String> recoverWithFallback(Mono<String> source, String fallback) {
        return source.onErrorReturn(fallback);
    }
}
