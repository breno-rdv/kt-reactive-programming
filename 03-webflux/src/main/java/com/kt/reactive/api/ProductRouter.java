package com.kt.reactive.api;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class ProductRouter {

    @Bean
    RouterFunction<ServerResponse> productRoutes(ProductHandler handler) {
        // The /functional prefix keeps both teaching styles active in one app, so students can compare them live.
        return RouterFunctions.route()
            .GET("/functional/products", handler::getAll)
            .GET("/functional/products/{id}", handler::getById)
            .POST("/functional/products", handler::create)
            .build();
    }
}
