package com.kt.reactive.api;

import com.kt.reactive.model.Product;
import java.math.BigDecimal;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final Map<String, Product> products = new ConcurrentHashMap<>(Map.of(
        "p-100", new Product("p-100", "Keyboard", BigDecimal.valueOf(120), "hardware"),
        "p-200", new Product("p-200", "Monitor", BigDecimal.valueOf(899), "hardware"),
        "p-300", new Product("p-300", "Reactive Spring", BigDecimal.valueOf(59), "books")
    ));

    @GetMapping
    public Flux<Product> getProducts() {
        // Returning a Flux keeps the endpoint naturally stream-friendly if the backing store ever grows.
        return Flux.fromIterable(products.values());
    }

    @GetMapping("/{id}")
    public Mono<Product> getProductById(@PathVariable String id) {
        // Wrapping the lookup in Mono keeps the HTTP contract aligned with a single async result.
        return Mono.justOrEmpty(products.get(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Product> createProduct(@RequestBody Mono<Product> productMono) {
        return productMono.map(product -> {
            products.put(product.id(), product);
            return product;
        });
    }
}
