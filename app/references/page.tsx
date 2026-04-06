import type { Metadata } from "next";
import { REFERENCE_GROUPS } from "@/lib/references";
import { buildPageMetadata } from "@/lib/siteMetadata";
import { buildCollectionPageJsonLd as buildReferenceCollectionJsonLd } from "@/lib/structuredData";

function toSectionId(source: string): string {
  return source.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

const pageMetadata = buildPageMetadata({
  title: "References for building AI agents | maintainable.software",
  description:
    "A curated reading list of articles, papers, and essays about context engineering, tools, memory, retrieval, and reliable AI agent workflows.",
  path: "/references/",
});

export const metadata: Metadata = {
  ...pageMetadata,
  keywords: [
    "AI agents",
    "context engineering",
    "retrieval",
    "memory",
    "tools",
    "agent workflows",
    "references",
  ],
};

const collectionJsonLd = buildReferenceCollectionJsonLd({
  name: "References for building AI agents",
  description:
    "A curated reading list of articles, papers, and essays about context engineering, tools, memory, retrieval, and reliable AI agent workflows.",
  url: "/references/",
  items: REFERENCE_GROUPS.flatMap((group) =>
    group.entries.map((entry) => ({
      name: entry.title,
      url: entry.href,
      description: entry.description,
    })),
  ),
});

export default function ReferencesPage() {
  return (
    <article className="content-shell page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionJsonLd),
        }}
      />

      <header className="content-header">
        <p className="content-header__kicker">Curated reading list</p>
        <h1>References</h1>
        <p className="post-summary">
          A curated reading list of articles, papers, and essays about context
          engineering, tools, memory, retrieval, and reliable AI agent
          workflows.
        </p>
      </header>

      <div className="content-body">
        <p>
          This page collects resources I find valuable in one way or another,
          whether because they are especially useful, well-written,
          thought-provoking, or worth revisiting over time. The emphasis is on
          material that helps when building systems that need to plan, use
          tools, retrieve information, and stay reliable over long runs.
        </p>

        {REFERENCE_GROUPS.map((group) => (
          <section
            aria-labelledby={toSectionId(group.source)}
            key={group.source}
          >
            <h2 id={toSectionId(group.source)}>{group.source}</h2>

            {group.entries.map((entry) => (
              <article key={entry.href}>
                <h3>
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {entry.title}
                  </a>
                </h3>
                <p>{entry.description}</p>
              </article>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
