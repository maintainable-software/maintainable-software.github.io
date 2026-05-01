---
layout: post
title: "How I Use Living Plans for Spec-Driven Development"
description:
  "How I use living plan files as execution contracts for AI coding agents:
  repo-grounded discovery, step boundaries, verification, reconciliation, and
  project memory."
date: 2026-05-01
updated: 2026-05-01
published: true
author: "Jan-Gerke Salomon"
author_url: "/me/"
canonical_url: "https://maintainable.software/how-i-use-living-plans-for-spec-driven-development/"
tags:
  [
    agentic-engineering,
    ai-coding-agents,
    spec-driven-development,
    documentation,
    testing,
    maintainability,
  ]
teaser:
  Spec-driven development is useful when the spec is not a stale document. I use
  living plan files as execution contracts for coding agents so discovery,
  implementation, checks, docs, and implementation discoveries stay connected.
---

I wanted to write an article for how I use living plan files when working AI
coding agents for quite some time now. Then a
[video](https://www.youtube.com/watch?v=nnUMJX9013Y) popped up in my feed,
arguing against spec-driven development. The critique is worth taking seriously,
as it seems that lately a lot of developers haven't understood how specs can be
leveraged without having the issues that were presented in said video.

The weak version of spec-driven development is easy to criticize: write a large
document, hand it to an AI coding agent, wait for a large implementation, and
then discover that the document did not survive contact with the real codebase.
That deserves the criticism it gets.

The version I find useful is different. I use plan files as living execution
contracts. They are grounded in the current repository, split into small
implementation slices, tied to checks, and updated after each meaningful step.
Their job is not to replace engineering judgment. Their job is to keep the
agent, the code, the tests, the docs, and the human reviewer aligned during the
initial discovery phase, in which the current repository as well as the actual
task at hand are being taken apart and analyzed and while the work changes
shape.

That matters because, unless we actively counteract it, agentic engineering
creates comprehension debt: the widening gap between the volume of AI-generated
code and the developers' understanding of that code. Agents discover facts while
implementing, but the real risk is not only that those facts disappear. The real
risk is that the codebase grows faster than the human mental model that should
govern it. Working with a living plan allows us to reflect on implementation
changes, intervene between different implementation steps, define what should be
persisted in docs, what should be tested and - most importantly - we can
influence the code itself in a much more straight forward way.

This brings the creative work back to the developer while the coding agent's
task is mostly writing the implementation for what was worked out during while
working on the livin gplan. The only "creative" parts that are left to the
coding agent are minor implementation details.

## The problem with specs is not the specs themselves, it is stale specs

The strongest objection to spec-driven development is not "documentation is
bad." It is that documents drift.

That objection lands especially hard in AI-assisted work. A stale design doc may
mislead a human who happens to read it. A stale spec can mislead an agent that
executes it confidently. Augment's critique of spec-driven development makes
that point well: if agents work from specifications, those specifications need a
maintenance loop, not just an authoring loop. [[1]](#ref-1)

The workflow that deserves criticism looks like this:

```text
big prompt
-> giant spec
-> giant plan
-> giant implementation
-> giant review
-> stale documentation
```

That workflow creates too much text before there is enough evidence. It lets
guesses harden into requirements. It produces review overload. It encourages the
agent to treat the spec as authoritative even when the spec has not been checked
against the repository.

When implementation reveals that the plan was wrong, the document becomes worse
than useless. It becomes a source of confident misdirection.

## Bad SDD is document-driven development

I find it useful to separate spec-driven development from document-driven
development.

Document-driven development treats the document as the central artifact. The
team writes it, the agent implements it, and everyone hopes the document was
complete enough.

That is not how real software work behaves. Real work reveals edge cases while
building. Existing code has owners, conventions, implicit contracts, and awkward
constraints. Tests expose missing behavior. Production systems have migration
paths, permissions, environments, data shape surprises, and failure modes that
were not obvious in the first prompt.

If a process cannot absorb those discoveries, it is just waterfall with faster
typing.

The useful version of spec-driven development treats the spec or plan as a
working control surface. It is allowed to change when the repository teaches us
something. It is useful only while it remains current enough to trust.

## Evolutionary design

Before we dive deeper into SDD, I want to highlight a related topic which seems
to have the same understanding issue that SDD currently has, although that topic
is much older: Evolutionary design.

Evolutionary design is easy to misunderstand as "just start coding and clean it
up later." That is not the version I mean.

The useful version starts from a different observation: we cannot fully
understand the right design before the work teaches us what the system really
needs. Even strong teams make reasonable design decisions with the information
they have, only to discover later that the better shape of the system is visible
only after some of it has been built. Fowler makes that point in his writing on
software quality and evolutionary design: some cruft is inevitable, and design
has to keep changing as the program changes. This seems to be exactly the same
when coding agents write the code instead of teams. [[5]](#ref-5) [[6]](#ref-6)

That does not mean every local implementation decision should simply become the
design. Undisciplined evolutionary design degenerates into code-and-fix work:
small tactical choices accumulate, coupling grows, simple changes start touching
too many places, and the system becomes harder to reason about. Planned design
is an understandable reaction to that failure mode.

The argument against planned design is very similar to the argument against SDD:
They try to settle too much before the most important evidence exists.

Disciplined evolutionary design, and arguably disciplined spec-driven design,
sits between those extremes. It accepts that the design must change as
understanding improves, but it also insists on the conditions that make change
safe: clear concepts, cohesive modules, low coupling, tests, continuous
verification, refactoring, and people who care enough to keep the design
converging instead of letting it drift.

When practicing SDD, documentation should be included in the design space, as
“documentation is often so tightly coupled to code that it should […] be treated
as code.” [[7]](#ref-7)

This matters even more when working with coding agents. Agents can implement a
large amount of code quickly, but that speed amplifies whichever design process
is in place. If the process is ad hoc, the agent produces ad hoc design faster.
If the spec is static, the agent can confidently preserve an outdated idea. If
the plan is alive, the agent can help execute one step while the developer keeps
the design work visible.

That is how I use living plans. I use them to understand the current design,
document the relevant parts for the current work/task, then work out what the
code should look like after the next step. Not after every future step. Not
after the imagined final architecture. Just after the next bounded change that
is ready to be implemented.

That one-step design question is important. It forces me to read the analyze
codebase carefully enough to understand what is there, decide what the design
should become next, and keep control over the direction of the code instead of
outsourcing that judgment to the agent. The plan records the current findings,
the next boundary, the checks that should prove the change, and the docs or
specs that need to move with the implementation.

This is also why I treat specs and docs with the same seriousness as code. If a
step changes the implemented reality, the plan should say what changed, tests
should prove the important behavior, and durable docs should be updated when
they describe repository truth. The design evolves, but the written model of the
system evolves with it.

For me, that is the practical link between evolutionary design and living plans:
the plan is not a frozen design document. It is the control surface that lets me
practice evolutionary design deliberately while a coding agent does the
implementation work inside the next agreed boundary.

## A good plan is an execution contract

For application work with AI coding agents, I do not think the spec replaces
code. The relationship is simpler:

- the code is the operational truth
- the tests are the executable truth
- the docs/specs record durable repository and product truth
- the temporarily relevant plan records the current execution contract
- the agent is constrained by all of them

A plan in agentic engineering is not a wish list. It is an execution contract
that lets a human or agent understand the current truth, make a bounded change,
prove the result, and carry discovered truth forward.

This is also why I do not treat the final documentation as something I should
fully write before implementation. The durable spec that lands in a repository's
docs is often an implementation artifact produced with the help of the agent
after the code has revealed the real shape of the work.

The plan comes earlier. It is more concrete than a product brief, less permanent
than final docs, and specific enough to constrain one implementation slice at a
time.

## What my plan files are for

The plan files I use usually live in `plans/PLAN.*.md`. They are deliberately
plain. Their job is to turn a vague change into a sequence of bounded,
reviewable implementation slices.

They are not meant to be pretty. They are meant to be operational.

A good plan tells the agent:

- what the change is for
- what the repository currently does
- which constraints are non-negotiable
- which work is explicitly out of scope
- which step is active
- what must be discovered before implementation starts
- what may change during the step
- what must not change during the step
- what evidence is required before the step is done
- what newly discovered facts must be written back

This is the practical answer to the "you cannot know everything up front"
critique. I agree. The point of the plan is not to know everything up front. The
point is to make unknowns explicit, close the relevant unknowns before each
implementation slice, and record the discoveries before the next slice starts.

## The structure of a useful plan file

Not every plan needs the same top-level sections. The exact headings can vary.
The important part is that each section owns one kind of information.

`Purpose` or `Goal` says why the plan exists. It should be short and
directional. For example: move an admin frontend from a JSX-heady UI to a
simpler surface with a 3rd party UI library, or migrate plain text files with
instructions to structured JSONL files.

`Current Findings` records evidence. This is where the plan says what the
repository already does, which files own behavior, which docs are stale, which
runtime paths still use the old model, and which constraints were discovered
before implementation.

`Explicit Requirements` records hard boundaries. These are stronger than
preferences. For example: keep `react-router`, use `@tanstack/react-query`, do
not change the authentication contract, do not create a second template, and do
not silently overwrite local repository instructions.

`Working Target` describes the intended end state. It can include command
shapes, file layouts, API contracts, route behavior, schema sketches, migration
targets, or UI targets.

The top of a plan often looks like this:

```markdown
# Plan: <bounded change name>

## Purpose

Why this change exists, what problem it solves, and what the plan is meant to
make possible.

## Current Findings

The current repository truth: files, behavior, constraints, prior decisions,
known gaps, and anything already discovered during investigation.

## Explicit Requirements

Hard boundaries that every step must obey.

## Working Target

The intended end state.

## Step-By-Step Implementation Plan

### Plan-Wide Execution Rules

Rules every step must obey.
```

`Plan-Wide Execution Rules` is important because agents tend to generalize too
early. If a plan should create several similar components but shouldn't create
an generalized abstraction yet, that belongs in the plan-wide rules. If a
workflow migration must fail closed instead of guessing how to reconstruct
state, that belongs there too.

The rule I use very often is: do not create a generalized abstraction inside the
implementation plan just because similar code appears while the steps are being
built. After the plan has been worked on, I can look at the completed work.
Sometimes it is immediately clear that no meaningful generalization exists. When
it is not clear, I create a dedicated follow-up plan to investigate the possible
generalization with its own high-level findings. Those findings may show that
there is no real generalization after all. If they do show one, I continue to
work on the plan so it describes the current status quo, the intended
generalization, where it should be used, which docs or technical specs need to
change with it and eventually the steps how to get there from the status quo.

## Each step has its own contract

The most important section is the step-by-step implementation plan.

That is where a plan stops being an essay and becomes agent-executable. Each
step should be small enough that an agent can implement it, verify it, and stop
without dragging unrelated work into the same change.

I use a repeatable structure:

```markdown
### Step 1: <specific outcome>

Status: pending.

Depends on: none.

Pre-step discovery:

- <question or uncertainty to close before implementation starts>

Implementation boundary:

- <what this step may change>
- <what this step must preserve>
- <what this step must not do>

Verification list:

- <observable facts that must be true after the step>

Expected test cases:

- <proof layer>: <behavior to verify>

What to add to docs:

- <docs that must be created or updated if the step changes repository truth>

Implementation discoveries:

- none yet
```

`Status` records whether the step is `pending`, `in progress`, `completed`, or
`deferred`. This matters because plan files are living documents. A later agent
should be able to distinguish planned work from completed work and deferred
work.

`Depends on` records sequencing. A step should say whether it depends on a
previous step, a completed discovery item, a package behavior, a migration path,
or no dependency at all.

`Pre-step discovery` lists the questions that must be closed before code changes
start. A good discovery item is not a vague note. It has a closure condition.

`Implementation boundary` says what the step may change, what it must preserve,
and what it must not touch.

`Verification list` defines what must be true after the implementation. It is
not limited to tests. It can include route behavior, file output, docs updates,
migration safety, command behavior, conflict handling, and proof that a non-goal
was not accidentally implemented.

`Expected test cases` maps the verification list to proof layers. Some behavior
belongs in unit tests. Some needs a browser. Some docs changes should be
verified by review against a checklist rather than brittle tests over prose.

`What to add to docs` keeps repository truth aligned. If the step changes a
convention, route contract, command surface, dictionary term, or migration
status, the plan names the docs that must change in the same pass.

`Implementation discoveries` starts as `none yet`. After execution, it becomes
the place where the agent records facts learned during implementation.

## Pre-step discovery prevents fantasy planning

Many failures blamed on spec-driven development are really failures of fantasy
planning.

The agent writes a plan without reading the repository. It invents APIs that do
not exist. It adds a new abstraction next to an existing one. It chooses a
library that is not installed. It generates a folder structure that violates the
project's boundaries. Then people blame the spec.

But the spec was never grounded.

Before implementation, a useful plan forces the agent to answer questions like:

- which files are relevant?
- which current behavior is part of the contract?
- which old behavior may be dropped?
- which conventions does this repository already use?
- which APIs, hooks, schemas, routes, or commands are authoritative?
- which proof layer owns this behavior?
- which assumptions are still uncertain?

I usually start by making the coding agent read the relevant plan section before
it changes anything:

> We'll start by looking at step 3 in `plans/PLAN.<step-file-name>.md`. Read the
> entire file first, then we'll focus on step 3.

Then I let the coding agent close the active step's discovery questions. It
reads the current code, tests, docs, and earlier implementation discoveries,
then reports the answer against the exact discovery item.

> I want you to investigate the first `Pre-step discovery` item: "read the
> current list-view conventions in `docs/` and identify which `/users` behaviors
> can already be implemented by reusing them" and report to me what you found.

The closure should not be "the agent thinks this is probably true." It should
become a small decision with evidence: code research, docs research, test
research, a planning decision, or a known current limitation.

This is one of the main differences between useful SDD and fantasy planning. The
plan does not pretend all answers are known up front. It records the questions
that must be answered before the next slice may start.

## Implementation boundaries prevent scope creep

The implementation boundary is the section that prevents the agent from turning
a small task into a broad rewrite.

For example:

```markdown
Implementation boundary:

- replace the custom `ListView` usage in `src/users/ViewClubs.jsx` with a
  `ProTable`-based implementation
- keep `useClubsQuery` and `useBackendPager` as the state and data owners
- preserve the existing create action route and details-link route
- do not add new user-list filters, sorting, or a real delete flow in this step
- do not create a shared list wrapper or shared user-list helper in this step
- do not migrate the user details, create, edit, members, or team views in this
  step
```

Without this, an agent sees related code and starts "improving" nearby behavior.
With it, the step has an explicit blast radius.

This is also how I protect ownership boundaries. A plan can say: replace the
presentation surface while keeping routing, authentication, transport, React
Query hooks, route semantics, and mutation behavior intact.

That distinction matters. Agents tend to solve across boundaries unless the
boundary is explicit.

## Verification separates checks from test cases

A spec that cannot fail is just prose.

The central discipline is turning acceptance criteria into two different kinds
of proof: the verification list and the expected test cases.

The verification list is the agent's end-of-step checklist. It says what must be
true before the agent can call the step done: the intended behavior works, the
required docs were updated, the expected tests were added or changed, the
relevant commands ran, the full test suite passes when the step requires it, and
any manual review happened. It can mention tests, but it is not only a test
plan. It is the step's completion contract.

Expected test cases are narrower and more durable. They describe the behavior
that should be covered by the repository's proof layers: unit tests, integration
tests, contract tests, browser tests, migration checks, type checks, lint rules,
snapshot tests, or architecture checks. They can be more detailed than the
verification list because they do not need to describe every completion
criterion. They describe what the test suite or automated checks should prove
after implementation.

If the plan says `/users` must keep row navigation to `/users/:id`, the
verification list might require the agent to confirm the route still works, run
the relevant browser check, and record the command output. The expected test
cases should name the durable coverage: for example, a browser test that clicks
a row and asserts that the route changes to the user detail page. If the plan
says a migration must not silently overwrite local repository instructions, the
verification list should require the conflict path to be checked. The expected
test cases should say which migration test covers that conflict behavior.

Good plans distinguish proof from narrative. An agent can write a convincing
summary while the system is still broken. The verification list forces the agent
to reconcile the step with implementation, tests, and docs. Expected test cases
make the durable proof explicit enough that future changes can break loudly.

GitHub's Spec Kit material makes a related point by separating specification,
planning, task breakdown, validation, and implementation into explicit phases
and checkpoints. [[3]](#ref-3) [[4]](#ref-4) I do not think everyone needs that
exact toolkit. I do think the separation of responsibilities is right.

## Implementation discoveries keep the plan alive

The plan becomes valuable after implementation only if it records what actually
happened.

After a step is implemented, I make the coding agent reconcile the plan with
reality. A completed step should not merely say `Status: completed`. It should
record what changed, what proved it, which checks ran, which docs were updated,
which drift was accepted, and which discoveries matter for later steps.

> Update `./plans/PLAN.<plan-file-name>.md` and update the 6. step's status. If
> you discovered or implemented anything in this step's implementation that's
> relevant for later steps but isn't part of docs or the plan file, add an
> `Implementation discoveries` section to the 6. step in which you describe
> those things.

That reconciliation step is where facts become durable.

If a browser test required a host-specific route-entry pattern, that belongs in
the plan. If a helper was implemented differently than originally expected, the
plan should say so before the next agent session builds on an obsolete
assumption. If a planned abstraction turned out to be unnecessary, that should
be visible before another agent tries to implement it.

I also let the coding agent do a docs coverage pass after substantial steps. The
step already names `What to add to docs`. After implementation, the agent checks
whether those docs were actually updated and whether the work revealed
additional repository truth that should be documented.

> Let's go through step 9 again, specifically what should be added to the docs.
> Did those things get added to the docs? Now that step 9 has been implemented,
> are there other things that should be put into docs that have not been put
> there?

Before moving to a later step, I make the agent read earlier implementation
discoveries as inputs. A later step should not blindly follow the original plan
if an earlier step changed the practical constraints.

> Given the `Implementation discoveries:` sections in steps prior to step 10,
> does this affect the 10. step and other later steps in any way?

The plan stays current by flowing discoveries forward. Discoveries close future
pre-step questions, reshape implementation boundaries, change proof strategy, or
mark planned work as no longer necessary.

## Plans reduce comprehension debt

Comprehension debt is the widening gap between the volume of code produced by AI
and the code a developer actually understands.

That gap grows when implementation moves faster than human comprehension. A
session may leave behind correct code, passing tests, and a plausible summary,
but the developer may not understand why the code is shaped that way, which
constraints it preserves, or which decisions are now embedded in the
implementation.

Lost discoveries make the debt harder to repay. They live in chat history,
terminal scrollback, an agent's short-term context, a failed test run, or one
developer's memory. Agentic engineering makes this worse because agents can move
quickly through a large amount of context. They find local constraints, package
quirks, test environment issues, old conventions, hidden ownership boundaries,
and partial drift. If those discoveries are not written back, the human reviewer
has to reconstruct the design after the code already exists.

A living plan reduces that debt by making the human mental model part of the
work. The next agent does not need to reconstruct the whole story from old
conversations. It can read the current plan, see which discoveries are closed,
which steps are completed, which checks proved the work, which docs were
updated, and which decisions constrain the next slice.

This is the difference between a plan as ceremony and a plan as working memory.
The plan is useful only if it remains current enough to trust, specific enough
to constrain the next change, and honest enough to record when implementation
changed what the plan originally believed.

## The spec must update when reality contradicts it

The best criticism of spec-driven development is spec drift.

The best answer is not "engineers should remember to update the docs." That has
never been reliable enough.

The workflow should include a reconciliation step at the end of each slice:

```text
Was the implementation built as specified?
If not, what changed?
Was the original plan wrong, incomplete, or superseded?
Did implementation reveal a new constraint?
Do the plan, tests, docs, or decision record need to change?
```

This is where the agent should help. If an agent can edit code, it can also
propose updates to the plan, spec, or docs when it discovers a mismatch. The
human still approves the change. But the maintenance work should not depend
entirely on a tired engineer remembering to update a document after the hard
part feels done.

A living spec is not a spec that magically stays correct. It is a spec with a
mandatory repair path.

## When this workflow is worth the overhead

A credible defense of spec-driven development has to concede that it is not
free.

It adds overhead. It creates artifacts. It asks people to slow down before
implementation. For some work, that is the wrong trade.

Spec-driven development is usually overkill for:

- tiny bug fixes
- one-line refactors
- exploratory prototypes
- throwaway scripts
- pure UI experimentation

It is much more useful for:

- cross-file behavior changes
- security-sensitive work
- data model changes
- API changes
- migration work
- team-owned features
- agent-implemented features
- compliance or audit-heavy domains

That concession makes the argument stronger, not weaker.

Spec-driven development is not a universal ceremony. It is a risk-control
mechanism. Use it when ambiguity, coordination cost, architectural risk, or
agent autonomy is high enough to justify the added structure.

## The practical workflow

The workflow worth defending is not:

```text
big prompt
-> giant spec
-> giant plan
-> giant implementation
-> giant mess
```

It is:

```text
intent
-> repo-grounded discovery
-> explicit constraints
-> step contract
-> implementation
-> checks
-> review
-> plan and docs reconciliation
```

Each step has a distinct job.

The intent says what matters and why. Discovery prevents fantasy planning.
Constraints prevent the agent from solving the wrong problem in a technically
plausible way. The step contract makes implementation reviewable. Checks give
the work a failure mode. Human review handles tradeoffs. Reconciliation keeps
project memory current.

Bad SDD produces Markdown.

Good SDD produces alignment, constraints, checks, reviewable slices, and updated
project memory.

## Conclusion: SDD is useful when it becomes project memory

The backlash against spec-driven development is mostly a backlash against stale
document-driven development.

A static spec handed to an AI agent is brittle. It creates false confidence,
review overload, and stale instructions that agents may execute confidently. If
that is what someone means by SDD, the criticism lands.

But a small, living, repo-grounded, test-backed plan is not waterfall. It is a
control system for AI-assisted software development.

The code remains the operational artifact. The tests provide executable truth.
The docs record durable repository truth. The plan records the current execution
contract. The human remains responsible for tradeoffs. The agent works inside a
narrower, more reviewable boundary.

That is the version worth using.

## References

1. <a id="ref-1"></a>
   [Augment Code, "What spec-driven development gets wrong."](https://www.augmentcode.com/blog/what-spec-driven-development-gets-wrong)
2. <a id="ref-2"></a>
   [Birgitta Boeckeler, "Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl."](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
3. <a id="ref-3"></a>
   [GitHub Blog, "Spec-driven development with AI: Get started with a new open source toolkit."](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
4. <a id="ref-4"></a>
   [GitHub Spec Kit, "Quick Start Guide."](https://github.github.com/spec-kit/quickstart.html)
5. <a id="ref-5"></a>
   [Martin Fowler, "Is High Quality Software Worth the Cost?"](https://martinfowler.com/articles/is-quality-worth-cost.html)
6. <a id="ref-6"></a>
   [Martin Fowler, "Is Design Dead?"](https://martinfowler.com/articles/designDead.html)
7. <a id="ref-7"></a>
   [Software Engineering at Google, Chapter 10: Documentation.](https://abseil.io/resources/swe-book/html/ch10.html)
