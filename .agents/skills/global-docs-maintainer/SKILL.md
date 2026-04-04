---
name: global-docs-maintainer
description: Maintain this repository's global indexed documentation system under docs/ by updating canonical docs and `_index.md` routing files as repository truth changes.
---

# Global Docs Maintainer

Use this skill whenever work changes global repository documentation or
repository truth that should be reflected in `docs/`.

## Workflow

1. Update the global canonical document that owns the changed fact.
2. Ensure the affected docs folder still has a `README.md` that explains what
   the area is, why it exists, and the core mental model humans should use when
   reading the area.
3. Update or create the folder's `_status.md` when the change affects current
   reality, active uncertainty, known gaps, or open questions.
4. Update or create the folder's `_decisions.md` when the change affects
   important rationale or tradeoffs that would not be obvious from the current
   docs shape alone.
5. Preserve conceptual simplicity: do not broaden an existing doc to cover
   multiple distinct concepts just because they are related in workflow or
   implementation.
6. When a domain area has multiple clear responsibility boundaries, prefer one
   focused doc per responsibility plus a composition doc that describes how the
   parts fit together.
7. Add a new focused global doc only when no current doc in `docs/` is a good
   fit.
8. Check the co-located `_index.md` first and update it if routing or
   discoverability changed.
9. Walk upward one folder at a time toward `docs/_index.md`, updating or
   creating routing `_index.md` files only where needed.
10. Stop once the next parent `_index.md` would not need any change.
11. Ensure every `_index.md` entry for an existing global doc includes `Path`,
    `Summary`, `Read when`, and `Tags`.
12. After substantively changing docs in an area, do a dictionary coverage pass
    over the affected docs area. Scan for stable product concepts and
    meta/internal terms the updated docs now rely on.
13. Add missing dictionary entries for terms from that coverage pass that meet
    the dictionary criteria, link important uses in the affected docs, and
    remove stale links to removed entries.

## Boundaries

- Do not duplicate the same information across multiple global docs.
- Maintain routing integrity only through `_index.md` files in the `docs/`
  tree.
- Do not use `README.md` as a routing index in this repository. Keep it as the
  folder's human mental-model entrypoint.
- Do not use this skill for co-located `*.docs.md` files next to source files.
- Do not preserve stale wording when the correct scope is now known.
- Do not let implementation convenience or process adjacency justify a doc
  boundary that braids distinct responsibilities together.
- Do not treat dictionary maintenance as complete just because the explicitly
  requested terms were handled. Check the affected docs area for missing stable
  terms too.

## Canonical References

Read [docs/\_index.md](/home/gerkules/development/personal/blog.maintainable.software/docs/_index.md) for the root global docs index.
Read [docs/DICTIONARY.md](/home/gerkules/development/personal/blog.maintainable.software/docs/DICTIONARY.md) when repository terminology changes are part of the task.
Read [docs/process/\_index.md](/home/gerkules/development/personal/blog.maintainable.software/docs/process/_index.md) for process docs routing.
Read [docs/process/conceptual-simplicity.md](/home/gerkules/development/personal/blog.maintainable.software/docs/process/conceptual-simplicity.md) when shaping docs around responsibilities, modules, or anti-complecting rules.
Read [docs/process/docs-system.md](/home/gerkules/development/personal/blog.maintainable.software/docs/process/docs-system.md) for the indexed global docs model.
Read [docs/process/colocated-docs.md](/home/gerkules/development/personal/blog.maintainable.software/docs/process/colocated-docs.md) to distinguish co-located docs from global docs.
