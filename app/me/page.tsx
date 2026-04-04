import { AUTHOR_NAME, AUTHOR_TITLE, SITE_NAME } from "@/lib/site";
import { buildPersonJsonLd } from "@/lib/structuredData";
import styles from "./page.module.css";
import { buildPageMetadata } from "@/lib/siteMetadata";

export const metadata = buildPageMetadata({
  title: "Jan-Gerke Salomon | maintainable.software",
  description:
    "Profile of Jan-Gerke Salomon, an independent software engineer focused on agentic engineering, software architecture, and maintainable full-stack delivery.",
  path: "/me/",
});

const overviewColumns = [
  [
    {
      label: "Current focus",
      value:
        "Agentic engineering, software architecture, and maintainable delivery",
    },
    {
      label: "Foundation",
      value:
        "15 years in software engineering with deep frontend roots and strong systems judgment",
    },
  ],
  [
    {
      label: "Working scope",
      value:
        "Independent full-stack work across databases, backend, APIs, and frontend",
    },
    {
      label: "Latest long-term role",
      value: "DHIS2, University of Oslo through December 2024",
    },
  ],
];

const recentTrajectory = [
  {
    company: "Independent Software Engineer",
    role: "Self-employed",
    dates: "2025 - Present",
    description:
      "Working full stack across databases, backend, APIs, and frontend, with growing focus on agentic workflows, architecture, and directing coding agents toward maintainable results.",
  },
  {
    company: "DHIS 2, University of Oslo",
    role: "Senior Frontend Engineer",
    dates: "2019 - Dec 2024",
    description:
      "Open source health platform used in 70+ countries; introduced Cypress, led app rewrites, and improved UI and testing libraries.",
  },
];

const heroFacts = [
  "15 years of experience",
  "Independent since 2025",
  "Full stack across DB, backend, APIs, and frontend",
  "Deep frontend foundation with strong systems judgment",
];

const experienceItems = [
  {
    company: "Independent Software Engineer",
    role: "Self-employed",
    dates: "2025 - Present",
    description:
      "Working full stack across databases, backend, APIs, and frontend, with growing focus on agentic workflows, architecture, and directing coding agents toward maintainable results.",
  },
  {
    company: "DHIS 2, University of Oslo",
    role: "Senior Frontend Engineer",
    dates: "2019 - Dec 2024",
    description:
      "Open source health platform used in 70+ countries; introduced Cypress, led app rewrites, and improved UI and testing libraries.",
  },
  {
    company: "Tyroola PTY Ltd",
    role: "Senior Frontend Engineer",
    dates: "2016 - 2018",
    description:
      "Modernized a legacy OOP JavaScript frontend into a tested React, Flux, and Webpack architecture, improved performance, and supported product and UX.",
  },
  {
    company: "DerPunkt GmbH",
    role: "Apprentice and Frontend Engineer",
    dates: "2011 - 2016",
    description:
      "Worked across delivery, client support, technical project management, budgeting, trainee supervision, and TYPO3 integrations.",
  },
];

const strengths = [
  "Built a strong engineering foundation long before AI-assisted workflows, so the agentic layer sits on top of real delivery experience.",
  "Uses coding agents as leverage for architecture, execution, review, and quality control rather than as unchecked code generators.",
  "Keeps business context, engineering constraints, and the human side of delivery in view at the same time.",
  "Thinks about product quality beyond code alone, including communication, knowledge sharing, and agile fundamentals.",
];

const capabilityGroups = [
  {
    label: "Agentic work",
    items: [
      "Agentic workflows",
      "Architecture",
      "Execution review",
      "Maintainable delivery",
    ],
  },
  {
    label: "Full-stack scope",
    items: ["Databases", "Backend", "APIs", "Frontend"],
  },
  {
    label: "Engineering foundation",
    items: [
      "React",
      "TypeScript",
      "GraphQL",
      "Cypress",
      "Jest",
      "Linux",
      "NixOS",
    ],
  },
];

const profileNotes = [
  "German (native) and English (experienced, between C1 and C2)",
  "IT specialist for application development, Heinrich-Hertz Schule, Karlsruhe (January 2015)",
  "Priorities: simplicity, pragmatism, and open source over closed source",
  "Career path: Karlsruhe -> Australia -> remote open source work -> independent full-stack work",
];

export default function MePage() {
  const personJsonLd = buildPersonJsonLd();

  return (
    <article className={styles.page} data-page="me">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd),
        }}
      />

      <header className={styles.hero}>
        <p className={styles.kicker}>
          {AUTHOR_TITLE} and author of {SITE_NAME}
        </p>
        <h1 className={styles.title}>{AUTHOR_NAME}</h1>
        <p className={styles.subtitle}>
          Agentic engineering, software architecture, full-stack delivery, and
          maintainable systems.
        </p>
        <p className={styles.lede}>
          I write {SITE_NAME} and work independently across databases, backend,
          APIs, and frontend while using coding agents as leverage for
          architecture, execution, review, and product-quality work.
        </p>

        <ul className={styles.heroFacts}>
          {heroFacts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <ul className={`${styles.linkList} ${styles.heroLinks}`}>
          <li>
            <a href="mailto:jgs.salomon@maintainable.software">Email</a>
          </li>
          <li>
            <a
              href="https://github.com/Mohammer5"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/jan-gerke-salomon/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </header>

      <section
        className={`${styles.overview} ${styles.toneOverview}`}
        aria-labelledby="overview-title"
      >
        <div className={styles.overviewIntro}>
          <h2 id="overview-title" className={styles.sectionTitle}>
            Current profile
          </h2>
          <p className={styles.sectionIntro}>
            The short version: current focus, current scope, and proof of
            seniority.
          </p>
        </div>

        <div className={styles.overviewColumns}>
          {overviewColumns.map((column) => {
            const [primary, secondary] = column;

            return (
              <section className={styles.overviewColumn} key={primary.label}>
                <h3 className={styles.columnLabel}>{primary.label}</h3>
                <p className={styles.overviewLead}>{primary.value}</p>

                <div className={styles.overviewBlock}>
                  <p className={styles.overviewMeta}>{secondary.label}</p>
                  <p className={styles.overviewDetail}>{secondary.value}</p>
                </div>
              </section>
            );
          })}

          <section
            className={styles.trajectoryColumn}
            aria-labelledby="trajectory-title"
          >
            <h3 id="trajectory-title" className={styles.columnLabel}>
              Recent trajectory
            </h3>

            <ol className={styles.trajectoryList}>
              {recentTrajectory.map((item) => (
                <li className={styles.trajectoryItem} key={item.company}>
                  <p className={styles.trajectoryDates}>{item.dates}</p>
                  <div className={styles.trajectoryBody}>
                    <h4>{item.company}</h4>
                    <p className={styles.trajectoryRole}>{item.role}</p>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>

      <section
        className={`${styles.experienceSection} ${styles.toneExperience}`}
        aria-labelledby="experience-title"
      >
        <div className={styles.sectionHeader}>
          <h2 id="experience-title" className={styles.sectionTitle}>
            Selected experience
          </h2>
          <p className={styles.sectionIntro}>
            Frontend-heavy foundation, now applied across full-stack delivery
            and agentic workflows.
          </p>
        </div>

        <ol className={styles.experienceList}>
          {experienceItems.map((item) => (
            <li className={styles.experienceItem} key={item.company}>
              <p className={styles.experienceDates}>{item.dates}</p>
              <div className={styles.experienceBody}>
                <h3>{item.company}</h3>
                <p className={styles.experienceRole}>{item.role}</p>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className={styles.supportGrid}>
        <section
          className={`${styles.supportSection} ${styles.tonePractice}`}
          aria-labelledby="strengths-title"
        >
          <div className={styles.sectionHeader}>
            <h2 id="strengths-title" className={styles.sectionTitle}>
              What I optimize for
            </h2>
          </div>

          <ul className={styles.bulletList}>
            {strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section
          className={`${styles.supportSection} ${styles.toneCapability}`}
          aria-labelledby="capabilities-title"
        >
          <div className={styles.sectionHeader}>
            <h2 id="capabilities-title" className={styles.sectionTitle}>
              Capabilities
            </h2>
          </div>

          <dl className={styles.capabilityList}>
            {capabilityGroups.map((group) => (
              <div className={styles.capabilityGroup} key={group.label}>
                <dt>{group.label}</dt>
                <dd>{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <div className={styles.lowerGrid}>
        <section
          className={`${styles.supportSection} ${styles.toneBackground}`}
          aria-labelledby="background-title"
        >
          <div className={styles.sectionHeader}>
            <h2 id="background-title" className={styles.sectionTitle}>
              Background
            </h2>
          </div>

          <ul className={styles.noteList}>
            {profileNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section
          className={`${styles.detailSection} ${styles.toneApproach}`}
          aria-labelledby="approach-title"
        >
          <div className={styles.sectionHeader}>
            <h2 id="approach-title" className={styles.sectionTitle}>
              Approach
            </h2>
          </div>

          <div className={styles.copy}>
            <p>
              I am Jan-Gerke Salomon, a software engineer with 15 years of
              experience. I mainly focus on how to maintain high quality in
              software projects from beginning to end, both in terms of the
              process itself and in terms of software and code quality.
            </p>

            <p>
              What matters most to me is that, regardless of the topic, the
              context always stays in view and a holistic approach is applied,
              so that not only the engineer&apos;s perspective is considered,
              but also the business perspective and the human being.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
