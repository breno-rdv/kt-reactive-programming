package com.kt.reactive.exercises;

import org.junit.jupiter.api.Test;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

class Exercise01Test {

    @Test
    void filtersEvenNumbersThenMapsToSquares() {
        // TODO: Start from the provided Flux and express the whole transformation as one fluent chain.
        var result = Flux.range(1, 6)
            .filter(number -> number % 2 == 0)
            .map(number -> number * number);

        StepVerifier.create(result)
            .expectNext(4, 16, 36)
            .verifyComplete();
    }

    @Test
    void recoversWithOnErrorReturn() {
        // TODO: Replace the fallback value and observe how terminal errors stop the original sequence.
        var recovered = Mono.<String>error(new IllegalArgumentException("boom"))
            .onErrorReturn("fallback");

        StepVerifier.create(recovered)
            .expectNext("fallback")
            .verifyComplete();
    }
}
