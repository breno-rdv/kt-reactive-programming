package com.kt.reactive.solutions;

import reactor.core.publisher.Flux;

public final class Exercise03Solution {

    private Exercise03Solution() {
    }

    public static <T> Flux<T> cacheResults(Flux<T> source) {
        // cache() is a deliberate trade-off: spend memory so later subscribers do not repeat slow upstream work.
        return source.cache();
    }
}
