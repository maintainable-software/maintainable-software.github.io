---
layout: post
title: "A Tracked Workflow Setup for Agentic Repositories"
description:
  "A repository-local tracked workflow setup for long-running human and agent
  work: why it exists, how it fits into discovery and execution, what failure
  modes it prevents, and how to install it into a new or existing repository."
date: 2026-04-05
updated: 2026-04-05
published: false
author: "Jan-Gerke Salomon"
author_url: "/me/"
canonical_url: "https://maintainable.software/tracked-workflow-setup-for-agentic-repositories/"
tags:
  [agentic-engineering, coding-agents, workflow, documentation, maintainability]
teaser:
  A practical, in-depth look at a tracked workflow setup for long-running human
  and agent work, including the planning lifecycle around it, the proof surfaces
  it preserves, and the failure modes it is designed to prevent.
---

Long-running engineering work needs more structure than a chat transcript, a
mental note, or a temporary task list. That is even more true once coding agents
are part of the workflow.

If the real state of a change only exists in hidden session state, in a project
board no one reads during implementation, or in a conversation that cannot be
reconstructed safely, continuity becomes fragile. The next session starts from
guesswork. Scope expands silently. Verification becomes anecdotal. And
eventually the repository stops being the place where the truth lives.

That is the problem this workflow setup is meant to solve.

The full template lives here:

- <https://github.com/maintainable-software/workflow-setup>

It is a repository-local system for tracked workflows stored under
`.workflows/`. The setup itself is intentionally compact: a few process
documents, clear repository rules, two workflow skills, and optional agent
routing and profile support. But its value is larger than the file count would
suggest, because it formalizes several distinctions that many repositories blur
together:

- discovery is not execution
- a ratified plan is not the same thing as brainstorming
- progress is not proof
- the active workflow is not permission to bundle unrelated work together
- narrative status is not the same thing as completion evidence

That is the real rationale behind the setup. It is not trying to add process for
its own sake. It is trying to keep workflow truth durable, explicit, and narrow
enough that both humans and agents can resume and execute safely.

## The rationale

The core idea is straightforward: workflow truth should live in tracked files in
the repository, not in hidden session state.

That gives you a few important properties immediately.

First, the repository becomes the source of truth for active work, not the agent
runtime. A fresh session can recover what matters by reading files that are
versioned, reviewable, and available to anyone working on the repository.

Second, workflows become explicit boundaries instead of vague intentions. A
named workflow owns one bounded change by default. That makes it easier to keep
the work narrow, easier to reason about what belongs inside it, and easier to
notice when unrelated concerns are getting braided together.

Third, progress and proof stop being the same thing. Many teams are good at
describing what they did, but much worse at preserving what actually proved the
change was done. This setup gives proof a dedicated place.

Fourth, it gives both humans and agents a repeatable resume surface. That
matters in ordinary engineering, but it matters even more in agentic engineering
where sessions reset, tasks get handed off, and a lot of damage can come from a
plausible but wrong guess about the current state of work.

Fifth, it creates a usable boundary between unstable thinking and executable
work. That boundary is easy to ignore in practice, but it matters a lot. If a
repository treats draft exploration, a ratified plan, and active execution as if
they were interchangeable, it becomes very hard to know what is settled, what is
still under discussion, and what is actually safe to implement.

## Where this setup fits in the larger workflow

One important clarification: the `workflow-setup` repository is intentionally
focused on the tracked execution-state layer. It does not try to ship a complete
brainstorming or product-discovery system.

That is a strength, not a gap.

The larger workflow I use around it has three distinct stages:

1. discovery and convergence
2. ratified implementation planning
3. workflow instantiation and execution

In practice that often looks like:

- `PLAN-DRAFT.md` or an equivalent draft surface for exploration
- `PLAN.implementation.md` or an equivalent ratified execution plan
- `.workflows/` for one concrete, resumable execution slice

The principle is simple:

> Draft to discover. Plan to ratify. Workflow to execute.

That distinction is useful because each stage has a different job.

The draft surface is allowed to be messy. It can contain unresolved questions,
alternatives, competing options, and phase reshaping.

The ratified plan is different. It should define stable scope, outputs,
dependencies, deferrals, and execution order without carrying ongoing
brainstorming inside the same sections.

The tracked workflow is different again. Its job is not to continue discovery in
the abstract. Its job is to turn one approved slice of work into resumable,
bounded execution state.

The template in `workflow-setup` focuses on that third layer on purpose. It does
not create a second planning system inside `.workflows/`, and it does not
pretend that every brainstorming session should immediately become workflow
state.

## What problems this workflow solves

The workflow is designed around a set of recurring failures that become much
more expensive once long-running sessions and coding agents are involved.

### 1. Work disappears into session state

Without tracked workflow files, the true state of a change often ends up spread
across chat history, local notes, partial commits, and memory. That works only
while the same person is continuously present and remembers the context.

As soon as the session resets, the project pays the cost.

### 2. Broad plans hide multiple unrelated changes

Many implementation plans are too wide. A single phase name quietly turns into
application behavior, persistence changes, docs updates, operational work, and
refactoring, all bundled together. That makes review harder and completion
criteria weaker.

This setup pushes toward one workflow per feature, capability, or tightly
bounded internal change by default.

### 3. Resume is inconsistent

In many repositories there is no reliable answer to a simple question: if I open
a fresh session right now, which files should I read first to recover the
current work safely?

That uncertainty wastes time for humans and encourages guesswork for agents.

### 4. Unratified planning leaks directly into execution

A common failure mode is to start implementation directly from draft thinking.
That means a workflow is created from material that is still unstable, still
contested, or still missing explicit boundaries.

This setup works best when workflow creation happens only after one concrete
slice of the plan is already ratified. That keeps `.workflows/` from becoming a
place where unresolved planning is smuggled into execution.

### 5. Verification becomes narrative instead of proof

It is common to see a report that says the change is finished without making it
easy to see what checks, evidence, or public-boundary tests actually proved that
claim. The workflow separates proof from narrative on purpose.

### 6. Structural and behavioral work get treated as if they were the same

Some changes introduce externally visible behavior. Others are internal shell,
contract, docs, or observability work. Treating both kinds of work with the same
template often creates either too much ceremony or too little clarity.

This setup requires every workflow to declare what kind of workflow it is and
what acceptance style it needs.

### 7. Repository coordination files drift away from workflow-local truth

A workflow system with an active pointer, an index, and a queue is only useful
if those coordination surfaces stay aligned with workflow-local state.

The setup makes that explicit. Root coordination files are not decorative
navigation. They are part of the resumability contract.

## What the setup does especially well

The strongest part of this workflow is not any one file. It is the way a few
small rules reinforce each other.

### It keeps execution state in the repository

That sounds obvious, but many AI-heavy workflows still rely too much on hidden
session memory. Here, the repository itself owns the truth about the active
workflow, the tracked workflow set, the queue, the plan, the current step, and
the proof surface.

That makes fresh-session resume materially safer.

### It enforces one responsibility per workflow by default

The template pushes toward one feature, one capability, or one tightly bounded
internal change per workflow.

That bias matters because "phase" is usually too broad to be a useful execution
unit. One implementation phase may legitimately require several workflows. The
setup makes that normal instead of treating one broad umbrella workflow as the
default.

### It separates coordination from detail

The three root files are deliberately short:

- `.workflows/active-workflow.md`
- `.workflows/index.md`
- `.workflows/queue.md`

They exist to route and resume. They are not supposed to become duplicate copies
of `plan.md`, `status.md`, or `validation.md`.

That separation keeps the coordination layer readable while preserving workflow
detail where it belongs.

### It distinguishes proof from commentary

`validation.md` is the proof surface. `report.md`, when it exists, is narrative
only.

That one distinction avoids a lot of process rot. Once a repository starts
treating status prose as if it were equivalent to verification evidence,
completion claims become hard to audit.

### It makes acceptance style explicit

Every workflow must declare its workflow kind and its acceptance scenario
policy.

That means the workflow has to answer questions such as:

- Is this structural or behavioral work?
- Do we need workflow-local `.feature` files?
- Are public-boundary acceptance scenarios required?
- Why is this proof style the right one for this change?

That keeps teams from defaulting mechanically to one validation style for every
kind of work.

### It keeps support surfaces optional

The setup allows files such as `tasks.md`, `notes.md`, `failure-cases.md`,
`schema-contracts.md`, `artifacts/`, and `features/`, but it does not require
them by default.

That is a very good trade-off. It gives complex workflows room to carry richer
state without forcing every small workflow to drag along empty scaffolding.

### It gives step execution objective completion gates

This part is easy to miss if you only look at the high-level file list.

The plan model is not just "a few bullet points." The workflow creation rules
expect each step to carry explicit fields such as:

- `Status`
- `Task`
- `Sequential tasks`
- `Verification focus`
- `Stop-condition`
- `Commit required`
- `Commit message`
- `Implementation notes`

That matters because it makes the execution model less hand-wavy. A step is not
done because it "feels done." It is done when its stop conditions are satisfied,
the relevant checks have been run, the validation surface has been updated, and
the workflow state reflects reality.

### It supports back-propagation when execution changes the plan

This is one of the most important operational ideas around the workflow, even if
the template itself stays focused on the execution-state layer.

Execution sometimes discovers something that changes canonical truth. When that
happens, the correct move is not to let the workflow silently drift away from
the plan. The right move is to update the canonical truth first, then continue.

In practice that means:

- update workflow files
- update docs if the workflow changes them
- update the ratified plan if the meaning of the plan changed
- update any still-open draft planning surface only when unresolved forward
  planning remains

That keeps the repository honest about what was learned during execution.

## How the workflow solves those problems

The workflow uses a small tracked model under `.workflows/`.

At the root, there are three coordination files:

- `.workflows/active-workflow.md`
- `.workflows/index.md`
- `.workflows/queue.md`

These files do different jobs.

`active-workflow.md` names the default workflow to resume first and defines the
fresh-session read order. `index.md` is the brief registry of tracked workflows.
`queue.md` is the short coordination view that shows what is in progress, ready,
blocked, parked, or completed.

Those files stay short. They point to workflow-local state rather than trying to
replace it.

Each named workflow then gets its own folder:

```text
.workflows/
  active-workflow.md
  index.md
  queue.md
  session-start/
    instructions.md
    scope.md
    plan.md
    status.md
    validation.md
```

That five-file core is the minimum resumable workflow surface.

Each file has one job:

- `instructions.md` explains how to operate the workflow safely
- `scope.md` defines identity, kind, acceptance policy, scope, and out-of-scope
- `plan.md` holds the ordered implementation steps
- `status.md` records current state and step progress
- `validation.md` records what must be proven and what checks actually proved it

That split is stronger than a single all-purpose workflow document because it
preserves distinct responsibilities:

- `instructions.md` is operational
- `scope.md` is definitional
- `plan.md` is executable sequencing
- `status.md` is present-state tracking
- `validation.md` is proof

The setup also allows optional support surfaces when current evidence justifies
them:

- `tasks.md`
- `notes.md`
- `report.md`
- `failure-cases.md`
- `schema-contracts.md`
- `artifacts/`
- `features/`

The important rule is that optional files are not created automatically just
because they exist in the abstract model. They should only appear when the
workflow actually needs them.

That keeps the structure expressive without turning it into mandatory ceremony.

The workflow model also makes a second important distinction: root coordination
surfaces are not workflow-local truth, and workflow-local truth is not a reason
to ignore root coordination. Both need to stay aligned.

## Workflow kind and acceptance policy

Every new workflow must declare two things up front in `scope.md`.

The first is its workflow kind:

- `behavioral`
- `structural`
- `mixed`

This classification matters because not every change should be validated in the
same way.

A `behavioral` workflow owns externally observable behavior. That usually means
public-boundary tests and, when appropriate, workflow-local `.feature` files
under `features/`.

A `structural` workflow changes internal boundaries, contracts, persistence,
docs, shells, or observability without adding a new user-visible behavior. That
usually does not need Gherkin.

A `mixed` workflow is a narrow combination of both.

The second declaration is the acceptance scenario policy. This states whether
behavioral acceptance scenarios are required, whether workflow-local `.feature`
files are needed, and why that proof style fits the workflow.

That requirement forces teams to be explicit about what kind of evidence
completion should depend on instead of leaving that decision vague until the
end.

## Selective Gherkin instead of universal Gherkin

One subtle but very good part of the setup is that it does not force `.feature`
files everywhere.

Behavioral workflows may justify workflow-local `.feature` files under
`features/` because they own externally observable behavior and can benefit from
explicit acceptance scenarios.

Structural workflows usually should not create `.feature` files.

That avoids a common process mistake: turning BDD artifacts into compulsory
ceremony even when the change is internal and the better proof style is a
contract test, boundary check, or repository verification step.

## Why `validation.md` matters so much

One of the strongest parts of the setup is the distinction between proof and
narrative.

`validation.md` is the proof surface. It is where the workflow states the done
conditions, the commitments that must be proven, the verification ownership, and
the checks or evidence that actually satisfied those commitments.

`report.md`, when present, is not proof. It is a narrative surface for rollout
state, replacement notes, or remaining work.

That sounds like a small distinction, but it matters a lot in practice. If the
same document tries to be both evidence and commentary, it usually becomes weak
at both.

There is another useful detail here: `validation.md` is also where drift should
be recorded plainly. If a workflow intentionally narrows, defers, or changes one
planned commitment, the workflow should say so instead of quietly pretending the
original promise was fully satisfied.

That keeps completion honest.

## The pitfalls this setup is designed to avoid

This workflow is opinionated in exactly the places where many teams drift into
confusion.

### It avoids turning `.workflows/` into a second brainstorming system

The tracked workflow layer is for execution-state, not for all planning thought.

That matters because once a workflow becomes the place where unresolved options,
phase reshaping, and active discovery all live together, resumability gets
weaker instead of stronger.

### It avoids creating workflows from unstable scope

A workflow should be created only when one new workflow name and one bounded
change are clear enough to write safely.

Otherwise the repository is giving execution machinery to work that is still at
the draft stage.

### It avoids mandatory artifact inflation

Not every workflow needs `tasks.md`, `notes.md`, `features/`, `artifacts/`, or
`failure-cases.md`.

Requiring all of them by default would make the workflow heavier while adding
very little signal for smaller changes.

### It avoids broad umbrella workflows

The active workflow is a default resume target. It is not a license to stuff
every currently important concern into one large tracked folder.

That is a subtle but important rule. Without it, the active pointer becomes the
justification for scope creep.

### It avoids confusing status with truth

Short root coordination files, workflow-local current state, and dedicated proof
surfaces all exist to prevent the same document from trying to do too many jobs
at once.

That is a conceptual simplicity win as much as a process win.

### It avoids pretending every change has the same proof shape

The workflow kind and acceptance scenario policy exist specifically so a
repository does not have to fake one universal approach to validation.

Behavioral work, structural work, and mixed work are related, but they are not
the same thing.

### It avoids overkill

This is worth stating directly.

The right version of this workflow is not:

- a second `.workflows/`-like system for early planning
- mandatory workflow artifacts for every small task
- a long approval ritual before any plan update
- a fake starter workflow created just because the template was installed

The good version is lighter than that. It is strict where resumability, proof,
and scope boundaries matter, and quiet where they do not.

## How to use the workflow in day-to-day work

The intended usage is simple once the lifecycle is clear.

### 1. Explore in a draft surface

Use `PLAN-DRAFT.md` or an equivalent draft surface for ambiguity, competing
options, discovery notes, and reshaping.

This is where messy thinking belongs.

### 2. Ratify into an implementation plan

Promote material into `PLAN.implementation.md` or an equivalent ratified plan
only when one slice is stable enough to execute.

That usually means the slice has:

- clear scope
- clear outputs
- clear dependencies
- explicit deferrals
- no unresolved competing options inside the same section

### 3. Create a workflow only when you have an explicit new name

The setup is deliberately strict here. Do not create a new workflow from a vague
idea like "phase 2" unless that broad scope is intentional and you are choosing
to preserve a legacy broad workflow.

Prefer names that expose the owned feature or bounded internal change, such as:

- `session-start`
- `shared-contracts`
- `runtime-shells`

### 4. Let the workflow own one bounded change by default

A workflow should usually represent one feature, one capability, or one tightly
bounded internal change. If a plan starts turning into multiple distinct lines
of work, that is often evidence that you need multiple workflows instead of a
bigger one.

### 5. Resume from repository state, not memory

In a fresh session, start with:

1. `.workflows/active-workflow.md`
2. `.workflows/index.md`
3. `.workflows/queue.md`
4. the active workflow's `instructions.md`
5. the active workflow's `status.md`
6. the active workflow's `scope.md`
7. the active workflow's `plan.md`

Read `validation.md` and any present support files when the current state or
proof depends on them.

### 6. Keep workflow state current while you work

The setup is designed for live tracked state, not end-of-task paperwork.

If the current step changes, update `status.md`.

If a plan changes, update `plan.md`.

If a proof obligation changes or a check is executed, update `validation.md`.

If the active workflow changes, update the root coordination files.

### 7. Use the smallest proof surface that honestly proves the work

Behavioral work may need public-boundary tests and workflow-local `.feature`
files.

Structural work often needs contract tests, boundary checks, or repository
verification rather than acceptance scenarios.

The workflow should not invent ceremony it does not need. It should preserve
enough structure that completion can be trusted and resumed safely.

### 8. Back-propagate discoveries into canonical truth

If workflow execution reveals something that changes the meaning of the ratified
plan, update the plan first rather than letting the workflow become a quiet fork
of the repository's intended truth.

This is one of the key disciplines that keeps the whole system coherent.

## The technical shape of the template

The template is intentionally layered.

It has five parts:

1. shared process docs under `docs/process/`
2. always-on repository rules in `AGENTS.md`
3. Codex skills under `.agents/skills/`
4. optional workflow-aware routing in `agents/openai.yaml`
5. Codex profile registration under `.codex/`

That layering is useful because not every repository needs every agent-specific
surface, but every repository using the model does need the workflow rules and
process definitions.

Here is what each part is for.

### `docs/process/`

This is the stable model of the workflow system. It defines what a tracked
workflow is, what files it uses, how new workflows are created, and what example
shapes look like.

These docs are the conceptual anchor for the setup. They define the stable model
so that skills and agent configuration are not inventing their own private
interpretation of the workflow.

### `AGENTS.md`

This is the always-on rule surface. It tells the agent to preserve tracked
`.workflows/` state, keep root coordination files aligned, prefer narrow
workflow scope, declare workflow kind and acceptance policy, and treat
`validation.md` as the proof surface.

This layer matters because it makes the workflow behavior durable across
sessions instead of relying on one good prompt at the start of one conversation.

### `.agents/skills/create-workflow/` and `resume-workflow/`

These skills provide the operational behavior for creating and resuming tracked
workflows in Codex. They turn the documented model into concrete workflow
operations.

That is an important step. Documentation alone is useful, but skills make the
expected workflow executable.

### `agents/openai.yaml`

This file is optional. It provides a generic workflow-aware routing surface for
environments that want to route workflow-related tasks toward the relevant docs
and skills.

If a repository already has its own agent routing config, this file should be
merged, not copied over blindly.

### `.codex/config.toml` and `.codex/profiles/repo-analyst.md`

This is the Codex-specific profile setup. The included `repo-analyst` profile is
useful for broad repository inspection and contradiction-finding without
depending on a separate docs system being present.

That gives the template a stronger analytical mode when the repository needs
inspection before workflow execution resumes.

## Technical details that are easy to miss

Some of the strongest parts of the setup are easy to overlook if you only read
the top-level file list.

### Root coordination files are part of the contract

`active-workflow.md`, `index.md`, and `queue.md` are not optional niceties. They
are part of the resumability model.

If workflow-local state changes, those files need to stay aligned.

### The plan model expects objective step blocks

The workflow creation guide does not treat `plan.md` as a loose note file. It
expects explicit step blocks with status, work description, sequencing,
verification focus, stop conditions, commit rules, and implementation notes.

That is how the workflow keeps execution from collapsing into "do some work and
hope the state is obvious later."

### `validation.md` is where commitments are proven

The proof surface is not only for listing tests. It is the place where the
workflow records done conditions, who owns verification, which checks were run,
what evidence exists, and where any drift from the original commitments was
accepted.

### `artifacts/` exists for path-based evidence

Sometimes pasting generated outputs or logs into `validation.md` is the wrong
shape. The `artifacts/` directory exists for those cases, with `validation.md`
pointing at the relevant paths.

### The template intentionally ships no concrete workflow instances

This is a good omission.

The template should not create fake `.workflows/` content just to demonstrate
the structure. The first workflow in a repository should be created in response
to real work.

## How to add the workflow to a new repository

If you are starting a new repository, installation is straightforward.

Copy these pieces into the new repository:

- `AGENTS.md`
- `docs/process/`
- `.agents/skills/create-workflow/`
- `.agents/skills/resume-workflow/`
- `.codex/config.toml`
- `.codex/profiles/repo-analyst.md`
- `agents/openai.yaml` if you want the optional routing surface

The resulting layout should look roughly like this:

```text
<repo>/
  AGENTS.md
  docs/process/
  .agents/skills/create-workflow/
  .agents/skills/resume-workflow/
  .codex/config.toml
  .codex/profiles/repo-analyst.md
  agents/openai.yaml
```

After that, the first real `.workflows/` files should be created by using the
workflow rules and skills in the destination repository. The template itself
does not ship a fake workflow instance just to demonstrate the shape.

That is intentional. The first workflow should describe real work in the target
repository.

## How to add the workflow to an existing repository

Adding the setup to an existing repository needs a little more care because you
may already have instructions, docs, or agent configuration in place.

The practical rule is: merge, do not overwrite.

### 1. Merge the workflow rules into your existing `AGENTS.md`

If the repository already has an `AGENTS.md`, add the workflow rules rather than
replacing the whole file. The workflow rules are meant to extend the
repository's current instructions, not erase them.

### 2. Copy in `docs/process/`

If the repository already has a `docs/` tree, add the workflow docs in the
appropriate process area rather than scattering them across unrelated folders.

### 3. Add the skills and Codex profile files

Copy:

- `.agents/skills/create-workflow/`
- `.agents/skills/resume-workflow/`
- `.codex/config.toml`
- `.codex/profiles/repo-analyst.md`

If the repository already has a Codex config or existing profiles, merge the new
entries carefully instead of overwriting the current setup.

### 4. Merge `agents/openai.yaml` only if you use it

This file is explicitly optional. If your repository already has agent routing
config, merge the workflow-related routing into that file. If you do not use
that kind of routing surface, skip it.

### 5. Create the first workflow only when you have a real bounded change

Do not create `.workflows/` content just to finish installation. The point is to
create tracked workflow state when there is actual work to track.

If the repository already has its own planning surfaces, keep them. This
template does not require you to rename your draft or ratified plan files. What
matters is the lifecycle distinction, not one specific filename convention.

## A practical copy strategy

If you have the template checked out locally, a copy pass can look like this:

```bash
cp ../workflow-setup/AGENTS.md ./AGENTS.workflow-snippet.md
cp -r ../workflow-setup/docs/process ./docs/
cp -r ../workflow-setup/.agents/skills/create-workflow ./.agents/skills/
cp -r ../workflow-setup/.agents/skills/resume-workflow ./.agents/skills/
cp ../workflow-setup/.codex/config.toml ./.codex/config.toml
cp ../workflow-setup/.codex/profiles/repo-analyst.md ./.codex/profiles/
cp ../workflow-setup/agents/openai.yaml ./agents/openai.workflow.yaml
```

I would not copy `AGENTS.md` and `agents/openai.yaml` straight over the top of
existing files unless the destination repository is empty or intentionally using
the template as its primary setup. For established repositories, stage the
incoming files under temporary names, merge the relevant parts, then remove the
staging copies.

## Why this setup works well for agentic engineering

The value of the setup is not that it introduces one more planning artifact. It
is that it keeps workflow state durable, local, explicit, and narrow enough to
be resumed safely by a new session or a different agent.

That has a few concrete benefits for agentic work:

- fresh sessions can resume from repository truth instead of chat history
- discovery, ratification, and execution do not get silently collapsed together
- workflow boundaries are easier to keep narrow
- verification has a dedicated proof surface
- structural and behavioral work can use different evidence styles
- optional support files stay optional instead of turning into mandatory
  bureaucracy
- execution discoveries can be propagated back into canonical truth instead of
  creating quiet drift

The result is a workflow that is more operational than a project board and more
durable than a conversation, while still staying much lighter than a full
process framework.

That is the balance I care about here: enough structure to preserve continuity
and proof, but not so much structure that the workflow becomes the main work.
