---
layout: post
title:
  "What AI in Software Engineering Is Really Good At — and Where Its Limits Are"
header_kicker: "Howto successful Agentic Engineering - Part 1"
description:
  "Introduction to agentic engineering: where AI already helps in software
  engineering, where coding agents fail, and the three skills developers need."
date: 2026-03-28
updated: 2026-03-29
published: true
series_slug: "how-to-succeed-with-agentic-engineering"
series_title: "How to Succeed with Agentic Engineering"
series_order: 1
author: "Jan-Gerke Salomon"
author_url: "/me/"
canonical_url: "https://maintainable.software/agentic-engineering-part-1-introduction/"
image: "/assets/images/posts/agentic-engineering-part-1-introduction.png"
tags: [agentic-engineering, coding-agents, software-engineering, ai]
teaser:
  AI is already strong at local implementation, structured trade-off analysis,
  and targeted codebase exploration, but it becomes unreliable when hidden
  context and broader system consequences matter. This introduction explains
  that tension and frames the three skills developers need to use coding agents
  effectively.
---

Since mid-2025, agentic engineering has become practical enough that coding
agents like Claude or Codex can write substantial parts of an application. That
changes how software gets built: work can move very quickly, often outside the
part of the job developers have spent most of their careers on. But
agent-written code does not remove the usual engineering problems; it shifts
where they show up. [[5]](#ref-5) [[8]](#ref-8) [[10]](#ref-10)

Anyone working with AI in software engineering today quickly notices two things
at once: on the one hand, the tool is remarkably capable. On the other hand, it
often becomes unreliable precisely where tacit knowledge, system-level
relationships, and undocumented assumptions play a major role. The productive
way to work with AI lies exactly in that tension. [[1]](#ref-1) [[2]](#ref-2)
[[4]](#ref-4) [[6]](#ref-6)

This is the first article in a four-part series. In this series we will
elaborate how agentic engineering can be tackled to produce maintainable,
inspectable and reliant cobases.

## Where AI is already strong

AI can already be very good at local coding work. For clearly scoped tasks,
local changes, or continuing an existing pattern, it is often fast and useful.
For example, if you need to add a new field to an existing data flow or repeat a
known validation pattern in a second place, it can usually get you to a workable
result quickly. It is also strong at structuring trade-offs between
alternatives: when several technical options are on the table, it can compare
them, surface pros and cons, and give you a starting point for a decision. That
is where the practical gain is. [[3]](#ref-3) [[7]](#ref-7) [[10]](#ref-10)

AI can also be helpful in analyzing codebases — but not unconditionally. It can
find relevant parts, trace relationships across files, and make existing
implementation chains visible. How well that works depends heavily on whether
the necessary context is accessible, well structured, and made explicit. If
important information exists only implicitly, only in people’s heads, or
scattered across many places, the analysis becomes less reliable as well.
[[4]](#ref-4) [[5]](#ref-5) [[6]](#ref-6)

## Where reliability breaks down

This is exactly where the limits lie. AI is much weaker when it comes to
reliably assessing the consequences of changes in a broader context. It can
often suggest local changes well. Things become more difficult when second- and
third-order effects matter: architectural side effects, domain-specific
constraints, historical baggage, or organizational consequences. Likewise, AI
does not have reliable access to the full context of a system. What may be
obvious to people on a team — product logic, implicit assumptions, long-standing
decisions, or known problem areas — is not automatically available to AI.
[[1]](#ref-1) [[2]](#ref-2) [[4]](#ref-4) [[6]](#ref-6)

The larger the scope of the change, the more dangerous this becomes. A small
file change has a very small blast radius, so its consequences can often be
predicted with some precision. A product direction decision is different. The
severity grows faster than linearly as scope increases, because each additional
layer of context adds more unknowns and more possible failure modes. At that
scope, AI is effectively incapable of predicting the real-world consequences of
the decision, because the outcome depends on people, process, timing, market
context, and other factors it does not actually have access to. The model can
describe plausible effects, but it cannot know which of them will happen.
[[1]](#ref-1) [[3]](#ref-3) [[9]](#ref-9)

The most critical point is not just that context can be missing. The real
problem is that AI does not reliably recognize missing context as a problem. It
may continue working with a high degree of linguistic confidence even when the
foundation is incomplete. That is exactly why linguistic plausibility must not
be mistaken for factual certainty. AI can sound very convincing while still
working past a crucial prerequisite. [[4]](#ref-4) [[6]](#ref-6)

From this follows one central practical consequence: AI-generated work must be
reviewed. Not necessarily every line and not every detail, but always the parts
that are relevant from a domain, technical, or architectural perspective. Anyone
who wants to use AI well should not think of it as an autonomous system that
will somehow develop a complete overview on its own. It is more useful to see it
as a very strong accelerator — especially for implementation, structuring,
preparation, and local analysis, but not as a substitute for responsibility,
judgment, or verification. [[3]](#ref-3) [[9]](#ref-9) [[11]](#ref-11)

## Reliability depends on the surrounding workflow

The productive use of AI in software engineering therefore does not consist of
simply giving it a task and hoping for the best possible result. What matters is
using its strengths deliberately while actively compensating for its weaknesses.
That means making context explicit, formulating requirements clearly, verifying
results, requiring relevant artifacts, and building in control points. Good
results do not emerge because AI can do everything on its own, but because it is
used within a well-designed working framework. [[4]](#ref-4) [[5]](#ref-5)
[[7]](#ref-7) [[8]](#ref-8)

That is where the real leverage begins. The decisive question is not only what
AI can do, but under which conditions it works reliably. And that already leads
into the next topic: not just the model itself, but the way agents are
configured, instructed, and embedded into clean workflows. [[4]](#ref-4)
[[5]](#ref-5) [[7]](#ref-7)

If teams want to work productively with coding agents, they need to learn three
distinct skills. These skills reinforce each other, but they should not be mixed
together because they solve different problems.

### Agent configuration

Agent configuration is about durable setup. It defines the standing
instructions, tools, permissions, profiles, skills, and quality gates that shape
the agent before a concrete session even starts. This is where topics such as
`AGENTS.md`, reusable playbooks, scoped tool access, and persistent review
requirements belong. [[5]](#ref-5) [[7]](#ref-7) [[11]](#ref-11)

### Session and context management

Session and context management is about what happens during a concrete run. It
covers how work is scoped, which artifacts are loaded into context, how context
is curated over time, and how longer tasks are broken into resumable steps. This
is where progressive disclosure, context compression, clean handoffs, and
checkpointing belong. [[4]](#ref-4) [[6]](#ref-6) [[8]](#ref-8)

### Codebase design

Codebase design is about the structure of the software system itself. It
determines whether an agent can explore the repository safely, build a correct
local model, make a narrow change, and validate that change without disturbing
unrelated parts of the system. This is where locality, blast radius, boundaries,
navigability, and verification scope matter most. [[2]](#ref-2) [[5]](#ref-5)
[[6]](#ref-6)

## References

1. <a id="ref-1"></a>
   [J. Becker, N. Rush, E. Barnes, and D. Rein, “Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity,” 2025.](https://arxiv.org/abs/2507.09089)

2. <a id="ref-2"></a>
   [Carlos E. Jimenez et al., “SWE-bench: Can Language Models Resolve Real-World GitHub Issues?,” 2023.](https://arxiv.org/abs/2310.06770)

3. <a id="ref-3"></a>
   [Martin Fowler, “Humans and Agents in Software Engineering Loops,” 2026.](https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html)

4. <a id="ref-4"></a>
   [Martin Fowler and Birgitta Böckeler, “Context Engineering for Coding Agents,” 2026.](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html)

5. <a id="ref-5"></a>
   [OpenAI, “Harness engineering: leveraging Codex in an agent-first world.”](https://openai.com/index/harness-engineering/)

6. <a id="ref-6"></a>
   [Anthropic, “Effective context engineering for AI agents.”](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

7. <a id="ref-7"></a>
   [Anthropic, “Building Effective AI Agents,” 2024.](https://www.anthropic.com/research/building-effective-agents)

8. <a id="ref-8"></a>
   [OpenAI Developers, “Run long-horizon tasks with Codex,” 2026.](https://developers.openai.com/blog/run-long-horizon-tasks-with-codex/)

9. <a id="ref-9"></a>
   [Anthropic, “Our framework for developing safe and trustworthy agents,” 2025.](https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents)

10. <a id="ref-10"></a>
    [Google Research, “AI in software engineering at Google: Progress and the path ahead,” 2024.](https://research.google/blog/ai-in-software-engineering-at-google-progress-and-the-path-ahead/)

11. <a id="ref-11"></a>
    [OpenAI Developers, “Agent approvals & security – Codex,” 2026.](https://developers.openai.com/codex/agent-approvals-security/)
