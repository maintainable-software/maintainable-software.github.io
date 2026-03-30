---
name: colocated-docs-creator
description: Create a new adjacent *.docs.md file for a concrete source or configuration file, but only when the user explicitly requests creation and the file meets narrow warrant criteria for co-located documentation.
---

# Colocated Docs Creator

Use this skill when the user explicitly asks to create a new co-located
`*.docs.md` file or to proactively add co-located docs where they are
warranted.

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
- Do not create a co-located doc when an existing one should be updated
  instead.
- Do not move cross-cutting or architectural guidance into a co-located doc;
  that belongs under `docs/`.
- Do not create a doc that mostly restates the implementation.
- Keep the new doc narrow, concrete, and local to the file it documents.

## Canonical References

Read [docs/process/colocated-docs.md](/home/gerkules/development/personal/blog.maintainable.software/docs/process/colocated-docs.md) for the repository's co-located docs convention.
