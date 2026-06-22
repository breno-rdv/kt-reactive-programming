package com.kt.reactive.demos;

import java.time.Duration;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public final class D02_Operators {

    private D02_Operators() {
    }

    public static void main(String[] args) {
        Flux.range(1, 6)
            .map(number -> number * number)
            .filter(square -> square % 2 == 0)
            .subscribe(value -> System.out.println("even square: " + value));

        Flux.just("alpha", "beta", "gamma")
            .flatMap(word -> Mono.just(word.toUpperCase())
                .delayElement(Duration.ofMillis(50)))
            .collectList()
            .subscribe(values -> System.out.println("flatMap + collectList: " + values));

        Flux.zip(
                Flux.just("A", "B", "C"),
                Flux.range(1, 3),
                (letter, number) -> letter + number
            )
            .subscribe(value -> System.out.println("zip: " + value));

        Flux.merge(
                Flux.just("slow-1", "slow-2").delayElements(Duration.ofMillis(75)),
                Flux.just("fast-1", "fast-2").delayElements(Duration.ofMillis(25))
            )
            .collectList()
            .blockOptional()
            .ifPresent(values -> System.out.println("merge order: " + values));

        Flux.range(1, 4)
            .reduce(0, Integer::sum)
            .subscribe(total -> System.out.println("reduce total: " + total));
    }
}
