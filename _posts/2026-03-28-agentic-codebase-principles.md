---
layout: post
title: "What are the characteristics of a mainainable (agentic) codebase?"
date: 2026-03-28
tags: []
---

> *"Everything in software architecture is a trade-off. [...] If an architect thinks they have discovered something that isn’t a trade-off, more likely they just haven’t yet identified the trade-off."*
>
> [DevIQ - Laws of Software Architecture](https://deviq.com/laws/laws-software-architecture/)

With AI writing ungodly large amounts of code with record-shattering speed,
even some of the largest companies are now facing issues that are hard to tame:
Bugs in critical parts of the application that appear out of nowhere on a scale
that was previously unthinkable.

As of now, coding agents simply can't understand the entire context of a codebase.
This introduces the issue that - when working on already grown source code -
the agent must be given the capability to work on tasks in isolation without
affecting other parts of the codebase accidentally and especially without
introducing regressions.

This is not impossible, but it requires theoretical knowledge foremostely,
but also discipline and knowing how to help the agents to verify their own work.
In this post I want to take a look at certain perspectives and codebase
characteristics that I like to use and that have helped to guard the software
against unnoticed regressions.

## Characteristics that matter

Before we talk about how to get a hold on the ever-growing codebase, let's focus
our attention on what actually matters. The approaches and ideas I use are not
the only way to achieve a maintainable codebase. So let's look at what actually
matters, detatched from how it can be achieved.

As I already hinted at with the quote at the beginning of this post, there's
simply nothing without trade-offs. And they're not just of technical nature,
it could be for example thye preferences of the team members. Another often
overlook trade-off is that when you focus on one thing you won't have the time
and/or budget to focus on other things.

So the goal is to be able to compare different approaches and focus on how they
improve the quality of these characteristics.

### Locality

Locality describes how many places need to be touched to complete a concrete task.
In a healthy codebase, most changes stay narrow and do not require edits across unrelated modules.

Imagine you were given a task: Add `priority` to support tickets.
If the codebase looked something like this, the location which had to be changed is quite obvious:

```text
[billing]
[identity]
[search]
[support-tickets]
↑   ├── model
    ├── use-cases
    ├── persistence
    └── api
```

If it instead looked like this, it's more difficult to collect all areas that need to be touched:

```
┬─> [shared]
├───> [support-tickets model]
├─> [billing]
├───> [support-tickets api]
├───> [support-tickets use-cases]
├─> [search]
├───> [support-tickets api]
├───> [support-tickets use-cases]
├───> [support-tickets persistence]
└─> [ui foundation]
```

### Blast radius

Blast radius is the size of the unintended side effects of a change.
A small blast radius means a change remains local;
a large one makes refactorings and fast iteration much riskier than they should be.

```text
Example: rename "prospect" -> "lead"

Small blast radius:
- sales-domain/status
- sales-ui/filter
- sales-tests

Large blast radius:
- sales-domain/status
- billing-rules
- CRM-export
- email-automation
- analytics-dashboard
- data-warehouse-transform
```

### Boundary integrity

Boundary integrity is about how clear the borders are between modules, components, or services.
Good boundaries rely on explicit interfaces and clearly separated responsibilities, while heavy coupling usually signals structural weakness.

```text
Example: create payment for order

Strong boundary:
- checkout -> PaymentService.authorize(orderId, amount)
- PaymentService -> PaymentGateway
- PaymentService emits PaymentAuthorized

Weak boundary:
- checkout reads payment tables directly
- payment code updates order status directly
- payment code sends confirmation email directly
- payment code writes analytics event directly
```

### Navigability

Navigability is the speed with which a new person can orient themselves in the codebase.
This is especially important for AI agents, because they can only inspect a small part of the system at a time.

```text
Example: where does discount logic live?

Easy to navigate:
- /orders/create
- order-service
- pricing-policy
- discount-rules

Hard to navigate:
- grep "discount"
- discount-helper
- pricing-utils
- campaign-service
- order-decorator
- checkout-hooks
- legacy-promotions
```

### Rebuild/test scope

Rebuild and test scope determine how narrowly a change can be verified.
The better the structure, the more often only the affected parts need to be built or tested,
which keeps feedback fast and iteration practical.

```text
Example: change tax rule for B2B invoices

Tight verification scope:
- run pricing tests
- run invoice calculation tests
- run tax-rule contract tests

Broad verification scope:
- rebuild entire application
- rerun full end-to-end suite
- rerun reporting regression tests
- rerun CRM sync tests
- wait for staging smoke test
```

## How to ensure these characteristics

### Vertical slices architecture

Vertical slices architecture organizes code around concrete user-facing capabilities instead of technical layers alone. The goal is that a feature can be understood, changed, and verified mostly within its own slice, without having to coordinate across half the system.

- **Locality**: Related changes stay closer together instead of being spread across multiple technical layers.
- **Blast radius**: Feature work is more tightly contained, so changes are less likely to affect distant parts of the system.
- **Navigability**: The structure follows domain intent, which makes it easier to find where a capability lives.
- **Rebuild/test scope**: Verification can often stay closer to the affected slice instead of expanding to the whole system.

The trade-offs are that shared technical concerns can become harder to standardize, and teams may duplicate patterns across slices if they are not disciplined. Common alternatives are layered architecture and a modular monolith organized primarily around technical modules.

### Coupling & Cohesion

Coupling and cohesion describe whether code that belongs together actually lives together, and whether unrelated things are kept apart. High cohesion means a module has a clear purpose; low coupling means that purpose does not depend on hidden knowledge spread across the rest of the codebase.

- **Boundary integrity**: Responsibilities and interfaces become clearer when modules have a sharper purpose.
- **Locality**: Changes are more likely to stay within the module that owns the behavior.
- **Blast radius**: Lower coupling reduces the chance that one change will spill into unrelated areas.
- **Navigability**: The codebase becomes easier to read because the structure is more legible to both humans and agents.

The trade-offs are that strong boundaries can increase coordination overhead at interfaces, and aggressively pursuing cohesion may lead to more modules than the team can comfortably maintain. Common alternatives are shared service layers and central orchestration modules with broader responsibilities.

### Avoiding unnecessary complexity

Avoiding unnecessary complexity means resisting abstractions, indirections, and generalizations that do not solve a current problem. Complexity is not only a readability issue; it expands the amount of context required to make safe changes.

- **Navigability**: Simpler structures are easier to follow and require less context switching.
- **Locality**: Fewer conceptual layers mean a simple change usually touches fewer places.
- **Blast radius**: Unnecessary indirection is removed, so the side effects of a change are easier to predict.
- **Rebuild/test scope**: Simpler structures are usually easier to isolate and verify in narrow scope.

The trade-offs are that avoiding complexity too aggressively can delay abstractions that are genuinely needed, and some duplication may remain longer than ideal. Common alternatives are to generalize earlier around shared patterns or to introduce reusable infrastructure sooner to standardize behavior.

### Docs-driven Agentic Engineering (DEA)

Docs-driven Agentic Engineering (DEA) means making semantics, boundaries, workflows, and decision-relevant context explicit in durable documentation before they are scattered across code, chat history, and individual assumptions. In practice, that gives both humans and agents a stable source of truth instead of forcing them to reconstruct intent from partial implementation details.

- **Boundary integrity**: Explicit contracts and documented responsibilities make module boundaries clearer and harder to erode accidentally.
- **Navigability**: Current docs provide a faster path into the system because intent, terminology, and workflow expectations are easier to locate.
- **Blast radius**: Clear documented boundaries reduce the chance that an implementation change quietly expands beyond its intended scope.
- **Rebuild/test scope**: When expected behavior is written down, verification can be scoped more deliberately to the affected contract.

The trade-offs are that documentation adds maintenance overhead, and stale docs can create false confidence if they are not updated alongside the code. Common alternatives are code-first workflows with minimal docs and architecture decision records focused only on major decisions.

### BDD

BDD, in the broad sense, means describing behavior from the perspective of observable outcomes rather than internal implementation first. It pushes teams to define what the system should do in concrete scenarios before they get lost in technical details.

- **Boundary integrity**: Behavior-focused specifications make interfaces and responsibilities more explicit.
- **Rebuild/test scope**: Scenarios help verification stay tied to the affected behavior instead of drifting into broad unfocused testing.
- **Navigability**: Expected behavior becomes easier to understand because the system is described in terms of meaningful outcomes.
- **Blast radius**: Changes are easier to reason about when the intended behavior is clearly stated and can be checked against concrete scenarios.

The trade-offs are that well-written scenarios take time to maintain, and BDD can become ceremony if the scenarios no longer help people make decisions. Common alternatives are example-based testing without formal BDD vocabulary and contract testing centered on interfaces rather than scenarios.

### Avoiding premature generalization

Avoiding premature generalization means refusing to introduce shared abstractions, flexible configuration layers, or generic building blocks before there is enough evidence that the behavior is truly shared. It is usually cheaper to extract later than to maintain the wrong abstraction too early.

- **Locality**: Feature-specific logic can stay close to the feature instead of being pushed into shared layers too soon.
- **Blast radius**: Fewer premature abstractions mean fewer unrelated areas are affected when one behavior changes.
- **Navigability**: The codebase stays easier to follow because the structure reflects real needs rather than speculative reuse.
- **Boundary integrity**: Module boundaries remain more honest when they are shaped by actual responsibilities instead of imagined future overlap.

The trade-offs are that some duplication is tolerated for longer, and later extraction work may still be needed once patterns truly stabilize. Common alternatives are early platformization of shared behavior and proactive abstraction around expected future reuse.

### Avoiding premature optimization

Avoiding premature optimization means not distorting the structure of the system around performance concerns that are not yet real constraints. Once optimization becomes the driver too early, the codebase often becomes harder to understand, change, and verify long before the performance gain is actually needed.

- **Navigability**: Simpler, less contorted code is easier to inspect and understand.
- **Locality**: Straightforward implementations usually keep changes more local than optimization-heavy designs.
- **Blast radius**: Fewer special-case performance mechanisms reduce the chance that a small change has surprising side effects.
- **Rebuild/test scope**: Simpler implementations are easier to verify narrowly because there are fewer interacting optimization layers to account for.

The trade-offs are that some near-term performance opportunities are deliberately left unused, and later optimization may require targeted rework once bottlenecks are real. Common alternatives are performance-first design for known hot paths and capacity-oriented design based on measured operational constraints.
