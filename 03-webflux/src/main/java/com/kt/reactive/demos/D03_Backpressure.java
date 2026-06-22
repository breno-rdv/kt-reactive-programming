package com.kt.reactive.demos;

import java.time.Duration;
import java.util.concurrent.CountDownLatch;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

public final class D03_Backpressure {

    private D03_Backpressure() {
    }

    public static void main(String[] args) throws InterruptedException {
        demonstrateBuffer();
        demonstrateDrop();
    }

    private static void demonstrateBuffer() throws InterruptedException {
        System.out.println("=== onBackpressureBuffer ===");
        var latch = new CountDownLatch(1);

        Flux.interval(Duration.ofMillis(10))
            .onBackpressureBuffer(8, value -> System.out.println("buffer overflow at: " + value))
            .publishOn(Schedulers.boundedElastic(), 1)
            .take(12)
            .doFinally(signal -> latch.countDown())
            .subscribe(value -> {
                sleep(60);
                System.out.println("buffered consumer received: " + value);
            });

        latch.await();
    }

    private static void demonstrateDrop() throws InterruptedException {
        System.out.println("\n=== onBackpressureDrop ===");
        var latch = new CountDownLatch(1);

        Flux.interval(Duration.ofMillis(10))
            .onBackpressureDrop(value -> System.out.println("dropped: " + value))
            .publishOn(Schedulers.boundedElastic(), 1)
            .take(12)
            .doFinally(signal -> latch.countDown())
            .subscribe(value -> {
                sleep(60);
                System.out.println("slow consumer received: " + value);
            });

        latch.await();
    }

    private static void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
    }
}
