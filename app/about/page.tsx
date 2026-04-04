import Link from "next/link";
import { buildPageMetadata } from "@/lib/siteMetadata";

export const metadata = buildPageMetadata({
  title: "About maintainable.software",
  description:
    "What maintainable.software covers: agentic engineering, AI-assisted software work, and maintainable, resilient systems.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <article className="content-shell page-shell">
      <header className="content-header">
        <h1>About</h1>
      </header>

      <div className="content-body">
        <h2>What is this blog about?</h2>
        <p>
          Agentic engineering is on the rise, but it&apos;s such a new topic
          that high quality information is rare while the internet is already
          full of anti-patterns disguised as advice. On this blog I share how I
          use AI, the approaches I think are good and/or bad and how to tackle
          agentic engineering in such a way that the result is a maintainable
          and resilient software. I am less interested in AI as a magic code
          generator, but as a serious copilot for product and systems work.
        </p>

        <p>
          The goal is to provide deep insight, convey in-depth understanding and
          the capability to apply advanced topics and approaches to any
          codebase.
        </p>

        <h2>Publication and author</h2>
        <p>
          <strong>maintainable.software</strong> is the publication page. The
          canonical author page lives at <Link href="/me/">/me/</Link>, where
          Jan-Gerke Salomon&apos;s background, experience, and external profiles
          are collected in one place.
        </p>
      </div>
    </article>
  );
}
