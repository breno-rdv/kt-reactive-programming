package com.kt.reactive.demos;

import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

public final class D05_Schedulers {

    private D05_Schedulers() {
    }

    public static void main(String[] args) {
        System.out.println("=== subscribeOn ===");
        Flux.range(1, 3)
            .doOnSubscribe(subscription -> log("subscribed"))
            .map(value -> {
                log("map before subscribeOn -> " + value);
                return value;
            })
            .subscribeOn(Schedulers.single())
            .doOnNext(value -> log("received after subscribeOn -> " + value))
            .blockLast();

        System.out.println("\n=== publishOn ===");
        Flux.range(1, 3)
            .doOnSubscribe(subscription -> log("subscribed"))
            .map(value -> {
                log("map before publishOn -> " + value);
                return value;
            })
            .publishOn(Schedulers.parallel())
            .map(value -> {
                log("map after publishOn -> " + value);
                return value * 10;
            })
            .doOnNext(value -> log("received after publishOn -> " + value))
            .blockLast();
    }

    private static void log(String message) {
        System.out.printf("[%s] %s%n", Thread.currentThread().getName(), message);
    }
}
