# 07 — Error Handling

## Error propagation contract
In RxJS, an `error` notification is terminal.

```text
source: --1--2--X
result: --1--2--X
```

After an error:
- no more `next`
- no `complete`
- stream is done

## `catchError`
Recover by replacing the failed stream.

```text
source:      --1--2--X
fallback:              --99--|
result:      --1--2----99--|
```

Typical uses:
- fallback values
- graceful degradation
- convert failure into user-friendly state

## `retry(n)`
Resubscribe up to `n` times after failure.

```text
attempt 1: --1--X
attempt 2: --1--X
attempt 3: --1--2--|
```

Use when failures are transient.

## `retryWhen`
Custom retry strategy driven by another Observable.

Common additions:
- backoff delay
- maximum attempts
- retry only for specific errors

```text
error$:        X---X---X
retryWhen:     ---r---r---stop
```

## `finalize`
Always runs when the stream ends:
- completion
- error
- unsubscribe

Use it like `finally`.

```js
source$.pipe(finalize(() => console.log('cleanup')))
```

## Practical rules
- recover locally with `catchError`
- retry only if retrying makes sense
- put cleanup in `finalize`
- remember: an unhandled error ends the stream
