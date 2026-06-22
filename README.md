# Reactive Programming — Knowledge Transfer

> A progressive, hands-on curriculum for developers at every level.

---

## 🗺️ Learning Path

```
┌───────────────────────────────────────────-──────────────────┐
│                 REACTIVE PROGRAMMING KT                      │
│                                                              │
│  ① Foundations          ② RxJS             ③ WebFlux       │
│  (All levels)           (Intermediate)      (Advanced)       │
│                                                              │
│  Observer Pattern  ──▶   Observables     ──▶  Mono / Flux    │
│  Iterator Pattern        Operators            Backpressure   │
│  Pull vs Push            Subjects             Spring WebFlux │
│  Build an Observable     Real-world           StepVerifier   │
│  Language: JS            Language: JS/TS      Language: Java │
└───────────────────────────────────────────-──────────────────┘
```

---

## 📚 Modules

### [01 — Foundations](./01-foundations/) `Beginner · JavaScript`
No frameworks. Understand the core mental model of reactive programming from first principles.

**You'll learn:**
- The Observer Pattern (GoF) — the backbone of reactive
- The Iterator Pattern — understanding lazy sequences
- Pull vs Push — the fundamental shift in thinking
- Build a mini Observable from scratch

**Prerequisites:** Basic JavaScript

---

### [02 — RxJS](./02-rxjs/) `Intermediate · JavaScript/TypeScript`
The most widely used reactive library. Once you know RxJS, any other reactive library feels familiar.

**You'll learn:**
- Cold vs Hot Observables
- The operator landscape (transform, filter, combine)
- `mergeMap` vs `switchMap` vs `concatMap` (the big one!)
- Error handling & retries
- Subjects
- Real-world patterns: autocomplete, polling, WebSocket

**Prerequisites:** Module 01 or familiarity with Promises/async

---

### [03 — Spring WebFlux](./03-webflux/) `Advanced · Java`
Production-grade reactive with Project Reactor and Spring WebFlux.

**You'll learn:**
- Why reactive? Blocking I/O vs event-loop model
- `Mono<T>` and `Flux<T>` — Reactor's core types
- Backpressure — what it is and why it matters
- Schedulers & threading model
- Building reactive REST APIs and WebSocket endpoints
- Testing with `StepVerifier` and `WebTestClient`

**Prerequisites:** Module 02 (concepts), Java 17+, Spring Boot familiarity

---

## 🎯 How to Use This KT

### For Presenters
Each module has:
- `slides/` — Markdown files designed for presentation (one concept per file)
- `demos/` — Runnable code to use during live demos
- `exercises/` — Hands-on exercises with solutions

**Suggested schedule:**

| Session | Duration | Content |
|---------|----------|---------|
| Session 1 | 90 min | Module 01 — Foundations |
| Session 2 | 2 hours | Module 02 — RxJS |
| Session 3 | 2.5 hours | Module 03 — WebFlux |

### For Self-Study
Work through modules in order. Run every demo, attempt every exercise before checking solutions.

---

## 🚀 Quick Start

### Module 01 (no setup needed)
```bash
cd 01-foundations
node demos/01-observer-pattern.js
```

### Module 02 (requires Node.js 18+)
```bash
cd 02-rxjs
npm install
node demos/01-first-observable.js
```

### Module 03 (requires Java 17+, Maven)
```bash
cd 03-webflux
mvn spring-boot:run
```

---

## 🧭 Concept Map

```
Design Patterns          Reactive Libraries         Production
──────────────           ──────────────────         ──────────
Observer Pattern    ──▶  Observable/Flux        ──▶  WebFlux Router
Iterator Protocol   ──▶  Creation Operators     ──▶  WebClient
Pull vs Push        ──▶  map/flatMap/filter      ──▶  SSE / WebSocket
Lazy Evaluation     ──▶  Cold Observables        ──▶  StepVerifier Tests
Event Propagation   ──▶  Subjects / Hot Obs.     ──▶  Backpressure
Error Contracts     ──▶  catchError / retry      ──▶  onErrorResume
```

---

## 📖 Additional Resources

- [ReactiveX](https://reactivex.io/) — Interactive marble diagrams
- [RxJS Docs](https://rxjs.dev/)
- [Project Reactor Docs](https://projectreactor.io/docs)
- [Spring WebFlux Reference](https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html)
- [The Reactive Manifesto](https://www.reactivemanifesto.org/)
