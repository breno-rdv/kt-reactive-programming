# 08 — Subjects

A Subject is both:
- an Observable
- an Observer

That means it can receive values and multicast them to many subscribers.

## `Subject`
- multicast
- no initial value
- no replay for late subscribers

```text
sub A:    ^-----------
subject:  --1--2--3--|
A sees:   --1--2--3--|
sub B:       ^--------
B sees:      2--3--|
```

Use when you need a simple event bus.

## `BehaviorSubject`
- requires an initial value
- stores current value
- new subscribers immediately receive the latest value

```text
initial: 0
stream:  0--1--2--3--|
late B:        ^------
B gets:        2-3--|
```

Use for app state, selected item, current user, theme.

## `ReplaySubject(n)`
- no required initial value
- replays last `n` values to late subscribers

```text
subject:   --1--2--3--4--|
Replay(2)
late B:            ^------
B gets:            3--4--|
```

Use when late subscribers need recent history.

## `AsyncSubject`
- keeps only the last value
- emits it **only when completed**

```text
subject:   --1--2--3--|
result:    --------3|
```

Use when only the final result matters.

## Decision table
| Type | Initial value? | Replays to late subscribers? | Emits before complete? | Best for |
|---|---|---|---|---|
| `Subject` | no | no | yes | event bus |
| `BehaviorSubject` | yes | latest 1 | yes | current state |
| `ReplaySubject(n)` | no | last `n` | yes | recent history/cache |
| `AsyncSubject` | no | final 1 on complete | no | final result only |

## Rule of thumb
- event stream → `Subject`
- current state → `BehaviorSubject`
- history needed → `ReplaySubject`
- final value only → `AsyncSubject`
