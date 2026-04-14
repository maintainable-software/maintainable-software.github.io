import type { Metadata } from "next";
import { REFERENCE_GROUPS } from "@/lib/references";
import { buildPageMetadata } from "@/lib/siteMetadata";
import { buildCollectionPageJsonLd as buildReferenceCollectionJsonLd } from "@/lib/structuredData";
import { ReferenceDirectory } from "./ReferenceDirectory";

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
        <ReferenceDirectory groups={REFERENCE_GROUPS} />
      </div>
    </article>
  );
}
