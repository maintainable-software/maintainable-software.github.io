---
layout: post
title: "How I Use Living Plans for Spec-Driven Development"
description:
  "How I use short-lived living plan files as temporary execution contracts for
  AI coding agents: repo-grounded discovery, step boundaries, verification,
  reconciliation, and durable docs handoff."
date: 2026-05-01
updated: 2026-05-02
published: true
author: "Jan-Gerke Salomon"
author_url: "/me/"
canonical_url: "https://maintainable.software/how-i-use-living-plans-for-spec-driven-development/"
image: "/assets/images/posts/how-i-use-living-plans-for-spec-driven-development.png"
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
  short-lived living plan files as temporary execution contracts for one bounded
  feature or change so discovery, implementation, checks, docs, and
  implementation discoveries stay connected while the work is active.
---

I wanted to write an article about how I use living plan files when working with
AI coding agents for quite some time now. Then Awesome's video,
["The new spec-driven workflow is a mess..."](https://www.youtube.com/watch?v=nnUMJX9013Y),
popped up in my feed. The critique is worth taking seriously, as it seems that
lately a lot of developers haven't understood how specs can be leveraged without
having the issues that were presented there.

The weak version of spec-driven development is easy to criticize: write a large
document, hand it to an AI coding agent, wait for a large implementation, and
then discover that the document did not survive contact with the real codebase.
That deserves the criticism it gets.

## The workflow in brief

I use living plan files as execution contracts for AI coding agents:

1. Discover the current repository reality before planning the change.
2. Define the next bounded implementation slice.
3. Make the expected checks explicit before or alongside the step.
4. Let the agent implement only that slice.
5. Reconcile the plan with what implementation revealed.
6. Move durable findings into tests, docs, specs, decision records, or code
   comments.
7. Mark the plan completed, abandoned, or superseded. After that, it is
   historical only.

## What living plans are for

Spec-driven development is the practice of making a written specification or
plan constrain implementation work before code changes start. The version that
works with AI coding agents is not "write everything up front." It is "make the
next bounded change explicit enough that the agent can execute it, verify it,
and reconcile it with reality." That puts it closer to the structured,
multi-phase AI coding workflows now described by Thoughtworks and GitHub than to
a one-shot prompt-to-code workflow. [[1]](#ref-1) [[2]](#ref-2) [[3]](#ref-3)
[[4]](#ref-4) [[5]](#ref-5)

A living plan is a short-lived plan file that changes as implementation teaches
the team new facts. It records the repository facts relevant to the current
feature or bounded change, the active implementation boundary, the checks that
prove the step, and the implementation discoveries that should affect the
remaining active work. It is authoritative only while that feature or change is
being implemented. In my work, that usually means a few days, and sometimes up
to a week. After the feature lands, is abandoned, or is superseded, the plan is
historical only, not repository truth. That maps to the same underlying lesson
in OpenAI's and Anthropic's agent-harness writing: long-running coding agents
need repo-local context, explicit work boundaries, validation loops, and durable
progress artifacts. [[6]](#ref-6) [[7]](#ref-7) [[8]](#ref-8)

Comprehension debt is the gap between the amount of code a team has accepted and
the amount of that code the team can still explain, review, and evolve safely.
Living plans reduce that debt by forcing agent discoveries to be evaluated while
the work is active. Temporary discoveries stay in the active plan for later
steps. Future-facing discoveries must move into durable project artifacts before
the plan expires. It is a narrower sibling of technical debt: the cost shows up
when future changes require people or agents to rediscover intent, constraints,
and design rationale before they can safely modify the system. [[9]](#ref-9)
[[6]](#ref-6) [[10]](#ref-10) [[11]](#ref-11)

The version I find useful is different. I use plan files as living execution
contracts. They are grounded in the current repository, split into small
implementation slices, tied to checks, and updated after each meaningful step.
Their job is not to replace engineering judgment. Their job is to keep the
agent, the code, the tests, the docs, and the human reviewer aligned while the
current repository, the actual task, and the shape of the work are being
analyzed. That is the same control problem described in current context
engineering and harness engineering work: the agent needs relevant context,
tools, guardrails, feedback, and human steering at the right level of the loop.
[[6]](#ref-6) [[12]](#ref-12) [[13]](#ref-13) [[14]](#ref-14) [[10]](#ref-10)

That matters because, unless we actively counteract it, agentic engineering
creates comprehension debt: the widening gap between the volume of AI-generated
code and the developers' understanding of that code. Agents discover facts while
implementing, but the real risk is not only that those facts disappear. The real
risk is that the codebase grows faster than the human mental model that should
govern it. Working with a living plan allows us to reflect on implementation
changes, intervene between different implementation steps, define what should be
persisted in docs, what should be tested and - most importantly - we can
influence the code itself in a much more straightforward way. OpenAI's Codex
harness write-up makes the same operational point from the opposite direction:
knowledge that is not visible in the repository is not visible to the agent.
[[6]](#ref-6)

This brings the creative work back to the developer while the coding agent's
task is mostly writing the implementation for what was worked out while working
on the living plan. The only "creative" parts that are left to the coding agent
are minor implementation details. That keeps the human on the design and
tradeoff loop while the agent works inside the bounded implementation loop.
[[10]](#ref-10)

## Why static specs fail with AI coding agents

### Stale specs are the real problem

The strongest objection to spec-driven development is not "documentation is
bad." It is that documents drift.

That objection lands especially hard in AI-assisted work. A stale design doc may
mislead a human who happens to read it. A stale spec can mislead an agent that
executes it confidently. Augment's critique of spec-driven development makes
that point well: if agents work from specifications, those specifications need a
maintenance loop, not just an authoring loop. [[15]](#ref-15)

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
against the repository. Thoughtworks makes a related caution about emerging SDD
tools: some workflows generate lengthy spec files that are hard to review, and
the usefulness depends heavily on task size and type. [[4]](#ref-4)

When implementation reveals that the plan was wrong, the document becomes worse
than useless. It becomes a source of confident misdirection.

### Bad spec-driven development is document-driven development

I find it useful to separate spec-driven development (SDD) from document-driven
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
typing. Requirements and validation work has always had to deal with
correctness, completeness, clarity, consistency, traceability, and evidence; AI
does not make those concerns disappear. [[16]](#ref-16)

The useful version of spec-driven development treats the spec or plan as a
working control surface. It is allowed to change when the repository teaches us
something. It is useful only while it remains current enough to trust. GitHub's
own Spec Kit process reflects the same concern by separating specification,
clarification, planning, tasking, analysis, and implementation instead of asking
one artifact to do every job at once. [[3]](#ref-3) [[5]](#ref-5)

### Evolutionary design needs living documentation

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
when coding agents write the code instead of teams. [[9]](#ref-9)
[[17]](#ref-17)

That does not mean every local implementation decision should simply become the
design. Undisciplined evolutionary design degenerates into code-and-fix work:
small tactical choices accumulate, coupling grows, simple changes start touching
too many places, and the system becomes harder to reason about. Planned design
is an understandable reaction to that failure mode.

The argument against planned design is very similar to the argument against SDD:
they try to settle too much before the most important evidence exists.

Disciplined evolutionary design, and arguably disciplined spec-driven design,
sits between those extremes. It accepts that the design must change as
understanding improves, but it also insists on the conditions that make change
safe: clear concepts, cohesive modules, low coupling, tests, continuous
verification, refactoring, and people who care enough to keep the design
converging instead of letting it drift. That is standard software-design ground:
modularity improves comprehensibility and flexibility, automated tests support
confident change, and protected variation keeps expected change from leaking
through the whole system. [[18]](#ref-18) [[19]](#ref-19) [[20]](#ref-20)

When practicing SDD, documentation should be included in the design space, as
“documentation is often so tightly coupled to code that it should […] be treated
as code.” [[21]](#ref-21)

This matters even more when working with coding agents. Agents can implement a
large amount of code quickly, but that speed amplifies whichever design process
is in place. If the process is ad hoc, the agent produces ad hoc design faster.
If the spec is static, the agent can confidently preserve an outdated idea. If
the plan is alive, the agent can help execute one step while the developer keeps
the design work visible. Current agent-harness reports from OpenAI and Anthropic
describe the same failure mode: without structure, agents try to do too much,
lose or compress context poorly, or drift from the intended work. [[6]](#ref-6)
[[8]](#ref-8) [[22]](#ref-22)

That is how I use living plans. I use them to understand the current design,
document the relevant parts for the current work/task, then work out what the
code should look like after the next step. Not after every future step. Not
after the imagined final architecture. Just after the next bounded change that
is ready to be implemented.

That one-step design question is important. It forces me to analyze the codebase
carefully enough to understand what is there, decide what the design should
become next, and keep control over the direction of the code instead of
outsourcing that judgment to the agent. The plan records the current findings,
the next boundary, the checks that should prove the change, and the docs or
specs that need to move with the implementation.

This is also why I treat specs and docs with the same seriousness as code. If a
step changes the implemented reality, the plan should say what changed, tests
should prove the important behavior, and durable docs should be updated when
they describe repository truth. The design evolves, but the written model of the
system evolves with it. Google describes tests as executable documentation when
they stay clear and behavior-focused, and its documentation guidance treats docs
as part of maintaining repository knowledge over time. [[21]](#ref-21)
[[18]](#ref-18) [[23]](#ref-23)

For me, that is the practical link between evolutionary design and living plans:
the plan is not a frozen design document. It is the control surface that lets me
practice evolutionary design deliberately while a coding agent does the
implementation work inside the next agreed boundary.

## What a living plan does

### A good plan is an execution contract

For application work with AI coding agents, I do not think the spec replaces
code. The relationship is simpler:

- the code is the operational truth
- the tests are the executable truth
- the docs/specs record durable repository and product truth
- the temporarily relevant plan records the current execution contract
- the agent is constrained by all of them

A plan in agentic engineering is not a wish list. It is an execution contract
that lets a human or agent understand the current feature context, make a
bounded change, prove the result, and carry discovered truth forward while the
plan is active. This is the practical shape of modern agent harnesses: plan,
edit, run tools, observe results, repair failures, update docs or status, and
repeat. [[6]](#ref-6) [[7]](#ref-7)

This is also why I do not treat the final documentation as something I should
fully write before implementation. The durable spec that lands in a repository's
docs is often an implementation artifact produced with the help of the agent
after the code has revealed the real shape of the work.

The plan comes earlier. It is more concrete than a product brief, less permanent
than final docs, and specific enough to constrain one implementation slice at a
time. Anthropic's long-running-agent work found that asking agents to work
incrementally and leave structured progress artifacts was critical to avoiding
one-shotting and undocumented half-finished work. [[8]](#ref-8)

### A living plan expires

A living plan is temporary by design. It is useful while one feature or bounded
change is being implemented. In my work, that usually means one or two days, and
sometimes up to a week for a larger feature. It should remain current during
that implementation window because the agent and reviewer are actively using it
to decide what happens next.

After the feature lands, is abandoned, or is superseded, the plan stops being
authoritative. It can explain the history of a change, but it should not be used
as repository truth or future research input unless it is revalidated against
current code, tests, docs, specs, schemas, migrations, and relevant code
comments. Anything important enough to guide future work must be moved into one
of those durable surfaces before the plan is marked done.

### What my plan files are for

The plan files I use usually live in `plans/PLAN.*.md`. They are deliberately
plain. Their job is to turn a vague change into a sequence of bounded,
reviewable implementation slices.

Their expected lifetime is the implementation of one feature or bounded change.
Once that work is merged, abandoned, or superseded, the plan is historical only.

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
- where newly discovered future-facing facts must be written back before the
  plan expires

This is the practical answer to the "you cannot know everything up front"
critique. I agree. The point of the plan is not to know everything up front. The
point is to make unknowns explicit, close the relevant unknowns before each
implementation slice, and record the discoveries before the next slice starts.
That is also why Spec Kit separates clarification and analysis from
implementation instead of treating the first prompt as final. [[3]](#ref-3)

### The structure of a useful plan file

Not every plan needs the same top-level sections. The exact headings can vary.
The important part is that each section owns one kind of information.

`Purpose` or `Goal` says why the plan exists. It should be short and
directional. For example: move an admin frontend from a JSX-heavy UI to a
simpler surface with a third-party UI library, or migrate plain text files with
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

Status: active.

Scope: one bounded feature or change.

Authoritative while: this feature or change is being implemented.

After completion: historical only; not repository truth.

## Purpose

Why this change exists, what problem it solves, and what the plan is meant to
make possible.

## Current Findings

Repository facts relevant to this change: files, behavior, constraints, prior
decisions, known gaps, and anything already discovered during investigation.

## Explicit Requirements

Hard boundaries that every step must obey.

## Working Target

The intended end state.

## Step-By-Step Implementation Plan

### Plan-Wide Execution Rules

Rules every step must obey.
```

`Plan-Wide Execution Rules` is important because agents tend to generalize too
early. If a plan should create several similar components but shouldn't create a
generalized abstraction yet, that belongs in the plan-wide rules. If a workflow
migration must fail closed instead of guessing how to reconstruct state, that
belongs there too.

Another plan-wide rule is the durable knowledge rule: if a step discovers or
creates information future work needs, do not leave that information only in the
plan. Move it into the relevant docs, specs, test, decision record, schema,
migration note, or code comment before marking the step completed. Completed
plans are historical only.

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
That caution is not agent-specific; wrong abstractions are a known source of
future change cost, and agent speed makes that cost easier to create at scale.
[[9]](#ref-9) [[24]](#ref-24)

### Each implementation step has its own contract

The most important section is the step-by-step implementation plan.

That is where a plan stops being an essay and becomes agent-executable. Each
step should be small enough that an agent can implement it, verify it, and stop
without dragging unrelated work into the same change. That matches the pattern
in Anthropic's long-running-agent experiments: choose one feature, make
incremental progress, self-verify, and leave the environment clean for the next
session. [[8]](#ref-8)

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

Durable docs/specs to update before this step is done:

- <docs, specs, ADRs, README sections, schemas, migration notes, or code
  comments that must be updated>
- <or: none; this step changes no durable repository or product truth>

Implementation discoveries:

- none yet
```

`Status` records whether the step is `pending`, `in progress`, `completed`, or
`deferred`. This matters because plan files are living documents while the work
is active. A later agent in the same active feature should be able to
distinguish planned work from completed work and deferred work.

`Depends on` records sequencing. A step should say whether it depends on a
previous step, a completed discovery item, a package behavior, a migration path,
or no dependency at all.

`Pre-step discovery` lists the questions that must be closed before code changes
start. A good discovery item is not a vague note. It has a closure condition.

`Implementation boundary` says what the step may change, what it must preserve,
and what it must not touch.

`Verification list` defines what must be true after the implementation. It is
not limited to tests. It can include route behavior, file output, the required
docs/specs handoff, migration safety, command behavior, conflict handling, and
proof that a non-goal was not accidentally implemented.

`Expected test cases` maps the verification list to proof layers. Some behavior
belongs in unit tests. Some needs a browser. Some docs changes should be
verified by review against a checklist rather than brittle tests over prose.

`Durable docs/specs to update before this step is done` is the handoff from
temporary plan knowledge to durable repository knowledge. If the step changes a
convention, route contract, command surface, dictionary term, migration status,
ownership boundary, product behavior, or design rationale, the plan names where
that truth must be written before the step can be marked completed. If there is
nothing durable to update, the section should say `none` and why.

`Implementation discoveries` starts as `none yet`. After execution, it records
facts learned during implementation that affect the remaining active plan.

## How living plans keep agent work grounded

### Pre-step discovery prevents fantasy planning

Many failures blamed on spec-driven development are really failures of fantasy
planning.

The agent writes a plan without reading the repository. It invents APIs that do
not exist. It adds a new abstraction next to an existing one. It chooses a
library that is not installed. It generates a folder structure that violates the
project's boundaries. Then people blame the spec. Context engineering guidance
from Anthropic and Fowler makes the same underlying point: the problem is often
not the model's ability to write code, but the quality, relevance, and structure
of the context it is asked to operate inside. [[13]](#ref-13) [[14]](#ref-14)

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
research, a planning decision, or a known current limitation. That is why code
search, tests, and repository-local docs are part of the proof layer rather than
optional background reading. [[21]](#ref-21) [[18]](#ref-18) [[25]](#ref-25)

This is one of the main differences between useful SDD and fantasy planning. The
plan does not pretend all answers are known up front. It records the questions
that must be answered before the next slice may start.

### Implementation boundaries prevent scope creep

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
boundary is explicit. Explicit module boundaries and protected variation are old
software-design tools; with coding agents, they also become operational
guardrails. [[6]](#ref-6) [[19]](#ref-19) [[20]](#ref-20)

### Verification separates checks from test cases

A spec that cannot fail is just prose.

The central discipline is turning acceptance criteria into two different kinds
of proof: the verification list and the expected test cases. NASA's software
engineering handbook draws the same useful distinction between validating that
the right system is being produced and verifying that the product is being
produced correctly. [[16]](#ref-16)

The verification list is the agent's end-of-step checklist. It says what must be
true before the agent can call the step done: the intended behavior works, the
required docs/specs handoff was completed or explicitly marked not applicable,
the expected tests were added or changed, the relevant commands ran, the full
test suite passes when the step requires it, and any manual review happened. It
can mention tests, but it is not only a test plan. It is the step's completion
contract.

Expected test cases are narrower and more durable. They describe the behavior
that should be covered by the repository's proof layers: unit tests, integration
tests, contract tests, browser tests, migration checks, type checks, lint rules,
snapshot tests, or architecture checks. They can be more detailed than the
verification list because they do not need to describe every completion
criterion. They describe what the test suite or automated checks should prove
after implementation. Google's testing guidance is useful here because it
separates test size, test scope, determinism, behavior-focused unit tests, and
the role of automated testing in making change safer. [[18]](#ref-18)
[[23]](#ref-23)

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
to reconcile the step with implementation, tests, and the durable docs/specs
handoff. Expected test cases make the durable proof explicit enough that future
changes can break loudly. That fits the broader AI-risk-management principle
that trustworthy AI use needs evaluation, validation, accountability, and
evidence, not only plausible output. [[26]](#ref-26)

Boeckeler's comparison of Kiro, GitHub Spec Kit, and Tessl makes a related
point: the useful part of modern SDD tooling is not the existence of more
generated Markdown, but the separation between specification, planning, task
breakdown, validation, and implementation. [[1]](#ref-1) GitHub's Spec Kit
material applies that split through explicit phases and checkpoints.
[[2]](#ref-2) [[3]](#ref-3) [[4]](#ref-4) [[5]](#ref-5) I do not think everyone
needs that exact toolkit. I do think the separation of responsibilities is
right.

### Implementation discoveries keep the active plan honest

The active plan remains useful after implementation only if it records what
actually happened.

After a step is implemented, I make the coding agent reconcile the plan with
reality. A completed step should not merely say `Status: completed`. It should
record what changed, what proved it, which checks ran, which docs/specs were
updated, which drift was accepted, which future-facing discoveries were moved
into durable artifacts, and which discoveries still matter for later active
steps. This is the same kind of state handoff that Anthropic's progress-file
pattern and OpenAI's repository-knowledge system are trying to make durable.
[[6]](#ref-6) [[8]](#ref-8)

> Update `./plans/PLAN.<plan-file-name>.md` and update the 6. step's status. If
> you discovered or implemented anything in this step's implementation that's
> relevant for later active steps, update the `Implementation discoveries`
> section. If it should matter after this plan expires, move it into the
> relevant docs, specs, tests, decision record, schema, migration note, or code
> comment before marking the step completed.

That reconciliation step is where facts are either carried forward into the
remaining active steps or moved into durable project artifacts.

If a browser test required a host-specific route-entry pattern, that belongs in
the active plan while later steps need it. If the pattern should guide future
browser tests after the feature lands, it belongs in durable docs or test-helper
documentation. If a helper was implemented differently than originally expected,
the plan should say so before the next active agent session builds on an
obsolete assumption. If a planned abstraction turned out to be unnecessary, that
should be visible before another agent tries to implement it.

I also let the coding agent do a docs coverage pass after substantial steps. The
step already names `Durable docs/specs to update before this step is done`.
After implementation, the agent checks whether those updates were actually made
and whether the work revealed additional repository truth that should be
documented before the plan expires. This is the practical maintenance loop that
keeps documentation from drifting away from code. [[21]](#ref-21) [[6]](#ref-6)

> Let's go through step 9 again, especially
> `Durable docs/specs to update before this step is done`.
>
> Were all listed docs/specs updates actually made? Did implementation reveal
> any additional facts, constraints, contracts, or design decisions that future
> work would need? For each such fact, either move it into the relevant durable
> artifact now or explain why it is intentionally plan-only historical context.
> Do not mark the step completed until this handoff is done.

Before moving to a later step, I make the agent read earlier implementation
discoveries as inputs. A later step should not blindly follow the original plan
if an earlier step changed the practical constraints.

> Given the `Implementation discoveries:` sections in steps prior to step 10,
> does this affect the 10. step and other later steps in any way?

The active plan stays current by flowing discoveries forward. Discoveries close
future pre-step questions, reshape implementation boundaries, change proof
strategy, or mark planned work as no longer necessary. Current long-horizon
agent guidance points in the same direction: externalized state, status updates,
and session-to-session handoff are what let work continue without re-solving the
same context problem each time. [[7]](#ref-7) [[8]](#ref-8)

## Why living plans reduce comprehension debt

### Plans reduce comprehension debt

Comprehension debt is the widening gap between the volume of code produced by AI
and the code a developer actually understands. It matters for the same economic
reason internal quality matters: future changes get slower and riskier when the
system is harder to understand. [[9]](#ref-9)

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
has to reconstruct the design after the code already exists. OpenAI describes
the same repo-legibility constraint bluntly: information outside the agent's
accessible context effectively does not exist to the agent. [[6]](#ref-6)

A living plan reduces that debt by making the human mental model part of the
active work. While the feature is still being implemented, the next agent does
not need to reconstruct the whole story from old conversations. It can read the
current plan, see which discoveries are closed, which steps are completed, which
checks proved the work, which docs were updated, and which decisions constrain
the next slice.

This is the difference between a plan as ceremony and a plan as working memory.
The plan is useful only if it remains current enough to trust while active,
specific enough to constrain the next change, and honest enough to record when
implementation changed what the plan originally believed. Anthropic's
long-running-agent work uses progress files and feature status for the same
reason: the next session needs reliable externalized memory. [[8]](#ref-8)

### The spec must update when reality contradicts it

The best criticism of spec-driven development is spec drift.

The best answer is not "engineers should remember to update the docs." That has
never been reliable enough. Google calls out the tenuous relationship between
software documentation and code when requirements become outdated or miss edge
cases; relying on memory alone is exactly how that drift persists.
[[18]](#ref-18)

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
part feels done. OpenAI describes recurring doc-gardening agents that scan for
stale or obsolete repository knowledge and open fix-up pull requests; the same
principle applies at smaller scale inside a living plan. [[6]](#ref-6)

A living spec is not a spec that magically stays correct. It is a spec with a
mandatory repair path.

### When this workflow is worth the overhead

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
agent autonomy is high enough to justify the added structure. That aligns with
NIST's broader framing for generative AI: higher-risk uses need stronger
governance, evidence, validation, and accountability. [[26]](#ref-26)

## A practical living-plan workflow

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
-> plan expiry
```

| Step                         | Purpose                                                       | Output                                                                                    |
| ---------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Intent                       | State what matters and why the change exists.                 | A clear problem statement and success direction.                                          |
| Repo-grounded discovery      | Replace assumptions with current repository evidence.         | Current findings, open questions, and known constraints.                                  |
| Explicit constraints         | Prevent the agent from solving the wrong problem.             | Non-negotiable requirements and out-of-scope work.                                        |
| Step contract                | Make the next implementation slice reviewable.                | A bounded step with discovery, boundaries, verification, and docs expectations.           |
| Implementation               | Let the agent change code inside the agreed boundary.         | A focused code change.                                                                    |
| Checks                       | Give the work a failure mode.                                 | Test results, command output, manual checks, or review evidence.                          |
| Review                       | Let the human evaluate tradeoffs and design direction.        | Approval, correction, or a revised plan.                                                  |
| Plan and docs reconciliation | Keep the active plan honest and move durable truth out of it. | Updated active-plan notes, durable docs/specs/tests, and implementation discoveries.      |
| Plan expiry                  | Prevent completed plans from becoming stale repository truth. | A completed, abandoned, or superseded plan that is historical only after durable handoff. |

Each step has a distinct job.

The intent says what matters and why. Discovery prevents fantasy planning.
Constraints prevent the agent from solving the wrong problem in a technically
plausible way. The step contract makes implementation reviewable. Checks give
the work a failure mode. Human review handles tradeoffs. Reconciliation keeps
the active plan honest while durable truth moves into durable artifacts. Plan
expiry prevents the completed artifact from masquerading as current repository
truth. The same loop appears, in different language, in current agent practice:
plan, implement, validate, repair, update docs or status, and repeat.
[[7]](#ref-7) [[8]](#ref-8)

Bad SDD produces Markdown.

Good SDD produces alignment, constraints, checks, reviewable slices, and durable
handoff.

## Conclusion: Living plans keep spec-driven development grounded

The backlash against spec-driven development is mostly a backlash against stale
document-driven development.

A static spec handed to an AI agent is brittle. It creates false confidence,
review overload, and stale instructions that agents may execute confidently. If
that is what someone means by SDD, the criticism lands. The critique is also
consistent with the problems described by Thoughtworks, GitHub, OpenAI, and
Anthropic: context can rot, agents need checkpoints, and generated artifacts
need reviewable structure. [[15]](#ref-15) [[4]](#ref-4) [[6]](#ref-6)
[[8]](#ref-8)

But a small, living, repo-grounded, test-backed plan is not waterfall. It is a
control system for AI-assisted software development.

The code remains the operational artifact. The tests provide executable truth.
The docs record durable repository truth. The plan records the current execution
contract while one bounded feature or change is active. When that work is done,
the plan loses authority; anything that should guide future work must already
have moved into code, tests, docs, specs, decision records, schemas, migrations,
or relevant code comments. The human remains responsible for tradeoffs. The
agent works inside a narrower, more reviewable boundary. That division of labor
is the through-line across harness engineering, context engineering, testing
practice, and documentation practice. [[21]](#ref-21) [[6]](#ref-6)
[[13]](#ref-13) [[18]](#ref-18)

That is the version worth using.

## FAQ about living plans and spec-driven development

### What is a living plan in spec-driven development?

A living plan is a short-lived repository file that constrains one active
feature or bounded implementation change. It is updated as implementation
reveals new facts, usually over a few days and sometimes up to a week. It is not
a permanent design document. Once the feature lands, is abandoned, or is
superseded, the plan is historical only; durable truth belongs in code, tests,
docs, specs, decision records, schemas, migrations, or relevant code comments.
[[6]](#ref-6) [[7]](#ref-7) [[8]](#ref-8)

### How is a living plan different from a static spec?

A static spec tries to stay authoritative after it is written. A living plan
stays useful by changing when repository reality contradicts it. If discovery,
implementation, checks, or review expose a wrong assumption, the plan records
the new truth before later active work depends on the old one. [[21]](#ref-21)
[[16]](#ref-16)

### Why do living plans matter for AI coding agents?

AI coding agents can move faster than the developer's mental model. Living plans
slow the right parts down: discovery, boundaries, verification, and
reconciliation. That keeps agent work reviewable, turns implementation
discoveries into active working memory, and forces durable handoff before the
plan expires. [[6]](#ref-6) [[8]](#ref-8) [[10]](#ref-10)

### When should a team use living plans?

Use living plans when ambiguity, coordination cost, architectural risk, or agent
autonomy is high enough to justify the overhead. They are most useful for
cross-file behavior changes, migrations, API changes, security-sensitive work,
team-owned features, and agent-implemented features. [[16]](#ref-16)
[[26]](#ref-26)

### Do living plans replace tests or docs?

No. The plan records the current execution contract. Tests provide executable
truth. Durable docs record repository or product truth after implementation has
settled. A good living plan connects those surfaces instead of replacing them.
[[21]](#ref-21) [[18]](#ref-18)

### Should future agents use completed plans as repository truth?

No. Completed, abandoned, or superseded plans are historical only. They can
explain what was proposed or what happened during a past implementation, but
they should not be treated as current repository truth. A future agent should
use current code, tests, docs, specs, schemas, migrations, and decision records
as authoritative. If an old plan seems relevant, it must be revalidated against
those durable artifacts before it influences new work.

### Where do important implementation findings go?

Important findings may first appear in `Current Findings` or
`Implementation discoveries` while the plan is active. Before a step or feature
is completed, any finding that should matter to future work must be moved into a
durable artifact: tests, docs, specs, decision records, schemas, migrations, or
code comments. The plan should not be the final home for important repository
knowledge.

## References

1. <a id="ref-1"></a>
   [Birgitta Boeckeler, "Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl."](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
2. <a id="ref-2"></a>
   [GitHub Blog, "Spec-driven development with AI: Get started with a new open source toolkit."](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
3. <a id="ref-3"></a>
   [GitHub Spec Kit, "Quick Start Guide."](https://github.github.com/spec-kit/quickstart.html)
4. <a id="ref-4"></a>
   [Thoughtworks Technology Radar, "Spec-driven development."](https://www.thoughtworks.com/en-gb/radar/techniques/spec-driven-development)
5. <a id="ref-5"></a>
   [GitHub Spec Kit, "Specification-Driven Development (SDD)."](https://github.com/github/spec-kit/blob/main/spec-driven.md)
6. <a id="ref-6"></a>
   [OpenAI, "Harness engineering: leveraging Codex in an agent-first world."](https://openai.com/index/harness-engineering/)
7. <a id="ref-7"></a>
   [OpenAI Developers, "Run long horizon tasks with Codex."](https://developers.openai.com/blog/run-long-horizon-tasks-with-codex)
8. <a id="ref-8"></a>
   [Anthropic, "Effective harnesses for long-running agents."](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
9. <a id="ref-9"></a>
   [Martin Fowler, "Is High Quality Software Worth the Cost?"](https://martinfowler.com/articles/is-quality-worth-cost.html)
10. <a id="ref-10"></a>
    [Martin Fowler and Birgitta Böckeler, "Humans and Agents in Software Engineering Loops."](https://www.martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html)
11. <a id="ref-11"></a>
    [Martin Fowler, "Technical Debt Quadrant."](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html)
12. <a id="ref-12"></a>
    [OpenAI Developers, "Building an AI-Native Engineering Team."](https://developers.openai.com/codex/guides/build-ai-native-engineering-team)
13. <a id="ref-13"></a>
    [Anthropic, "Effective context engineering for AI agents."](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
14. <a id="ref-14"></a>
    [Martin Fowler and Birgitta Böckeler, "Context Engineering for Coding Agents."](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html)
15. <a id="ref-15"></a>
    [Augment Code, "What spec-driven development gets wrong."](https://www.augmentcode.com/blog/what-spec-driven-development-gets-wrong)
16. <a id="ref-16"></a>
    [NASA Software Engineering Handbook, "SWE-055 - Requirements Validation."](https://swehb.nasa.gov/spaces/SWEHBVC/pages/50888911/SWE-055+-+Requirements+Validation)
17. <a id="ref-17"></a>
    [Martin Fowler, "Is Design Dead?"](https://martinfowler.com/articles/designDead.html)
18. <a id="ref-18"></a>
    [Software Engineering at Google, Chapter 11: Testing Overview.](https://abseil.io/resources/swe-book/html/ch11.html)
19. <a id="ref-19"></a>
    [D. L. Parnas, "On the Criteria To Be Used in Decomposing Systems into Modules."](https://prl.khoury.northeastern.edu/img/p-tr-1971.pdf)
20. <a id="ref-20"></a>
    [Craig Larman, "Protected Variation: The Importance of Being Closed."](https://www.martinfowler.com/ieeeSoftware/protectedVariation.pdf)
21. <a id="ref-21"></a>
    [Software Engineering at Google, Chapter 10: Documentation.](https://abseil.io/resources/swe-book/html/ch10.html)
22. <a id="ref-22"></a>
    [Anthropic, "Harness design for long-running application development."](https://www.anthropic.com/engineering/harness-design-long-running-apps)
23. <a id="ref-23"></a>
    [Software Engineering at Google, Chapter 12: Unit Testing.](https://abseil.io/resources/swe-book/html/ch12.html)
24. <a id="ref-24"></a>
    [Sandi Metz, "The Wrong Abstraction."](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction)
25. <a id="ref-25"></a>
    [Software Engineering at Google, Chapter 17: Code Search.](https://abseil.io/resources/swe-book/html/ch17.html)
26. <a id="ref-26"></a>
    [NIST, "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile."](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
