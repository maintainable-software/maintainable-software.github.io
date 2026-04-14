---
layout: post
title: "Docs-First Product Development for AI Coding Agents"
description:
  "Use a docs-first workflow for AI coding agents by defining product meaning
  first, separating global and co-located docs, and giving agents a stable
  source of truth before implementation."
date: 2026-04-14
updated: 2026-04-14
published: true
author: "Jan-Gerke Salomon"
author_url: "/me/"
canonical_url: "https://maintainable.software/docs-first-product-development/"
image: "/assets/images/posts/docs-first-product-development.png"
tags:
  [
    agentic-engineering,
    coding-agents,
    ai-coding-agents,
    documentation,
    docs-first,
    maintainability,
  ]
teaser:
  Learn how docs-first product development can make AI coding agents safer by
  documenting product meaning first, splitting global and co-located docs, and
  giving future sessions a stable source of truth.
---

For teams using AI coding agents, docs-first product development means writing
important product meaning first and implementing only against that documented
contract. It reduces hidden assumptions, narrows context drift, and gives both
humans and agents a stable source of truth before code is generated.
[[1]](#ref-1) [[2]](#ref-2) [[4]](#ref-4)

In this article, I show a practical workflow: a small docs-first structure, a
conservative maintenance rule for documentation, and a lightweight adoption path
that keeps meaning useful across long-running sessions.

**If you already know the workflow, go straight to the
[docs-driven development template README](https://github.com/maintainable-software/docs-driven-development-template/blob/main/README.md)**
or the full
[repository](https://github.com/maintainable-software/docs-driven-development-template).

## What is docs-first product development for AI coding agents?

For the rest of this article, docs-first product development means:

1. product decisions are written before they are buried in code
2. documentation holds the product contract, boundaries, and behavior
   expectations
3. implementation follows the documented contract and updates it when
   assumptions fail

This is not documentation as ceremony. It is documentation as a control surface.

If the semantics are implicit, they become an implementation accident.
[[1]](#ref-1) [[2]](#ref-2) [[4]](#ref-4)

## Why should teams document first when AI coding agents are involved?

There are several practical reasons this is especially strong with AI coding
agents.

### 1) Documentation is a decision surface

A good product document forces a team to state what it believes.

What does this feature mean? What is it allowed to do? What should happen when
concepts overlap? What is out of scope?

Code can hold these decisions eventually, but it usually does so in a way that
is hard to critique before it hardens. Code rewards momentum. Semantics require
precision. If meaning is still unstable, implementation pressure often turns
unfinished ideas into durable behavior. [[1]](#ref-1) [[2]](#ref-2)
[[4]](#ref-4)

Writing things down first slows decisions down just enough to make them visible
and reversible.

### 2) Docs-first keeps abstractions honest

A recurring failure mode is premature generalization. Teams build shared
modules, config surfaces, or abstractions too early, because they have not
validated that the behavior is real yet.

Docs-first helps because it forces the abstraction to justify itself in plain
language before it earns a stable place in the system.

If a concept is not yet understandable in documentation, it is usually not
stable enough to be generalized safely. [[5]](#ref-5) [[6]](#ref-6)
[[7]](#ref-7)

### 3) Docs-first materially improves AI collaboration

AI systems are most useful when they have explicit contracts, stable vocabulary,
and current handover material. If meaning exists only partly in code and partly
in chat history, the assistant will fill the gaps with guesses. Some guesses are
right. That is precisely why they are risky.

A docs-first repository gives the assistant more than patterns; it gives it a
source of truth. [[2]](#ref-2) [[3]](#ref-3) [[8]](#ref-8) [[10]](#ref-10)

### 4) Docs-first improves continuity for resumed work

Engineering work is rarely one uninterrupted session. Work pauses, sessions
reset, contributors switch. If the true state is only in memory, continuity is
fragile.

Documented contracts are what let a team resume without replaying all prior
context. [[2]](#ref-2) [[8]](#ref-8) [[9]](#ref-9)

## What does docs-first not mean?

Docs-first does not mean:

- writing a giant specification before any implementation
- documenting every possible future extension
- replacing working prototypes with long essays
- treating documentation as automatically correct just because it is written

The goal is not documentation volume. The goal is that the important decisions
exist in durable form before implementation hardens around them.

## What is the docs-first workflow?

The workflow is simple and intentionally boring:

1. [ ] **Define the product surface.** Name the concepts that matter for the
       task.
2. [ ] **Resolve key ambiguities.** Prioritize the few decisions that affect
       most behavior.
3. [ ] **Make boundaries explicit.** Define scope, exclusions, and limits of
       allowed claims.
4. [ ] **Implement against the contract.** Code follows the documented decision
       model.
5. [ ] **Verify and update.** If evidence contradicts assumptions, update docs
       and then implementation together. [[2]](#ref-2) [[4]](#ref-4)
       [[12]](#ref-12)

### What to do when implementing a sequence

After those five checks, implementation becomes clearer:

- fewer accidental architecture decisions
- fewer repeated assumptions in follow-up prompts
- fewer recovery sessions with missing context [[2]](#ref-2) [[3]](#ref-3)
  [[12]](#ref-12)

## How should you structure docs for AI coding agents?

The practical split is between global docs and co-located docs. [[1]](#ref-1)
[[2]](#ref-2) [[11]](#ref-11)

| Layer           | Where it lives                    | Scope                   | Primary use                                              | Update rule                                    |
| --------------- | --------------------------------- | ----------------------- | -------------------------------------------------------- | ---------------------------------------------- |
| Global docs     | `docs/`                           | repository-wide         | workflows, conventions, architecture, shared constraints | update when cross-cutting truth changes        |
| Co-located docs | `src/foo.ts` -> `src/foo.docs.md` | file or module-specific | local intent, public interface, invariants               | update when the owning source behavior changes |

### 1. Global docs

Global docs are for repository-wide things:

- conventions
- architecture that spans multiple modules
- policies and workflow standards
- shared semantics that affect multiple areas

I use `docs/_index.md` as a discovery entry point, area-specific `_index.md`,
and area-level `README.md` for mental-model context. This keeps the entry path
explicit. [[1]](#ref-1) [[11]](#ref-11)

### 2. Co-located docs

Not everything belongs in `docs/`.

A co-located document is useful when there is concrete local value:

- a public interface with lasting meaning
- non-obvious design intent
- invariants, constraints, or integration expectations

When a source file changes and these things matter, I read and update the
matching `*.docs.md` file if it already exists. I do not create new co-located
docs by default. The workflow stays conservative on creation.

### 3. Failure mode this split avoids

A common failure mode is this loop:

- one broad page accumulates both global and local details
- details go stale as modules evolve
- agents are forced to infer boundaries from fragmented context

This split keeps the contract durable: global docs provide direction, co-located
docs keep local intent close to change. A short example of this pattern is the
ecosystem in `docs-driven-development-template` and `workflow-setup`, where
workflow truth and execution truth are separated and versioned for long-running
work. [[3]](#ref-3) [[8]](#ref-8) [[10]](#ref-10) [[11]](#ref-11)

## How can I adopt this workflow in practice?

If you want a copyable version, use the
[template README](https://github.com/maintainable-software/docs-driven-development-template/blob/main/README.md).

For teams already working with agents, this is the practical route:

1. [ ] add the docs-driven development template
2. [ ] define a minimal global docs index with clear routing fields
3. [ ] decide when and where co-located docs are mandatory
4. [ ] run one narrow implementation slice end-to-end
5. [ ] make the failure and acceptance evidence explicit [[4]](#ref-4)
       [[12]](#ref-12)

### Compact adoption checklist for a new repo slice

1. **Add discovery docs first.** Put shared structure in `docs/_index.md`.
2. **Create only one workflow doc.** Keep scope narrow until it is stable.
3. **Use one canonical contract.** Define what the implementation must and must
   not do.
4. **Add local docs only where needed.** Skip generic or repetitive module
   notes.
5. **Review docs on the next code change.** Every behavior-affecting change
   should leave both code and docs in sync.

## Why does this split help more in AI-assisted engineering?

AI increases speed, and speed amplifies ambiguity. [[2]](#ref-2) [[3]](#ref-3)
[[10]](#ref-10)

In a codebase where meaning is not explicit in the repository, ambiguity is
treated as if it is a low-cost temporary state. For a coding agent, that usually
becomes a high-cost production risk. [[2]](#ref-2) [[3]](#ref-3) [[8]](#ref-8)

This idea connects directly to
[context engineering and session management](/agentic-engineering-part-4-context-engineering/),
to
[docs, guardrails, and feedback loops](/agentic-engineering-part-3-docs-guardrails-feedback-loops/),
and to
[tracked workflow setup](/tracked-workflow-setup-for-agentic-repositories/).

## What is the practical outcome?

When done well, docs-first means this:

- the repo holds meaning in files
- agents recover context from files, not hidden chat state
- implementation becomes a safer interpretation of already explicit intent
  [[2]](#ref-2) [[8]](#ref-8) [[9]](#ref-9)

## FAQ about docs-first for AI coding agents

### Does docs-first mean writing a big specification before coding?

Usually no. The minimal useful path is to document the highest-impact decisions
first, then harden details as work validates those assumptions.

### Why does docs-first matter more for AI coding agents?

Agents can move quickly. They need stable contracts to move safely. Docs-first
gives them explicit boundaries and reduces prompt-time invention. [[2]](#ref-2)
[[3]](#ref-3) [[10]](#ref-10)

### When should a team use global docs versus co-located docs?

Use global docs for shared semantics that span modules. Use co-located docs for
contract-level details tied to specific code. [[1]](#ref-1) [[11]](#ref-11)

### When should you not create a `*.docs.md` file?

Do not create co-located docs by default. If a file has no durable invariants,
no non-obvious intent, and no integration sensitivity, skip it.

## Conclusion

Docs-first product development is not about caring more about documentation than
code. It is about making meaning explicit before it is accidentally encoded in
implementation.

For AI coding agents, that is the difference between a repo that teaches and a
repo that guesses.

## References

1. <a id="ref-1"></a>
   [Software Engineering at Google, Chapter 10: Documentation.](https://abseil.io/resources/swe-book/html/ch10.html)
2. <a id="ref-2"></a>
   [OpenAI, “Harness engineering: leveraging Codex in an agent-first world.”](https://openai.com/index/harness-engineering/)
3. <a id="ref-3"></a>
   [Anthropic, “Effective context engineering for AI agents.”](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
4. <a id="ref-4"></a>
   [GitHub Blog, “Spec-driven development with AI: Get started with a new open source toolkit.”](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
5. <a id="ref-5"></a>
   [Sandi Metz, “The Wrong Abstraction.”](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction)
6. <a id="ref-6"></a>
   [Kent C. Dodds, “AHA Programming.”](https://kentcdodds.com/blog/aha-programming)
7. <a id="ref-7"></a>
   [John Ousterhout, _A Philosophy of Software Design_, 2nd ed., 2021.](https://web.stanford.edu/~ouster/cgi-bin/aposd2ndEdExtract.pdf)
8. <a id="ref-8"></a>
   [GitHub Blog, “Building an agentic memory system for GitHub Copilot.”](https://github.blog/ai-and-ml/github-copilot/building-an-agentic-memory-system-for-github-copilot/)
9. <a id="ref-9"></a>
   [OpenAI Developers, “Run long-horizon tasks with Codex,” 2026.](https://developers.openai.com/blog/run-long-horizon-tasks-with-codex/)
10. <a id="ref-10"></a>
    [Martin Fowler and Birgitta Böckeler, “Context Engineering for Coding Agents,” 2026.](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html)
11. <a id="ref-11"></a>
    [Software Engineering at Google, Chapter 17: Code Search.](https://abseil.io/resources/swe-book/html/ch17.html)
12. <a id="ref-12"></a>
    [OpenAI Developers, “Building an AI-Native Engineering Team.”](https://developers.openai.com/codex/guides/build-ai-native-engineering-team/)
