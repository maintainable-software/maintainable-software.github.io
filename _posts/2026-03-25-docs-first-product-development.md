---
layout: post
title: "Docs-First Product Development"
date: 2026-03-25
tags: [product-development, documentation, ai, software-design]
---

When people hear "docs-first", they often think of API documentation, polished README files, or the kind of internal documents that appear shortly before a release and go stale shortly after.

That is not what I mean.

What I mean is something narrower and, in practice, much more useful: before implementation takes over, the product team should make the intended semantics explicit in writing. Not every detail, not every edge case, and certainly not every speculative future concern. But the parts that define what the system is, what it is not, and what kinds of decisions later implementation is allowed to make.

## First we should define the term

For the rest of this article, I will use **docs-first product development** to mean:

1. product decisions are written down before they are buried in code
2. the documentation is the canonical place where the intended behavior is explained
3. implementation follows the documented contract instead of inventing the contract on the fly

This does not mean that code comes second in importance. It means that meaning comes first.

That distinction matters because most expensive engineering mistakes are not caused by syntax, framework choice, or typing speed. They are caused by hidden assumptions. Two people use the same term differently, a command is implemented before its boundary is clear, or a system quietly starts claiming more than the evidence supports.

If the semantics stay implicit, the codebase becomes the place where unresolved product questions go to hide.

## Why I prefer docs before implementation

There are, in my view, four practical reasons.

### 1. Documentation is a decision surface

A good product document forces a team to state what it actually believes.

What does this feature mean?
What is it allowed to do?
What should happen when two concepts overlap?
What belongs in the first version and what does not?

These questions can be discussed in code, but code is usually a bad first place to settle them. Code rewards momentum. Product semantics require precision. If the meaning is still unstable, implementation pressure often produces accidental decisions that then look more "real" than they deserve, simply because they already exist in the codebase.

Writing things down first is a way to slow down just enough to make the actual decision visible.

### 2. It keeps abstraction honest

A recurring failure mode in early product work is premature generalization. People create shared modules, flexible configuration surfaces, or elegant abstractions before there is enough evidence that the behavior is actually shared.

Docs-first work helps here because it forces the abstraction to explain itself in plain language before it earns a place in the system.

If you cannot describe a concept clearly in a product document, there is a good chance the abstraction is not ready yet.

### 3. It makes AI collaboration materially better

This point is becoming more important, not less.

AI systems are much more useful when the repository contains explicit contracts, stable vocabulary, and current handover material. If the meaning of the system only exists across half-finished code, naming accidents, and chat history, an AI assistant will fill the gaps with guesses. Sometimes those guesses are plausible. That is exactly why they are dangerous.

A docs-first repository gives the assistant something better than patterns to imitate. It gives it a source of truth.

### 4. It improves continuity

Engineering work is rarely done in one uninterrupted line. Work pauses. Sessions reset. Contributors change. Priorities move. If the real state of the product only exists in the heads of the people currently touching the code, continuity is fragile.

Documentation is what lets a project resume without pretending that every conversation must be replayed from the beginning.

## What docs-first is not

It is worth being explicit here, because otherwise the term expands too easily.

Docs-first does not mean:

- writing a large specification before any implementation exists
- documenting every possible future extension
- replacing prototypes with essays
- treating documentation as automatically correct just because it is written down

The point is not documentation volume. The point is that the important decisions should exist in a durable form before implementation hardens around them.

In other words: the document should be strong where the semantics are important and quiet where the system still needs evidence.

## The practical sequence

The workflow I keep coming back to is fairly simple.

### 1. Define the product surface

Before building, identify the concepts that actually matter. Name them carefully. Distinguish the things that are often blurred together. If two terms are doing too much work, split them.

### 2. Resolve the key ambiguities

Not every ambiguity matters equally. Usually a small number of questions shape the rest of the implementation:

- what the feature means
- what it can expand into
- what happens when behaviors overlap
- what the system is allowed to claim

Those are the questions worth settling first.

### 3. Make the boundaries explicit

A useful product document should not only define allowed behavior. It should also define what is out of scope, what remains unresolved, and what the system must not imply.

This is especially important in AI-heavy products. A system that cannot state its own claim boundaries will eventually overpromise.

### 4. Implement against the contract

Once the semantics are stable enough, implementation becomes easier. Not trivial, but easier. The code no longer has to invent the model while also trying to realize it.

### 5. Verify and update

Documentation is not exempt from reality. If implementation or testing reveals that an assumption was wrong, the document should change. But that is different from never having written the assumption down in the first place.

## The docs workflow I actually use

Over time, I have found it useful to separate repository documentation into two different layers instead of treating all docs as one big tree.

### 1. Global docs

Global docs live under `docs/` and are for repository-wide things: workflows, architecture that spans multiple modules, policies, conventions, and other cross-cutting truth.

I like this layer to be indexed. In practice that means:

- `docs/README.md` is the root entry point
- each area under `docs/` has its own `README.md`
- topic documents stay focused and are discovered through those indexes
- every `README.md` entry for an existing global doc uses a structured format

For me, a good entry looks like this:

```md
### UI principles
- Path: `docs/conceptual/ui-principles.md`
- Summary: Defines the UX philosophy for the app, especially minimalism, cognitive clarity, explicit workflow comprehension, and making the next step obvious.
- Read when: The task affects layout, visual hierarchy, user comprehension, action prioritization, forms, details pages, or general UX quality.
- Tags: ux, minimalism, clarity, design, workflow
```

That structure matters because the index is not just a table of contents. It is a routing surface for future work.

- `Path` tells the assistant exactly where the canonical doc lives
- `Summary` explains the scope of the document
- `Read when` makes the trigger conditions explicit
- `Tags` provide compact secondary routing hints

The practical rule is simple: for every substantive task, first decide whether global docs are needed. If they are, start at `docs/README.md`, use `Read when` as the primary routing signal, use `Summary` and `Tags` as supporting context, then go to the smallest relevant area `README.md`, and only then read the focused topic docs needed for the task. If no global docs are needed, that is a valid outcome too.

That gives me the benefits of documentation without falling into the trap of rereading the entire docs tree every time.

### 2. Co-located docs

Not everything belongs in `docs/`.

If a document is really about one concrete file or module alone, I prefer to keep it next to that thing. The naming convention I use is:

- `src/foo.ts` -> `src/foo.docs.md`
- `src/bar/baz.ts` -> `src/bar/baz.docs.md`

These co-located docs are optional. Most files should not have them. I only want them where there is actually something worth preserving, such as:

- a public interface that matters beyond the code
- non-obvious intent for why the file exists
- important invariants or constraints
- integration expectations that future edits could easily break

When I read a concrete source file, I want the workflow to check whether a matching `*.docs.md` file exists and, if it does, read it as part of the minimum sufficient context.

When I modify that source file, I want the workflow to check whether the co-located doc already exists and update it if the change affects what the doc says.

What I do not want is automatic doc creation everywhere. If no co-located doc exists yet, that should usually be left alone unless I explicitly ask for one.

## How I set this up in a repository

The setup is not complicated, but it does need to be explicit.

### 1. Define the global docs tree

Create a minimal `docs/` structure with a root `docs/README.md`, area `README.md` files, and focused topic docs.

Make the index entries themselves part of the contract. Every entry for an existing global doc should explicitly include:

- `Path`
- `Summary`
- `Read when`
- `Tags`

This tree should only be for global documentation. If a document is really only about one file, it should not be forced into the global docs layer.

### 2. Encode the workflow in repository instructions

The important part is not only having docs. The important part is making the agentic workflow use them reliably.

In practice, I put rules in `AGENTS.md` that say:

- every substantive prompt starts by routing through the global docs system
- when reading a concrete source file, check for a co-located `*.docs.md`
- when modifying a source file, update its co-located doc if one already exists and is affected
- when modifying global docs under `docs/`, update the relevant `README.md` files so routing stays correct
- ensure each `README.md` entry for an existing global doc includes `Path`, `Summary`, `Read when`, and `Tags`

Without that kind of always-on instruction, the workflow becomes optional in exactly the wrong moments.

### 3. Keep the mechanisms separate

I have found it useful to keep these concerns separate instead of pushing them into one overloaded docs skill.

So the workflow ends up with four roles:

- a global docs router
- a global docs maintainer
- a co-located docs reader
- a co-located docs maintainer

That separation matters because the discovery models are different. Global docs are index-based. Co-located docs are adjacency-based. Treating them as the same thing makes the workflow less clear.

### 4. Keep the maintenance rules conservative

One of the easiest ways to make documentation annoying is to let it spread automatically without enough discipline.

So the maintenance rule I prefer is conservative:

- read co-located docs when they already exist
- update them when they are affected
- do not auto-create them unless explicitly requested

That keeps the signal high.

## Why this split is useful

This split solves two different problems at once.

Global docs are good at preserving shared language, workflow rules, architectural boundaries, and repository-wide continuity. They are how a project explains itself as a whole.

Co-located docs are good at preserving local intent. They explain why a particular module exists, what contract it exposes, what assumptions it relies on, and what kinds of edits are dangerous.

If everything goes into `docs/`, local detail becomes detached from the code it is talking about.

If everything stays only next to the code, cross-cutting product and architectural truth becomes fragmented and harder to route through.

The split gives each kind of documentation a clearer job.

## Why this matters more in AI-assisted engineering

AI increases speed, but speed amplifies ambiguity.

If a human developer moves too quickly on a fuzzy concept, you get one stream of accidental decisions. If several AI-assisted iterations do the same thing, you can get a whole layer of plausible-looking structure before anyone stops to ask whether the underlying model was ever agreed.

This is why I increasingly see docs-first work not as optional polish, but as control infrastructure.

The document is where the team can say:

- this is the canonical vocabulary
- this is the intended behavior
- this is the current boundary
- this is what remains open

Once that exists, AI becomes much safer and much more useful. It can still propose, implement, and refactor, but it does so against a declared model rather than a moving haze of assumptions.

And once the workflow is split into global docs plus co-located docs, the assistant gets something even better: not only the broad product and architectural model, but also the local module-specific context right next to the code it is touching.

That reduces guesswork in exactly the places where AI tends to sound most confident.

## An intermediate conclusion

If I had to reduce the idea to one sentence, it would be this:

**Docs-first product development is not about loving documentation. It is about refusing to let important product decisions become accidental implementation details.**

That is the real benefit.

It gives teams a place to settle meaning before code turns temporary thinking into durable behavior.

## Final note

I do not think every project needs heavy process. But I do think most serious products need a place where semantics can become explicit before implementation gains too much inertia.

For me, that place is documentation.

Not because docs are glamorous, but because they are one of the few tools that can hold product intent, workflow continuity, and engineering discipline in the same place at the same time.
