package com.kt.reactive.demos;

import java.time.Duration;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public final class D06_Combining {

    private D06_Combining() {
    }

    public static void main(String[] args) {
        var letters = Flux.just("A", "B", "C").delayElements(Duration.ofMillis(30));
        var numbers = Flux.just(1, 2, 3).delayElements(Duration.ofMillis(50));

        Flux.zip(letters, numbers, (letter, number) -> letter + number)
            .collectList()
            .blockOptional()
            .ifPresent(values -> System.out.println("zip -> " + values));

        Flux.combineLatest(
                Flux.just("USD", "EUR").delayElements(Duration.ofMillis(20)),
                Flux.just(5, 10, 15).delayElements(Duration.ofMillis(40)),
                (currency, amount) -> currency + " " + amount
            )
            .collectList()
            .blockOptional()
            .ifPresent(values -> System.out.println("combineLatest -> " + values));

        Flux.merge(
                Flux.just("merge-a", "merge-b").delayElements(Duration.ofMillis(25)),
                Flux.just("merge-1", "merge-2").delayElements(Duration.ofMillis(10))
            )
            .collectList()
            .blockOptional()
            .ifPresent(values -> System.out.println("merge -> " + values));

        Flux.concat(
                Flux.just("first", "second"),
                Flux.just("third", "fourth")
            )
            .collectList()
            .blockOptional()
            .ifPresent(values -> System.out.println("concat -> " + values));

        Flux.just("cat", "dog")
            .flatMap(animal -> Mono.just(animal.toUpperCase()).delayElement(Duration.ofMillis(15)))
            .collectList()
            .blockOptional()
            .ifPresent(values -> System.out.println("flatMap -> " + values));
    }
}
