package com.kt.reactive.api;

import com.kt.reactive.model.Product;
import java.math.BigDecimal;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class ProductHandler {

    private final Map<String, Product> products = new ConcurrentHashMap<>(Map.of(
        "fp-100", new Product("fp-100", "Async Mouse", BigDecimal.valueOf(80), "hardware"),
        "fp-200", new Product("fp-200", "Cloud Headset", BigDecimal.valueOf(199), "hardware"),
        "fp-300", new Product("fp-300", "Domain Modeling", BigDecimal.valueOf(75), "books")
    ));

    public Mono<ServerResponse> getAll(ServerRequest request) {
        // Functional handlers make the response-building steps explicit, which is useful for teaching routing internals.
        return ServerResponse.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(Flux.fromIterable(products.values()), Product.class);
    }

    public Mono<ServerResponse> getById(ServerRequest request) {
        var id = request.pathVariable("id");
        var product = products.get(id);

        if (product == null) {
            return ServerResponse.notFound().build();
        }

        return ServerResponse.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(product);
    }

    public Mono<ServerResponse> create(ServerRequest request) {
        return request.bodyToMono(Product.class)
            .flatMap(product -> {
                products.put(product.id(), product);
                return ServerResponse.status(HttpStatus.CREATED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(product);
            });
    }
}
