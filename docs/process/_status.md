# Process Status

Current reality:

- Global docs are routed through `docs/_index.md` and area `_index.md` files.
- The normal docs workflow now treats `README.md` as the mandatory human
  entrypoint in each docs folder.
- The docs process now explicitly applies
  [conceptual simplicity](../DICTIONARY.md#conceptual-simplicity) and
  anti-[complecting](../DICTIONARY.md#complecting) rules across docs structure,
  terminology boundaries, and implementation boundaries.
- The dictionary now separates actual product concepts from meta/internal
  terminology instead of flattening both into one glossary section.
- The docs workflow now requires a dictionary coverage pass over an affected
  docs area after substantive docs changes, rather than only updating explicitly
  mentioned terms.
- Contradictions noticed during docs routing should be surfaced even when
  contradiction-finding was not explicitly requested.
- Co-located docs remain optional and conservative by default.

Known gaps:

- The process is defined, but the repository does not yet use many additional
  docs areas beyond the workflow and dictionary files.
