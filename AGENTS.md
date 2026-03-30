## Repo Rules

### Global Docs Routing

- For every substantive prompt, first use the `global-docs-router` skill.
- When global docs are needed, route through the indexed docs system under
  `docs/` and read only the minimum sufficient set.
- In each docs folder, treat `_index.md` as navigation, `README.md` as the
  mandatory human mental-model entrypoint, `_status.md` as present-state
  context, `_decisions.md` as rationale, and ordinary topic docs as focused
  mechanisms or rules.
- When a task affects architecture, implementation boundaries, system
  decomposition, product responsibilities, or docs structure, include
  `docs/process/conceptual-simplicity.md` in the minimum sufficient context.
- When a task depends on repository terminology, terminology consistency, or
  docs prose that may introduce or change important terms, include
  `docs/DICTIONARY.md` in the minimum sufficient context.
- If `global-docs-router` notices a meaningful contradiction or mismatch while
  routing or reading global docs, surface it clearly even if the user did not
  explicitly ask for contradiction-finding.

### Conceptual Simplicity

- Apply Rich Hickey style simplicity across code, architecture, product
  concepts, business-domain concepts, and documentation structure.
- Prefer one concept, task, role, or dimension per module, system part, and
  focused doc. Do not merge distinct concerns because they are operationally
  adjacent or technically convenient to implement together.
- Treat complexity as complecting: braiding distinct concerns together behind
  one boundary. Avoid that in docs and implementation.
- Compose distinct parts at the top level. Composition is allowed; complecting
  is not.
- When technical convenience conflicts with conceptual clarity, preserve
  conceptual clarity.
- For system-part docs, document at least: responsibility, non-responsibility,
  inputs, outputs, and adjacent parts.
- Keep terminology precise: prefer one important term per concept, avoid
  near-synonyms that blur boundaries, and update `docs/DICTIONARY.md` when
  terminology changes.
- Keep actual product concepts distinct from the meta and internal terms used
  to scope, design, implement, operate, or document them. If a shared
  dictionary needs both, separate them structurally instead of flattening them
  into one undifferentiated list.
- Apply these rules consistently when creating docs and when implementing the
  system, not only when a task explicitly mentions simplicity.

### Colocated Docs Reading

- When reading a concrete source or configuration file, use the
  `colocated-docs-reader` skill to check for an adjacent `*.docs.md` file with
  the same basename.
- If the co-located docs file exists and is relevant, read it as part of the
  minimum sufficient context.
- If no co-located docs file exists, continue without treating that as a gap.
- Co-located docs are optional and do not participate in the global
  `docs/_index.md` routing system.

### Global Docs Maintenance

- Whenever a file under `docs/` is created, moved, renamed, deleted, or
  substantively updated, use the `global-docs-maintainer` skill.
- Every docs folder under `docs/` must have a `README.md`, even if it is only a
  few lines long.
- Use `_status.md` only for meaningful current-state volatility, active
  uncertainty, known gaps, or open questions.
- Use `_decisions.md` only when rationale or tradeoffs would not be obvious from
  the current docs shape alone.
- Do not create or update unrelated `_index.md` files outside the affected
  routing path in the `docs/` tree.
- Every `_index.md` entry for an existing global doc should explicitly include
  `Path`, `Summary`, `Read when`, and `Tags`.
- Do not use a single doc to cover multiple distinct system parts just because
  they are implemented together or used in sequence.
- When documenting a product or architecture area with clear responsibility
  boundaries, prefer one focused doc per system part plus a composition doc over
  umbrella docs that braid multiple responsibilities together.

### Dictionary Maintenance

- `docs/DICTIONARY.md` is the canonical dictionary for the repository
  terminology used by this repository's own `docs/` tree. Its first section is
  for actual product concepts. Its second section is for meta and internal terms
  used to scope, design, implement, operate, or document those concepts.
- Do not add vague principle language, taste labels, or grouping labels to
  `docs/DICTIONARY.md` when a principle doc, inventory doc, or focused topic doc
  is the better home.
- When docs or repository instructions introduce, rename, redefine, or remove
  important product concepts or important meta/internal repository terms, use
  the `business-dictionary-maintainer` skill.
- After substantively changing docs in an area, do a dictionary coverage pass
  over the affected docs. Scan for stable product concepts and meta/internal
  terms that the updated docs now rely on, add missing dictionary entries for
  terms that meet the criteria, link important uses, and remove stale links to
  removed entries.
- In `docs/` prose, link important dictionary terms to the matching dictionary
  entry unless the term is being used as code, CLI syntax, or a file path in
  backticks.

### Colocated Docs Maintenance

- When modifying a source or configuration file, use the
  `colocated-docs-maintainer` skill to check for an adjacent `*.docs.md` file
  with the same basename.
- If that co-located docs file exists and the change affects documented
  behavior, interface, intent, invariants, or constraints, update it in the same
  task.
- If no co-located docs file exists, do not create one unless the user
  explicitly requests it.
- If the user explicitly requests creation of a new co-located docs file, use
  the `colocated-docs-creator` skill to decide whether creation is warranted and
  create it only when its criteria are met.
