import styles from "./page.module.css";

const summaryTags = [
  "15 years of experience",
  "Independent since 2025",
  "Full stack: DB, backend, APIs, frontend",
  "Agentic engineering and architecture",
];

const snapshotItems = [
  {
    label: "Primary focus",
    value: "Agentic engineering, architecture, and maintainable delivery",
  },
  {
    label: "Current work",
    value: "Independent full-stack work across databases, backend, APIs, and frontend",
  },
  {
    label: "Engineering foundation",
    value: "15 years in software engineering with deep frontend roots and strong systems judgment",
  },
  {
    label: "Working style",
    value: "Holistic, context-aware, pragmatic, explicit about tradeoffs",
  },
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

const toolbox = [
  "React",
  "Redux",
  "RxJS",
  "Apollo",
  "react-query",
  "Cypress",
  "Jest",
  "TypeScript",
  "GraphQL",
  "Neo4j",
  "Linux",
  "NixOS",
];

const profileNotes = [
  "German (native) and English (experienced, between C1 and C2)",
  "IT specialist for application development, Heinrich-Hertz Schule, Karlsruhe (January 2015)",
  "Priorities: simplicity, pragmatism, and open source over closed source",
  "Career path: Karlsruhe -> Australia -> remote open source work -> independent full-stack work",
];

export default function MePage() {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <section className={styles.introCard} aria-labelledby="me-title">
          <p className={styles.kicker}>Independent Software Engineer</p>
          <h1 id="me-title" className={styles.title}>
            Jan-Gerke Salomon
          </h1>
          <p className={styles.subtitle}>
            Agentic engineering, software architecture, full-stack delivery,
            and maintainable systems.
          </p>

          <ul className={styles.tagRow} aria-label="Profile summary">
            {summaryTags.map((tag) => (
              <li className={styles.tag} key={tag}>
                {tag}
              </li>
            ))}
          </ul>

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
              so that not only the engineer&apos;s perspective is considered, but
              also the business perspective and the human being.
            </p>
          </div>
        </section>

        <aside className={styles.snapshotCard} aria-labelledby="snapshot-title">
          <div className={styles.cardHeader}>
            <h2 id="snapshot-title" className={styles.cardTitle}>
              At a glance
            </h2>
            <p className={styles.cardIntro}>
              Current positioning, strengths, and scope.
            </p>
          </div>

          <dl className={styles.snapshotList}>
            {snapshotItems.map((item) => (
              <div className={styles.snapshotRow} key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>

          <ul className={styles.linkList}>
            <li>
              <a href="mailto:jgs.salomon+githubpages@gmail.com">Email</a>
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
        </aside>
      </header>

      <div className={styles.panelGrid}>
        <section className={`${styles.card} ${styles.experienceCard}`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Selected experience</h2>
            <p className={styles.cardIntro}>
              Built on a frontend-heavy foundation, now applied across
              full-stack delivery and agentic workflows.
            </p>
          </div>

          <ol className={styles.experienceList}>
            {experienceItems.map((item) => (
              <li className={styles.experienceItem} key={item.company}>
                <div className={styles.experienceHead}>
                  <h3>{item.company}</h3>
                  <p>
                    {item.role} · {item.dates}
                  </p>
                </div>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Why I am effective</h2>
          </div>

          <ul className={styles.bulletList}>
            {strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Toolbox and profile notes</h2>
          </div>

          <ul className={styles.toolboxList}>
            {toolbox.map((item) => (
              <li className={styles.toolboxTag} key={item}>
                {item}
              </li>
            ))}
          </ul>

          <ul className={styles.noteList}>
            {profileNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
