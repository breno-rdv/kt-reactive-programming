# Backpressure

## What is backpressure?
Backpressure is the ability of a consumer to say:
> "I can only handle data at this rate right now."

Without backpressure, a fast producer can overwhelm memory, saturate queues, or make latency explode.

## Fast producer + slow consumer
```text
producer: P-P-P-P-P-P-P-P-P-P-...
consumer: C-----C-----C-----C-...

Without coordination:
- items pile up
- memory grows
- response time becomes unpredictable
```

## Reactive Streams `request(n)`
Reactive Streams formalizes demand:
- subscriber receives `onSubscribe(subscription)`
- subscriber asks for data with `subscription.request(n)`
- publisher must not emit more than requested

That protocol is why Reactor can model pressure explicitly instead of hiding it.

## Common strategies
### BUFFER
Store items until the consumer catches up.
- Good when bursts are short
- Dangerous when producers outrun consumers for too long

### DROP
Drop excess items.
- Good when freshness matters more than completeness
- Typical for telemetry or live dashboards

### LATEST
Keep only the newest item.
- Good when stale intermediate values are not useful

### ERROR
Fail fast when pressure cannot be honored.
- Good when losing data is unacceptable and buffering would be unsafe

## Reactor operators
- `onBackpressureBuffer(...)`
- `onBackpressureDrop(...)`
- `onBackpressureLatest()`

## Key design lesson
Backpressure is not a magic performance switch.
It forces you to choose the right trade-off for the domain:
- keep everything
- lose some data
- keep only the latest
- fail loudly
