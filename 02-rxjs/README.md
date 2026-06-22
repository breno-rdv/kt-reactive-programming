# Level 2 — RxJS

This module teaches RxJS to developers who already understand the Observer pattern and want to level up to stream composition.

## What you will learn
- The Observable contract and subscription lifecycle
- Cold vs hot observables
- Core creation, transformation, filtering, and combination operators
- Error handling and retry strategies
- Subjects and multicasting
- A real-world autocomplete flow

## Structure
- `slides/` — KT slide content in Markdown
- `demos/` — runnable Node.js demos with rich console output
- `exercises/` — hands-on practice plus reference solutions

## Run locally
```bash
cd 02-rxjs
npm install
npm run demo:01
npm run demo:09
```

## Notes
- Uses plain JavaScript with ES modules
- All demos are Node-friendly
- `fromEvent` uses Node's `EventEmitter` as a DOM-like stand-in
