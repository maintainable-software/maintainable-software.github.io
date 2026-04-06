import Link from "next/link";
import { buildPageMetadata } from "@/lib/siteMetadata";

export const metadata = buildPageMetadata({
  title: "About maintainable.software",
  description:
    "What maintainable.software is, who it is for, and how it approaches agentic engineering, software architecture, docs-first product development, and maintainable delivery.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <article className="content-shell page-shell">
      <header className="content-header">
        <h1>About maintainable.software</h1>
      </header>

      <div className="content-body">
        <p>
          <strong>maintainable.software</strong> is a publication about agentic
          engineering, software architecture, docs-first product development,
          and maintainable software delivery. The focus is not AI as a magic
          code generator, but AI as leverage for serious engineering work:
          structuring codebases, improving feedback loops, making better
          technical decisions, and shipping software that stays understandable
          over time.
        </p>

        <h2>What is maintainable.software about?</h2>
        <p>
          Agentic engineering is moving quickly, but a lot of the available
          advice is either shallow, overly tool-driven, or disconnected from
          what makes software maintainable in the first place. This blog exists
          to close that gap. It covers how to use coding agents and AI-assisted
          workflows without giving up clarity, ownership, architecture, or
          product quality.
        </p>

        <p>
          The goal is to publish writing that helps readers think better about
          the work itself, not just copy tactics. That includes durable
          principles, practical heuristics, and concrete examples that can be
          applied across different codebases and teams.
        </p>

        <h2>Who is this blog for?</h2>
        <p>
          It is written for software engineers, technical leads, architects, and
          independent builders who want to use AI seriously rather than
          casually. If you care about long-term code quality, system design,
          responsibility boundaries, documentation, and feedback loops, this is
          the intended audience.
        </p>

        <h2>What kind of topics does it cover?</h2>
        <p>The blog focuses on questions such as:</p>

        <ul>
          <li>
            How to design codebases that are easier for coding agents to
            navigate safely
          </li>
          <li>
            How documentation, guardrails, and tests change AI-assisted delivery
          </li>
          <li>
            How to think about software architecture in an agentic workflow
          </li>
          <li>
            How docs-first product development improves implementation quality
          </li>
          <li>
            How to keep AI-assisted work maintainable instead of merely fast
          </li>
        </ul>

        <h2>What perspective does the publication take?</h2>
        <p>
          The perspective is opinionated, practical, and grounded in software
          engineering experience. The writing is less interested in hype, prompt
          theater, and one-off hacks, and more interested in how AI can support
          real product and systems work. That means maintainability, resilience,
          verification, and architectural judgment matter at least as much here
          as raw output speed.
        </p>

        <h2>Publication and author</h2>
        <p>
          <strong>maintainable.software</strong> is the publication. It is
          written by Jan-Gerke Salomon, an independent software engineer with a
          strong frontend foundation, full-stack delivery experience, and a
          current focus on agentic engineering and software architecture.
        </p>

        <p>
          The canonical author page lives at <Link href="/me/">/me/</Link>,
          where Jan-Gerke Salomon&apos;s background, experience, and external
          profiles are collected in one place.
        </p>

        <h2>Where should you start?</h2>
        <p>
          Browse the <Link href="/">homepage</Link> for the essays themselves or
          visit <Link href="/me/">/me/</Link> if you want the author context
          behind the publication.
        </p>
      </div>
    </article>
  );
}
