# Dictionary

This file is the canonical dictionary for the repository terminology used by
this repository's own `docs/` tree.

It has two sections on purpose:

- `Product Concepts` is for actual things, artifacts, parts, states, workflows,
  properties, and relations that belong to the product/domain model itself.
- `Meta And Internal Terms` is for terms the repository uses to scope, design,
  implement, operate, or document those product concepts.

Use it to keep terminology understandable, consistent, and linkable from
anywhere in `docs/`.

## Maintenance Rules

- Keep entries sorted alphabetically within their section.
- Put a term in `Product Concepts` when it names an actual thing, artifact,
  part, state, workflow, property, or relation intrinsic to the product/domain
  model, whether or not end users see it directly.
- Put a term in `Meta And Internal Terms` when it names how the repository
  classifies, scopes, designs, implements, operates, or documents product
  concepts.
- Do not add vague principle language, taste labels, or one-off grouping labels
  to the dictionary unless they are stable reference terms used repeatedly
  across docs and need canonical meaning.
- If a term only labels a category of concepts rather than a concept the
  repository actually has, prefer documenting the actual concepts instead of
  adding the category label as a dictionary entry.
- Add or update entries when the repository's terminology changes, when a term
  gains a new meaning, or when a newly introduced term becomes important to
  understanding the repository.
- After substantively changing docs in an area, do a dictionary coverage pass
  over the affected docs. Scan for stable product concepts and meta/internal
  terms the updated docs now rely on, add missing entries for terms that meet
  the criteria, link important uses, and remove stale links to removed entries.
- Remove entries when the term is removed from the repository model entirely.
- Write entries for readers with little context. An entry should explain what
  the term is, why it exists in this model, and how it relates to surrounding
  terms.
- If a term is easy to misunderstand, easy to misuse, or can mean more than one
  thing in everyday language, include a short usage example that shows how a
  tool consumer would actually use it in a managed project. If using the term
  depends on a command, prefer a concrete example command and explain what that
  enables.
- If an entry describes a planned concept rather than a live implemented one,
  say that explicitly so the dictionary does not blur target behavior with
  current behavior.
- In `docs/` prose, link important dictionary terms to the matching entry in
  this dictionary unless the term is being used as code, CLI syntax, or a file
  path in backticks.

## Product Concepts

No product concepts are defined yet.

## Meta And Internal Terms

Terms in this section belong to the repository documentation model itself.

### Co-located docs

Optional Markdown files that live next to a concrete source or configuration
file and document that file locally.

### Complecting

Braiding distinct concerns together behind one boundary.

### Conceptual simplicity

The absence of [complecting](#complecting).

### Composition

The act of joining distinct parts at the top level without merging their
responsibilities.

### Global docs

Markdown files under `docs/` that participate in the repository's indexed
documentation system.

### Indexed docs system

The repository documentation model where `docs/_index.md` and area `_index.md`
files define routing for global docs under `docs/`.

### Module

Anything with an inside, an outside, and a boundary or interface.

### Responsibility boundary

A conceptual line around one owned concern, task, or role.

### System part

A focused subsystem or documented part that owns one primary responsibility.
