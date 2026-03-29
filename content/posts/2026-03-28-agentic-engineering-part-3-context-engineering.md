---
layout: post
title: "The importance of Context Engineering and Session management"
header_kicker: "Howto successful Agentic Engineering - Part 3"
date: 2026-03-28
published: false
series_slug: "how-to-succeed-with-agentic-engineering"
series_title: "How to Succeed with Agentic Engineering"
series_order: 3
image: "/assets/images/posts/agentic-engineering-part-3-context-engineering.png"
tags: []
---

This article is about what happens during a concrete run: how a task is scoped, what enters the working set, how context is kept relevant, and how work stays coherent across multiple sessions.

## Topics that belong in this article

### Progressive disclosure of context

This is one of the best missing sections for an agentic version of the article. A dedicated section could explain that maintainable agent-friendly systems should reveal information step by step rather than forcing the agent to load everything at once. Anthropic explicitly frames context as finite and highlights context curation strategies; OpenAI’s harness piece also points to repo maps and structured discovery rather than giant instructions.

This section would strengthen:

- Navigability
- Locality
- Avoiding unnecessary complexity
- DEA

### Incremental changes and clean handoffs

This would be a very good addition because it connects architecture to long-running agent workflows. Anthropic’s long-running harness article argues that agents should make incremental progress and leave the environment in a clean state at the end of a session. That gives you a concrete principle: shape the workflow so work can be done in small, resumable, reviewable increments with clean git state, summaries, and recoverable checkpoints.

This section would strengthen:

- Blast radius
- Rebuild/test scope
- DEA

### Task scoping before context expansion

This article should also include the principle that the task should be narrowed before large amounts of context are loaded. The important move is to define the concrete unit of work first and only then pull in the files, docs, artifacts, and history needed to execute that unit safely.

### Context curation and compression

Another section here should cover how to keep only relevant artifacts in the working set. That includes summarizing what has already been learned, dropping stale details, and preserving only the information that is necessary for the next decision or handoff.

### Checkpoints, summaries, and resumability

Long-running agent workflows need clean checkpoints. If a session ends, another session should be able to pick up the task from a compact, trustworthy summary instead of replaying the entire exploration history. This is where handoff notes, progress summaries, and explicit next steps belong.

## Sources to use when writing this article

- [OpenAI — Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
- [Anthropic — Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Anthropic — Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [arXiv — Building Effective AI Coding Agents for the Terminal](https://arxiv.org/html/2603.05344v2)
