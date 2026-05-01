"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import {
  REFERENCE_TAGS,
  type ReferenceEntry,
  type ReferenceGroup,
  type ReferenceTag,
} from "@/lib/references";

type ReferenceDirectoryProps = {
  groups: ReferenceGroup[];
};

type FlattenedReferenceEntry = ReferenceEntry & {
  source: string;
};

function toSectionId(source: string): string {
  return source.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function countEntries(groups: ReferenceGroup[]): number {
  return groups.reduce((total, group) => total + group.entries.length, 0);
}

function formatEntryTag(tag: ReferenceTag): string {
  return `#${tag.replace(/\s+/g, "_")}`;
}

function flattenGroups(groups: ReferenceGroup[]): FlattenedReferenceEntry[] {
  return groups.flatMap((group) =>
    group.entries.map((entry) => ({
      ...entry,
      source: group.source,
    })),
  );
}

export function ReferenceDirectory({ groups }: ReferenceDirectoryProps) {
  const [selectedTags, setSelectedTags] = useState<ReferenceTag[]>([]);
  const [showCorePath, setShowCorePath] = useState(false);

  const allEntries = useMemo(() => flattenGroups(groups), [groups]);

  const availableTags = useMemo(
    () => REFERENCE_TAGS.filter((tag) => !selectedTags.includes(tag)),
    [selectedTags],
  );

  const filteredGroups = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          entries: group.entries.filter((entry) =>
            selectedTags.every((tag) => entry.tags.includes(tag)),
          ),
        }))
        .filter((group) => group.entries.length > 0),
    [groups, selectedTags],
  );

  const corePathEntries = useMemo(
    () =>
      allEntries
        .filter((entry) => entry.corePath)
        .sort(
          (left, right) =>
            left.learningOrder - right.learningOrder ||
            left.source.localeCompare(right.source) ||
            left.title.localeCompare(right.title),
        ),
    [allEntries],
  );

  const totalEntries = useMemo(() => countEntries(groups), [groups]);
  const visibleEntries = useMemo(
    () => countEntries(filteredGroups),
    [filteredGroups],
  );
  const totalCorePathEntries = useMemo(
    () => allEntries.filter((entry) => entry.corePath).length,
    [allEntries],
  );

  function handleTagSelect(event: ChangeEvent<HTMLSelectElement>) {
    const tag = event.target.value as ReferenceTag | "";

    if (!tag) {
      return;
    }

    setSelectedTags((current) =>
      current.includes(tag) ? current : [...current, tag],
    );
  }

  function removeTag(tagToRemove: ReferenceTag) {
    setSelectedTags((current) => current.filter((tag) => tag !== tagToRemove));
  }

  const summary = showCorePath
    ? `Showing ${corePathEntries.length} core chapters in beginner-to-advanced order.`
    : selectedTags.length === 0
      ? `Add tags to narrow the list. A resource must match every selected tag.`
      : `Showing ${visibleEntries} of ${totalEntries} resources that match every selected tag.`;

  return (
    <>
      <p>
        This page collects resources I find valuable in one way or another,
        whether because they are especially useful, well-written,
        thought-provoking, or worth revisiting over time. The emphasis is on
        material that helps when building systems that need to plan, use tools,
        retrieve information, and stay reliable over long runs.
      </p>

      <section
        aria-labelledby="reference-filters-title"
        className="reference-filters"
      >
        <div className="reference-filters__header">
          <h2 id="reference-filters-title">Filter by tags</h2>
          <p aria-live="polite" className="reference-filters__summary">
            {summary}
          </p>
          <p className="reference-filters__hint">
            {showCorePath
              ? "This view hides the rest of the library so the path reads like a shorter book."
              : "Use the checkbox for a smaller beginner-to-advanced path, or browse everything below by source."}
          </p>
        </div>

        <div className="reference-filters__controls">
          <label className="reference-filters__toggle">
            <input
              checked={showCorePath}
              onChange={(event) => setShowCorePath(event.target.checked)}
              type="checkbox"
            />
            <span>Curated, tutorial ordered links</span>
          </label>

          <label className="reference-filters__select">
            <select
              aria-label="Add a reference tag filter"
              disabled={showCorePath || availableTags.length === 0}
              onChange={handleTagSelect}
              value=""
            >
              <option value="">
                {availableTags.length === 0 ? "All tags selected" : "Add a tag"}
              </option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </label>

          {selectedTags.length > 0 ? (
            <button
              className="reference-filters__clear"
              onClick={() => setSelectedTags([])}
              type="button"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {selectedTags.length > 0 && !showCorePath ? (
          <ul className="reference-filter-chip-list">
            {selectedTags.map((tag) => (
              <li key={tag}>
                <span className="reference-chip reference-chip--selected">
                  <span>{tag}</span>
                  <button
                    aria-label={`Remove ${tag} filter`}
                    className="reference-chip__remove"
                    onClick={() => removeTag(tag)}
                    type="button"
                  >
                    x
                  </button>
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {showCorePath ? (
        corePathEntries.length > 0 ? (
          <section
            aria-labelledby="core-learning-path"
            className="reference-group"
          >
            <h2 id="core-learning-path">Core learning path</h2>
            <p className="reference-group__description">
              A smaller reading path that starts with modularity and complexity
              management, then moves into agent design, tools, context, memory,
              guardrails, evals, and day-to-day operating practice.
            </p>

            <div className="reference-group__list">
              {corePathEntries.map((entry) => (
                <article className="reference-entry" key={entry.href}>
                  <div className="reference-entry__eyebrow">
                    <span className="reference-entry__chapter">
                      Chapter {entry.learningOrder}
                    </span>
                    <span className="reference-entry__source">
                      {entry.source}
                    </span>
                  </div>

                  <ul
                    aria-label={`${entry.title} tags`}
                    className="reference-entry__tags"
                  >
                    {entry.tags.map((tag) => (
                      <li className="reference-entry__tag" key={tag}>
                        {formatEntryTag(tag)}
                      </li>
                    ))}
                  </ul>

                  <h3>
                    <a href={entry.href} rel="noopener" target="_blank">
                      {entry.title}
                    </a>
                  </h3>
                  <p>{entry.description}</p>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <p className="reference-empty">
            No core-path resources match every selected tag.
          </p>
        )
      ) : filteredGroups.length > 0 ? (
        <div className="reference-groups">
          {filteredGroups.map((group) => (
            <section
              aria-labelledby={toSectionId(group.source)}
              className="reference-group"
              key={group.source}
            >
              <h2 id={toSectionId(group.source)}>{group.source}</h2>

              <div className="reference-group__list">
                {group.entries.map((entry) => (
                  <article className="reference-entry" key={entry.href}>
                    <ul
                      aria-label={`${entry.title} tags`}
                      className="reference-entry__tags"
                    >
                      {entry.tags.map((tag) => (
                        <li className="reference-entry__tag" key={tag}>
                          {formatEntryTag(tag)}
                        </li>
                      ))}
                    </ul>

                    <h3>
                      <a href={entry.href} rel="noopener" target="_blank">
                        {entry.title}
                      </a>
                    </h3>
                    <p>{entry.description}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <p className="reference-empty">
          No resources match every selected tag.
        </p>
      )}
    </>
  );
}
