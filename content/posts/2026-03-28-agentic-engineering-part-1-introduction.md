---
layout: post
title: "What AI in Software Engineering Is Really Good At — and Where Its Limits Are"
header_kicker: "Howto successful Agentic Engineering - Part 1"
description: "Introduction to agentic engineering: where AI already helps in software engineering, where coding agents fail, and the three skills developers need."
date: 2026-03-28
updated: 2026-03-29
published: true
author: "Jan-Gerke Salomon"
author_url: "/me/"
canonical_url: "https://maintainable.software/agentic-engineering-part-1-introduction/"
image: "/assets/images/posts/agentic-engineering-part-1-introduction.png"
tags: [agentic-engineering, coding-agents, software-engineering, ai]
teaser: AI is already strong at local implementation, structured trade-off analysis, and targeted codebase exploration, but it becomes unreliable when hidden context and broader system consequences matter. This introduction explains that tension and frames the three skills developers need to use coding agents effectively.
---

Since roughly the middle 2025, agentic engineering has become feasible to the point
that code can be written entire by coding agents like Claude or Codex. This introduces
a whole new way of writing applications in a very short amount of time and outside
the primary technical domain developers have lived in for the most of their
professional career. But having code written by the agent doesn't come with its own unique challenges.

<aside>

This is the first article in a four-part series. In this series we will elaborate
how agentic engineering can be tackled to produce maintainable, inspectable and reliant cobases.

[Part 1](/agentic-engineering-part-1-introduction/) introduces the three skills and explains why they are different

[Part 2](/agentic-engineering-part-2-agentic-codebase-principles/) focuses on codebase design: the architectural and verification properties that make a repository easier for agents to explore and modify safely

Part 3, on session and context management, will be published later and will cover how to keep only relevant information in play and carry work cleanly across sessions

Part 4, on agent configuration, will be published later and will cover how standing instructions, tools, permissions, and reusable artifacts shape agent behavior before the work begins

</aside>

## The productive tension

Anyone working with AI in software engineering today quickly notices two things at once: on the one hand, the tool is remarkably capable. On the other hand, it often becomes unreliable precisely where tacit knowledge, system-level relationships, and undocumented assumptions play a major role. The productive way to work with AI lies exactly in that tension.

## Where AI is already strong

AI can already be very good at helping write code. Especially for clearly scoped tasks, local changes, or continuing existing patterns, it is often fast and useful. It is also strong at structuring trade-offs between alternatives. When several technical options are on the table, it can work out pros and cons, make options comparable, and provide an initial basis for decisions. That is a real productivity gain.

AI can also be helpful in analyzing codebases — but not unconditionally. It can find relevant parts, trace relationships across files, and make existing implementation chains visible. How well that works depends heavily on whether the necessary context is accessible, well structured, and made explicit. If important information exists only implicitly, only in people’s heads, or scattered across many places, the analysis becomes less reliable as well.

## Where reliability breaks down

This is exactly where the limits lie. AI is much weaker when it comes to reliably assessing the consequences of changes in a broader context. It can often suggest local changes well. Things become more difficult when second- and third-order effects matter: architectural side effects, domain-specific constraints, historical baggage, or organizational consequences. Likewise, AI does not have reliable access to the full context of a system. What may be obvious to people on a team — product logic, implicit assumptions, long-standing decisions, or known problem areas — is not automatically available to AI.

The most critical point is not just that context can be missing. The real problem is that AI does not reliably recognize missing context as a problem. It may continue working with a high degree of linguistic confidence even when the foundation is incomplete. That is exactly why linguistic plausibility must not be mistaken for factual certainty. AI can sound very convincing while still working past a crucial prerequisite.

## Why review remains necessary

From this follows one central practical consequence: AI-generated work must be reviewed. Not necessarily every line and not every detail, but always the parts that are relevant from a domain, technical, or architectural perspective. Anyone who wants to use AI well should not think of it as an autonomous system that will somehow develop a complete overview on its own. It is more useful to see it as a very strong accelerator — especially for implementation, structuring, preparation, and local analysis, but not as a substitute for responsibility, judgment, or verification.

## Reliability depends on the surrounding workflow

The productive use of AI in software engineering therefore does not consist of simply giving it a task and hoping for the best possible result. What matters is using its strengths deliberately while actively compensating for its weaknesses. That means making context explicit, formulating requirements clearly, verifying results, requiring relevant artifacts, and building in control points. Good results do not emerge because AI can do everything on its own, but because it is used within a well-designed working framework.

That is where the real leverage begins. The decisive question is not only what AI can do, but under which conditions it works reliably. And that already leads into the next topic: not just the model itself, but the way agents are configured, instructed, and embedded into clean workflows.

## The three skills developers need

If teams want to work productively with coding agents, they need to learn three distinct skills. These skills reinforce each other, but they should not be mixed together because they solve different problems.

### Agent configuration

Agent configuration is about durable setup. It defines the standing instructions, tools, permissions, profiles, skills, and quality gates that shape the agent before a concrete session even starts. This is where topics such as `AGENTS.md`, reusable playbooks, scoped tool access, and persistent review requirements belong.

### Session and context management

Session and context management is about what happens during a concrete run. It covers how work is scoped, which artifacts are loaded into context, how context is curated over time, and how longer tasks are broken into resumable steps. This is where progressive disclosure, context compression, clean handoffs, and checkpointing belong.

### Codebase design

Codebase design is about the structure of the software system itself. It determines whether an agent can explore the repository safely, build a correct local model, make a narrow change, and validate that change without disturbing unrelated parts of the system. This is where locality, blast radius, boundaries, navigability, and verification scope matter most.
