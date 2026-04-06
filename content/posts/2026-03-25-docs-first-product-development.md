---
layout: post
title: "Docs-First Product Development"
date: 2026-04-05
updated: 2026-04-05
published: false
tags: [product-development, documentation, ai, software-design]
---

When people hear "docs-first", they often think of API documentation, polished
README files, or the kind of internal documents that appear shortly before a
release and go stale shortly after.

That is not what I mean.

What I mean is something narrower and, in practice, much more useful: before
implementation takes over, the product team should make the intended semantics
explicit in writing. Not every detail, not every edge case, and certainly not
every speculative future concern. But the parts that define what the system is,
what it is not, and what kinds of decisions later implementation is allowed to
make.

## First we should define the term

For the rest of this article, I will use **docs-first product development** to
mean:

1. product decisions are written down before they are buried in code
2. the documentation is the canonical place where the intended behavior is
   explained
3. implementation follows the documented contract instead of inventing the
   contract on the fly

This does not mean that code comes second in importance. It means that meaning
comes first.

That distinction matters because most expensive engineering mistakes are not
caused by syntax, framework choice, or typing speed. They are caused by hidden
assumptions. Two people use the same term differently, a command is implemented
before its boundary is clear, or a system quietly starts claiming more than the
evidence supports.

If the semantics stay implicit, the codebase becomes the place where unresolved
product questions go to hide.

## Why I prefer docs before implementation

There are, in my view, four practical reasons.

### 1. Documentation is a decision surface

A good product document forces a team to state what it actually believes.

What does this feature mean? What is it allowed to do? What should happen when
two concepts overlap? What belongs in the first version and what does not?

These questions can be discussed in code, but code is usually a bad first place
to settle them. Code rewards momentum. Product semantics require precision. If
the meaning is still unstable, implementation pressure often produces accidental
decisions that then look more "real" than they deserve, simply because they
already exist in the codebase.

Writing things down first is a way to slow down just enough to make the actual
decision visible.

### 2. It keeps abstraction honest

A recurring failure mode in early product work is premature generalization.
People create shared modules, flexible configuration surfaces, or elegant
abstractions before there is enough evidence that the behavior is actually
shared.

Docs-first work helps here because it forces the abstraction to explain itself
in plain language before it earns a place in the system.

If you cannot describe a concept clearly in a product document, there is a good
chance the abstraction is not ready yet.

### 3. It makes AI collaboration materially better

This point is becoming more important, not less.

AI systems are much more useful when the repository contains explicit contracts,
stable vocabulary, and current handover material. If the meaning of the system
only exists across half-finished code, naming accidents, and chat history, an AI
assistant will fill the gaps with guesses. Sometimes those guesses are
plausible. That is exactly why they are dangerous.

A docs-first repository gives the assistant something better than patterns to
imitate. It gives it a source of truth.

### 4. It improves continuity

Engineering work is rarely done in one uninterrupted line. Work pauses. Sessions
reset. Contributors change. Priorities move. If the real state of the product
only exists in the heads of the people currently touching the code, continuity
is fragile.

Documentation is what lets a project resume without pretending that every
conversation must be replayed from the beginning.

## What docs-first is not

It is worth being explicit here, because otherwise the term expands too easily.

Docs-first does not mean:

- writing a large specification before any implementation exists
- documenting every possible future extension
- replacing prototypes with essays
- treating documentation as automatically correct just because it is written
  down

The point is not documentation volume. The point is that the important decisions
should exist in a durable form before implementation hardens around them.

In other words: the document should be strong where the semantics are important
and quiet where the system still needs evidence.

## The practical sequence

The workflow I keep coming back to is fairly simple.

### 1. Define the product surface

Before building, identify the concepts that actually matter. Name them
carefully. Distinguish the things that are often blurred together. If two terms
are doing too much work, split them.

### 2. Resolve the key ambiguities

Not every ambiguity matters equally. Usually a small number of questions shape
the rest of the implementation:

- what the feature means
- what it can expand into
- what happens when behaviors overlap
- what the system is allowed to claim

Those are the questions worth settling first.

### 3. Make the boundaries explicit

A useful product document should not only define allowed behavior. It should
also define what is out of scope, what remains unresolved, and what the system
must not imply.

This is especially important in AI-heavy products. A system that cannot state
its own claim boundaries will eventually overpromise.

### 4. Implement against the contract

Once the semantics are stable enough, implementation becomes easier. Not
trivial, but easier. The code no longer has to invent the model while also
trying to realize it.

### 5. Verify and update

Documentation is not exempt from reality. If implementation or testing reveals
that an assumption was wrong, the document should change. But that is different
from never having written the assumption down in the first place.

## The docs workflow I actually use

Over time, I have found it useful to separate repository documentation into two
different layers instead of treating all docs as one big tree.

### 1. Global docs

Global docs live under `docs/` and are for repository-wide things: workflows,
architecture that spans multiple modules, policies, conventions, and other
cross-cutting truth.

I like this layer to be indexed. In practice that means:

- `docs/README.md` is the root entry point
- each area under `docs/` has its own `README.md`
- topic documents stay focused and are discovered through those indexes
- every `README.md` entry for an existing global doc uses a structured format

For me, a good entry looks like this:

```md
### UI principles

- Path: `docs/conceptual/ui-principles.md`
- Summary: Defines the UX philosophy for the app, especially minimalism,
  cognitive clarity, explicit workflow comprehension, and making the next step
  obvious.
- Read when: The task affects layout, visual hierarchy, user comprehension,
  action prioritization, forms, details pages, or general UX quality.
- Tags: ux, minimalism, clarity, design, workflow
```

That structure matters because the index is not just a table of contents. It is
a routing surface for future work.

- `Path` tells the assistant exactly where the canonical doc lives
- `Summary` explains the scope of the document
- `Read when` makes the trigger conditions explicit
- `Tags` provide compact secondary routing hints

The practical rule is simple: for every substantive task, first decide whether
global docs are needed. If they are, start at `docs/README.md`, use `Read when`
as the primary routing signal, use `Summary` and `Tags` as supporting context,
then go to the smallest relevant area `README.md`, and only then read the
focused topic docs needed for the task. If no global docs are needed, that is a
valid outcome too.

That gives me the benefits of documentation without falling into the trap of
rereading the entire docs tree every time.

### 2. Co-located docs

Not everything belongs in `docs/`.

If a document is really about one concrete file or module alone, I prefer to
keep it next to that thing. The naming convention I use is:

- `src/foo.ts` -> `src/foo.docs.md`
- `src/bar/baz.ts` -> `src/bar/baz.docs.md`

These co-located docs are optional. Most files should not have them. I only want
them where there is actually something worth preserving, such as:

- a public interface that matters beyond the code
- non-obvious intent for why the file exists
- important invariants or constraints
- integration expectations that future edits could easily break

When I read a concrete source file, I want the workflow to check whether a
matching `*.docs.md` file exists and, if it does, read it as part of the minimum
sufficient context.

When I modify that source file, I want the workflow to check whether the
co-located doc already exists and update it if the change affects what the doc
says.

What I do not want is automatic doc creation everywhere. If no co-located doc
exists yet, that should usually be left alone unless I explicitly ask for one.

## How I set this up in a repository

The setup is not complicated, but it does need to be explicit.

### 1. Define the global docs tree

Create a minimal `docs/` structure with a root `docs/README.md`, area
`README.md` files, and focused topic docs.

Make the index entries themselves part of the contract. Every entry for an
existing global doc should explicitly include:

- `Path`
- `Summary`
- `Read when`
- `Tags`

This tree should only be for global documentation. If a document is really only
about one file, it should not be forced into the global docs layer.

### 2. Encode the workflow in repository instructions

The important part is not only having docs. The important part is making the
agentic workflow use them reliably.

In practice, I put rules in `AGENTS.md` that say:

- every substantive prompt starts by routing through the global docs system
- when reading a concrete source file, check for a co-located `*.docs.md`
- when modifying a source file, update its co-located doc if one already exists
  and is affected
- when I explicitly request a new co-located doc, use a separate creator
  workflow that only adds one when the file actually meets narrow warrant
  criteria
- when modifying global docs under `docs/`, update the relevant `README.md`
  files so routing stays correct
- ensure each `README.md` entry for an existing global doc includes `Path`,
  `Summary`, `Read when`, and `Tags`

Without that kind of always-on instruction, the workflow becomes optional in
exactly the wrong moments.

### 3. Keep the mechanisms separate

I have found it useful to keep these concerns separate instead of pushing them
into one overloaded docs skill.

So the workflow ends up with five roles:

- a global docs router
- a global docs maintainer
- a co-located docs reader
- a co-located docs maintainer
- a co-located docs creator

That separation matters because the discovery models are different. Global docs
are index-based. Co-located docs are adjacency-based. Creation is a separate
judgment call from either reading or updating. Treating them as the same thing
makes the workflow less clear.

### 4. Keep the maintenance rules conservative

One of the easiest ways to make documentation annoying is to let it spread
automatically without enough discipline.

So the default maintenance rule I prefer is conservative:

- read co-located docs when they already exist
- update them when they are affected
- do not auto-create them unless explicitly requested

That keeps the signal high.

If I do explicitly request a new co-located doc, I still do not want blanket
creation. I want a separate creator workflow that only adds one when all of
these are true:

- the file does not already have a co-located doc
- the change adds information that is hard to recover quickly from code alone
- that information is local to the file or module rather than better placed in
  global docs
- the information is likely to matter again for future edits, usage, or
  integration

In practice, that usually means a public interface changed, important invariants
or assumptions were introduced, the file exists for a non-obvious reason, the
behavior has tricky edge cases, or the file is a boundary module that other code
can easily misuse.

## A concrete copyable example

If you want to make this reproducible instead of hand-wavy, here is a concrete
setup. This is the shape I currently use: repository instructions to enforce the
workflow, separate skills for each role, and a dedicated analytical Codex
profile for scope questions and contradiction-finding.

### `AGENTS.md`

```md
## Repo Rules

### Global Docs Routing

- For every substantive prompt, first use the `global-docs-router` skill.
- Global docs routing means deciding whether repository-wide docs in `docs/` are
  needed for the task and, if they are, reading the minimum sufficient set.
- It is valid for `global-docs-router` to conclude that zero global docs need to
  be read.
- When global docs are needed, route through the indexed docs system: start at
  `docs/README.md`, then read the smallest relevant area `README.md`, then only
  the focused topic docs required for the task.
- Treat structured `README.md` entries as the routing contract for global docs.
  Every entry for an existing global doc should include `Path`, `Summary`,
  `Read when`, and `Tags`.

### Colocated Docs Reading

- When reading a concrete source or configuration file, use the
  `colocated-docs-reader` skill to check for an adjacent `*.docs.md` file with
  the same basename.
- If the co-located docs file exists and is relevant, read it as part of the
  minimum sufficient context.
- If no co-located docs file exists, continue without treating that as a gap.
- Co-located docs are optional and do not participate in the global
  `docs/README.md` routing system.

### Global Docs Maintenance

- Whenever a file under `docs/` is created, moved, renamed, deleted, or
  substantively updated, use the `global-docs-maintainer` skill.
- Start by checking the co-located `README.md` in the same folder as the changed
  global doc.
- Then walk upward one folder at a time toward `docs/README.md`.
- At each level, update that `README.md` if routing or discoverability changed.
- If a routing `README.md` is missing at a level where one is needed, create it.
- Stop once the next parent `README.md` would not need any change.
- Do not create or update unrelated README files outside the `docs/` routing
  tree.
- Every `README.md` entry for an existing global doc should explicitly include
  `Path`, `Summary`, `Read when`, and `Tags`.

### Colocated Docs Maintenance

- When modifying a source or configuration file, use the
  `colocated-docs-maintainer` skill to check for an adjacent `*.docs.md` file
  with the same basename.
- If that co-located docs file exists and the change affects documented
  behavior, interface, intent, invariants, or constraints, update it in the same
  task.
- If no co-located docs file exists, do not create one unless the user
  explicitly requests it.
- If the user explicitly requests creation of a new co-located docs file, use
  the `colocated-docs-creator` skill to decide whether creation is warranted and
  create it only when its criteria are met.
```

### `.agents/skills/global-docs-router/SKILL.md`

```md
---
name: global-docs-router
description:
  Route into this repository's global indexed documentation system under docs/
  and load only the smallest sufficient set of global docs for the current task.
---

# Global Docs Router

Use this skill for every substantive prompt before implementation work starts.

## Workflow

1. Decide whether global repository docs are needed for the task.
2. If no global docs are needed, stop after making that decision explicit in
   your reasoning.
3. If global docs are needed, read `docs/README.md` first.
4. Use each structured `README.md` entry's `Read when`, `Summary`, and `Tags`
   fields to identify the smallest relevant global docs area for the task.
5. Read that area's `README.md` before opening topic documents.
6. Read only the minimum sufficient set of global topic docs.
7. If global docs and code disagree, trust the code and note the mismatch.

## Boundaries

- Do not read the entire `docs/` tree by default.
- Do not treat this skill as a reason to spawn a subagent automatically.
- Do not use this skill to discover co-located `*.docs.md` files.
- Prefer the `Read when` field as the primary routing hint, with `Summary` and
  `Tags` as supporting signals.
- Use explicit file references when summarizing findings.

## Canonical References

Read
[docs/README.md](/home/gerkules/development/personal/agentic-dev-test/docs/README.md)
for the root global docs index. Read
[docs/process/README.md](/home/gerkules/development/personal/agentic-dev-test/docs/process/README.md)
for process docs routing. Read
[docs/process/docs-routing.md](/home/gerkules/development/personal/agentic-dev-test/docs/process/docs-routing.md)
when the repository follows the indexed global docs system. Read
[docs/process/transitional-docs.md](/home/gerkules/development/personal/agentic-dev-test/docs/process/transitional-docs.md)
when the global docs tree is only partially normalized.
```

### `.agents/skills/global-docs-maintainer/SKILL.md`

```md
---
name: global-docs-maintainer
description:
  Maintain this repository's global indexed documentation system under docs/ by
  updating canonical docs and README routing files as repository truth changes.
---

# Global Docs Maintainer

Use this skill whenever work changes global repository documentation or
repository truth that should be reflected in `docs/`.

## Workflow

1. Update the global canonical document that owns the changed fact.
2. Add a new focused global doc only when no current doc in `docs/` is a good
   fit.
3. Check the co-located `README.md` first and update it if routing or
   discoverability changed.
4. Walk upward one folder at a time toward `docs/README.md`, updating or
   creating routing `README.md` files only where needed.
5. Stop once the next parent `README.md` would not need any change.
6. Ensure every `README.md` entry for an existing global doc includes `Path`,
   `Summary`, `Read when`, and `Tags`.

## Boundaries

- Do not duplicate the same information across multiple global docs.
- Do not create or update unrelated README files outside the `docs/` routing
  tree.
- Do not use this skill for co-located `*.docs.md` files next to source files.
- Do not preserve stale wording when the correct scope is now known.

## Canonical References

Read
[docs/README.md](/home/gerkules/development/personal/agentic-dev-test/docs/README.md)
for the root global docs index. Read
[docs/process/README.md](/home/gerkules/development/personal/agentic-dev-test/docs/process/README.md)
for process docs routing. Read
[docs/process/docs-system.md](/home/gerkules/development/personal/agentic-dev-test/docs/process/docs-system.md)
for the indexed global docs model. Read
[docs/process/colocated-docs.md](/home/gerkules/development/personal/agentic-dev-test/docs/process/colocated-docs.md)
to distinguish co-located docs from global docs.
```

### `.agents/skills/colocated-docs-reader/SKILL.md`

```md
---
name: colocated-docs-reader
description:
  Discover and read an adjacent *.docs.md file for a concrete source or
  configuration file when such a co-located doc exists and is relevant.
---

# Colocated Docs Reader

Use this skill whenever you open a concrete source or configuration file and
need to check whether there is relevant co-located documentation.

## Workflow

1. For the current file, derive the co-located docs path by replacing the file
   extension with `.docs.md`.
2. Check whether that co-located docs file exists.
3. If it exists and is relevant to the current task, read it.
4. If it does not exist, continue without treating that as a gap.
5. If the co-located docs and code disagree, trust the code and note the
   mismatch.

## Boundaries

- Do not create a co-located docs file.
- Do not scan unrelated directories for other `*.docs.md` files.
- Do not use this skill as a substitute for global docs routing in `docs/`.

## Canonical References

Read
[docs/process/colocated-docs.md](/home/gerkules/development/personal/agentic-dev-test/docs/process/colocated-docs.md)
for the co-located docs convention.
```

### `.agents/skills/colocated-docs-maintainer/SKILL.md`

```md
---
name: colocated-docs-maintainer
description:
  Update an existing adjacent *.docs.md file when changes to a concrete source
  or configuration file affect what that co-located doc says.
---

# Colocated Docs Maintainer

Use this skill whenever you modify a concrete source or configuration file.

## Workflow

1. Derive the co-located docs path by replacing the file extension with
   `.docs.md`.
2. Check whether that co-located docs file exists.
3. If it exists and the source change affects documented behavior, interface,
   intent, invariants, or constraints, update it in the same task.
4. If it does not exist, stop and do not create a new co-located docs file
   unless the user explicitly requests one.
5. If the co-located docs and code disagree, correct the doc to match the code.

## Boundaries

- Do not create new co-located docs files unless explicitly requested.
- Do not update unrelated `*.docs.md` files.
- Do not use this skill for global docs under `docs/`.

## Canonical References

Read
[docs/process/colocated-docs.md](/home/gerkules/development/personal/agentic-dev-test/docs/process/colocated-docs.md)
for the co-located docs convention.
```

### `.agents/skills/colocated-docs-creator/SKILL.md`

```md
---
name: colocated-docs-creator
description:
  Create a new adjacent *.docs.md file for a concrete source or configuration
  file, but only when the user explicitly requests creation and the file meets
  narrow warrant criteria for co-located documentation.
---

# Colocated Docs Creator

Use this skill when the user explicitly asks to create a new co-located
`*.docs.md` file or to proactively add co-located docs where they are warranted.

## Workflow

1. Derive the co-located docs path by replacing the file extension with
   `.docs.md`.
2. Check whether that co-located docs file already exists.
3. If it already exists, stop and use `colocated-docs-maintainer` instead.
4. Confirm that creation was explicitly requested in the current task. If not,
   stop.
5. Create a new co-located docs file only when all of these are true:
   - The modified file has no co-located `*.docs.md`.
   - The change materially affects information that is hard to recover quickly
     from code alone.
   - That information is local to that one file or module, not better placed in
     global docs.
   - The information is expected to matter again for future edits, usage, or
     integration.
6. Treat the following as strong signals that creation is warranted:
   - A public interface was introduced or substantially changed.
   - The file now encodes important invariants, constraints, or assumptions.
   - The file exists for a non-obvious reason that is not evident from the code
     itself.
   - The implementation has tricky behavior, edge cases, or protocol
     expectations that future readers are likely to miss.
   - The file is a boundary module that other code depends on and misuse is
     likely without guidance.
7. Treat the following as signals that creation is not warranted:
   - The change is small and obvious from the code.
   - The file is internal and straightforward.
   - The explanation would mostly restate the code.
   - The information belongs in `docs/` because it is cross-cutting or
     architectural.
   - The doc would likely go stale faster than it would help.
8. If creation is warranted, write a concise file-specific doc that captures
   only the non-obvious information future readers will need.
9. If creation is not warranted, stop and say so briefly instead of forcing a
   new doc.

## Boundaries

- Do not create a new co-located docs file unless the user explicitly requested
  creation.
- Do not create a co-located doc when an existing one should be updated instead.
- Do not move cross-cutting or architectural guidance into a co-located doc;
  that belongs under `docs/`.
- Do not create a doc that mostly restates the implementation.
- Keep the new doc narrow, concrete, and local to the file it documents.

## Canonical References

Read
[docs/process/colocated-docs.md](/home/gerkules/development/personal/agentic-dev-test/docs/process/colocated-docs.md)
for the repository's co-located docs convention.
```

### `.codex/profiles/repo-analyst.md`

For analytical questions, scope recovery, and contradiction-finding, I use a
separate profile instead of overloading the default implementation-oriented
agent. The point is to bias the read toward slightly broader context and to
surface contradictions even when they were found incidentally while answering
another question.

```md
# Repo Analyst Profile

Use this file as `model_instructions_file` when the task is primarily analytical
rather than implementation-oriented.

## Purpose

Your primary job is to help with:

- understanding how the repository works
- understanding product scope, workflow scope, and intended behavior
- finding contradictions across instructions, docs, skills, config, and code
- explaining what is known, what is inferred, and what is still unclear

Default to analysis, not edits.

## Default Stance

- Do not make code or documentation changes unless the user explicitly asks for
  them.
- Prefer reading and synthesis over implementation.
- Treat contradiction-finding, scope clarification, and operational
  understanding as first-class tasks.
- Be skeptical of single-source answers when multiple repository artifacts could
  define the behavior.

## Sources To Consider

When relevant to the question, consider:

- `AGENTS.md`
- global docs under `docs/`
- repo-local skills under `.agents/skills/`
- relevant source and config files
- adjacent `*.docs.md` files when reading a concrete file
- tests, if they materially define intended behavior

## Reading Strategy

Do not follow the normal global docs router conservatively.

For this profile, optimize for lower omission risk:

1. Read files that clearly belong to the task.
2. Also read files that plausibly belong to the task when the scope is ambiguous
   or partially specified.
3. Prefer a wider first-pass scan and a narrower second-pass deep read.
4. If two sources might both define the answer, read both before concluding.
5. When a concrete source or config file is relevant, check for an adjacent
   `*.docs.md` file and read it if present.

This means you should often read some files that are only possibly relevant, not
only files that are obviously relevant.

## Bounded Expansion Rule

To avoid missing important context without exploding token usage:

- start with the most likely defining files
- then add nearby or neighboring files that could reasonably change the answer
- stop expanding once additional files are repeating the same model of the
  system rather than adding new constraints
- prefer indexes, READMEs, skill descriptions, and targeted excerpts before full
  deep reads
- use file search aggressively to identify candidate files before opening them

When uncertain, bias toward reading one or two extra candidate files rather than
answering too early.

## Contradiction Checks

When the user asks about consistency, contradictions, scope, or how something
works:

- compare instructions against docs
- compare docs against code
- compare skills against repository rules
- compare implementation against tests when tests are the clearest executable
  contract

When reading docs or instructions for any analytical task, do not ignore
contradictions you notice just because the user did not explicitly ask for them.

If you discover a meaningful contradiction incidentally while answering another
question:

- mention it clearly
- identify the conflicting files
- keep the contradiction note separate from the main answer
- state whether it is a direct conflict or a likely mismatch by inference

Call out contradictions explicitly. Do not blur them into a single synthesized
answer.

For each meaningful contradiction or mismatch, state:

- the competing sources
- the concrete point of disagreement
- which source appears authoritative
- whether you are stating a fact or an inference

## Output Requirements

- Separate facts from inferences.
- Quote exact file paths when naming sources.
- Prefer concise synthesis over long file summaries.
- If scope is unclear, say what files you used to bound it.
- If evidence is incomplete, say what is still unknown.

## Escalation Threshold

Do a broader read when:

- the question asks about product scope, intent, or ownership
- the same concept appears in multiple layers such as `AGENTS.md`, `docs/`,
  skills, and code
- the user asks for contradictions, mismatches, gaps, or missing assumptions
- you find one source that looks outdated relative to another

## Non-Goals

- Do not default to implementing fixes.
- Do not assume the shortest path to an answer is the most reliable one.
- Do not rely on a single README when nearby files could materially narrow or
  overturn the answer.
```

### `.codex/config.toml`

Codex profiles are reusable. I define one named profile that points at the
analytical instructions file and pins the best model I currently have available
in my local Codex setup.

```toml
[profiles.repo-analyst]
model = "gpt-5.4"
model_instructions_file = ".codex/profiles/repo-analyst.md"
```

### `package.json`

Finally, I add an npm script so I can start that profile without remembering the
full command. I prefer using `npx @openai/codex` here rather than relying on a
globally installed binary.

```json
{
  "name": "agentic-dev-test",
  "private": true,
  "scripts": {
    "dev": "pnpm -r --parallel --if-present dev",
    "build": "pnpm -r --if-present build",
    "test": "pnpm -r --if-present test",
    "lint": "pnpm -r --if-present lint",
    "repo-analyst": "npx @openai/codex --profile repo-analyst"
  }
}
```

With that in place, the analytical mode is just:

```bash
npm run repo-analyst
```

## Why this split is useful

This split solves two different problems at once.

Global docs are good at preserving shared language, workflow rules,
architectural boundaries, and repository-wide continuity. They are how a project
explains itself as a whole.

Co-located docs are good at preserving local intent. They explain why a
particular module exists, what contract it exposes, what assumptions it relies
on, and what kinds of edits are dangerous.

If everything goes into `docs/`, local detail becomes detached from the code it
is talking about.

If everything stays only next to the code, cross-cutting product and
architectural truth becomes fragmented and harder to route through.

The split gives each kind of documentation a clearer job.

## Why this matters more in AI-assisted engineering

AI increases speed, but speed amplifies ambiguity.

If a human developer moves too quickly on a fuzzy concept, you get one stream of
accidental decisions. If several AI-assisted iterations do the same thing, you
can get a whole layer of plausible-looking structure before anyone stops to ask
whether the underlying model was ever agreed.

This is why I increasingly see docs-first work not as optional polish, but as
control infrastructure.

The document is where the team can say:

- this is the canonical vocabulary
- this is the intended behavior
- this is the current boundary
- this is what remains open

Once that exists, AI becomes much safer and much more useful. It can still
propose, implement, and refactor, but it does so against a declared model rather
than a moving haze of assumptions.

And once the workflow is split into global docs plus co-located docs, the
assistant gets something even better: not only the broad product and
architectural model, but also the local module-specific context right next to
the code it is touching.

That reduces guesswork in exactly the places where AI tends to sound most
confident.

## An intermediate conclusion

If I had to reduce the idea to one sentence, it would be this:

**Docs-first product development is not about loving documentation. It is about
refusing to let important product decisions become accidental implementation
details.**

That is the real benefit.

It gives teams a place to settle meaning before code turns temporary thinking
into durable behavior.

## Final note

I do not think every project needs heavy process. But I do think most serious
products need a place where semantics can become explicit before implementation
gains too much inertia.

For me, that place is documentation.

Not because docs are glamorous, but because they are one of the few tools that
can hold product intent, workflow continuity, and engineering discipline in the
same place at the same time.
