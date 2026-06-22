# Level 3 — Spring WebFlux

This level teaches Spring WebFlux and Project Reactor to advanced Java developers who already understand RxJS or broader reactive concepts.

## Learning goals
- Understand why reactive systems trade thread-per-request for non-blocking event loops
- Translate familiar RxJS ideas into Reactor's `Mono` and `Flux`
- Practice the operators, backpressure strategies, schedulers, and error handling patterns used in production
- Compare annotated controllers with functional routing in Spring WebFlux
- Write tests with `StepVerifier` and `WebTestClient`

## Structure
- `slides/` — concise teaching notes for an instructor-led session or self-study
- `src/main/java/com/kt/reactive/demos` — runnable demos that show Reactor behavior on the console
- `src/main/java/com/kt/reactive/api` — WebFlux API samples using both annotated and functional styles
- `src/test/java/com/kt/reactive/exercises` — hands-on exercises using JUnit 5 and `StepVerifier`
- `src/test/java/com/kt/reactive/solutions` — reference solutions after learners try the exercises themselves

## Run the module
```bash
cd 03-webflux
mvn test
mvn spring-boot:run
```

## Run the demos
Each demo has a `main` method, so you can run them directly from your IDE.

Suggested order:
1. `D01_MonoFluxBasics`
2. `D02_Operators`
3. `D03_Backpressure`
4. `D04_ErrorHandling`
5. `D05_Schedulers`
6. `D06_Combining`

## HTTP samples
- Annotated controller: `GET /products`, `GET /products/{id}`, `POST /products`
- Functional routing: `GET /functional/products`, `GET /functional/products/{id}`, `POST /functional/products`

The functional endpoints intentionally live under `/functional` so both approaches can run in the same application without route collisions.
