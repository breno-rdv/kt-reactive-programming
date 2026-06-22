# WebFlux Exercises

These exercises are meant to be solved with `StepVerifier` and discussed alongside the slides.

## Exercise 01
- Filter even numbers from a `Flux`
- Map them to squares
- Recover from an error with `onErrorReturn`

## Exercise 02
- Combine two `Mono` values with `zip`
- Add retry with exponential backoff
- Use virtual time so the test stays fast

## Exercise 03
- Simulate a slow database with `delayElements`
- Cache the result with `cache()`
- Prove the second subscriber is faster and does not hit the source again

## Suggested facilitation flow
1. Ask learners to read the TODO comments in `src/test/java/com/kt/reactive/exercises`
2. Let them implement or tweak the reactive pipelines
3. Reveal the reference implementations under `src/test/java/com/kt/reactive/solutions`
4. Re-run `mvn test` after each exercise to keep feedback tight
