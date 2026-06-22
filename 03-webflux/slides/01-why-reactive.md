# Why Reactive?

## The C10K problem
The C10K problem asks a simple question: how do you serve **10,000+ concurrent connections** without dedicating a blocked thread to each one?

Traditional servlet stacks often map **one request -> one thread**:
- Simple mental model
- Expensive at high concurrency because threads consume memory, context switches, and scheduler time
- A blocked thread waiting on the network still occupies resources

Reactive systems attack the waiting problem instead of trying to make blocked threads cheaper.

## Blocking vs non-blocking I/O
```text
Blocking I/O
-----------
Request A ---> [thread-1 waiting on DB.................] ---> response
Request B ---> [thread-2 waiting on HTTP...............] ---> response
Request C ---> [thread-3 waiting on file...............] ---> response

Non-blocking I/O
----------------
Event loop ---> start DB call ----> continue serving other work
           \-> start HTTP call --> resume when socket is ready
           \-> start file call --> resume when result arrives
```

## Thread-per-request vs event-loop model
```text
Thread-per-request
------------------
request -> worker thread -> blocking call -> response
request -> worker thread -> blocking call -> response
request -> worker thread -> blocking call -> response

Event loop / reactive
---------------------
request -> event loop -> async work registered -> callback/signal -> response
```

### Why event loops scale better for I/O-bound systems
- Threads are no longer the unit of waiting
- A small number of event-loop threads can multiplex many in-flight requests
- Throughput improves when your bottleneck is network or disk latency rather than CPU

## When to use reactive
Use reactive when:
- The workload is **I/O-bound**
- You call databases, other services, queues, or streams concurrently
- You need predictable behavior under high concurrency
- Streaming data is part of the design

Avoid reactive when:
- The workload is mostly **CPU-bound** and does not spend time waiting
- The team will mostly call blocking libraries anyway
- Simpler imperative code is easier to maintain for the problem at hand

## Reactive Manifesto
Reactive systems aim to be:
- **Responsive** — answer in a timely way
- **Resilient** — stay responsive despite failure
- **Elastic** — stay responsive under varying load
- **Message-Driven** — rely on asynchronous message passing and clear boundaries

That manifesto is broader than Reactor or WebFlux, but it explains why non-blocking programming matters in modern distributed systems.
