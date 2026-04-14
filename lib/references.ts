export const REFERENCE_TAGS = [
  "agent workflows",
  "architecture",
  "context engineering",
  "documentation",
  "evaluation",
  "memory",
  "migration",
  "modularity",
  "multi-agent",
  "performance",
  "reliability",
  "retrieval",
  "safety",
  "teams",
  "testing",
  "tools",
] as const;

export type ReferenceTag = (typeof REFERENCE_TAGS)[number];

export type ReferenceEntry = {
  title: string;
  href: string;
  description: string;
  tags: ReferenceTag[];
};

export type ReferenceGroup = {
  source: string;
  entries: ReferenceEntry[];
};

export const REFERENCE_GROUPS: ReferenceGroup[] = [
  {
    source: "Anthropic",
    entries: [
      {
        title: "Building Effective AI Agents",
        href: "https://www.anthropic.com/research/building-effective-agents",
        description:
          "A good foundation for deciding when to use a workflow, when to use an agent, and when the simplest single-call setup is enough.",
        tags: ["agent workflows", "context engineering", "tools"],
      },
      {
        title: "Effective context engineering for AI agents",
        href: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
        description:
          "Best high-level framing of context as a scarce resource that must be assembled deliberately at each turn.",
        tags: ["agent workflows", "context engineering"],
      },
      {
        title: "Effective harnesses for long-running agents",
        href: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents",
        description:
          "Useful for designing harnesses that keep long sessions moving without letting the context window or task state drift apart.",
        tags: ["agent workflows", "context engineering", "reliability"],
      },
      {
        title: "Harness design for long-running application development",
        href: "https://www.anthropic.com/engineering/harness-design-long-running-apps",
        description:
          "A practical companion piece on reducing harness bulk while keeping long-running development runs reliable.",
        tags: ["agent workflows", "context engineering", "reliability"],
      },
      {
        title: "How we built our multi-agent research system",
        href: "https://www.anthropic.com/engineering/multi-agent-research-system",
        description:
          "Shows how to split broad research into coordinated subagents, checkpoint plans, and keep citations attached to the final answer.",
        tags: ["agent workflows", "multi-agent", "reliability"],
      },
      {
        title: "Introducing Contextual Retrieval",
        href: "https://www.anthropic.com/news/contextual-retrieval",
        description:
          "Concrete retrieval technique for giving chunks just enough surrounding meaning before indexing them, which helps agents pull the right evidence later.",
        tags: ["context engineering", "retrieval"],
      },
      {
        title: "Our framework for developing safe and trustworthy agents",
        href: "https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents",
        description:
          "Useful for the oversight, privacy, and security questions that sit beside autonomy in real systems.",
        tags: ["agent workflows", "reliability", "safety"],
      },
      {
        title: "Writing effective tools for agents - with agents",
        href: "https://www.anthropic.com/engineering/writing-tools-for-agents",
        description:
          "Excellent for turning tool definitions into clearer contracts, with better namespacing, outputs, and descriptions.",
        tags: ["agent workflows", "tools"],
      },
      {
        title: "Best Practices for Claude Code",
        href: "https://www.anthropic.com/engineering/claude-code-best-practices",
        description:
          "Operational guidance for running Claude Code in structured loops: context boundaries, iterative verification, and clear separation between planning and implementation.",
        tags: ["agent workflows", "documentation", "tools"],
      },
      {
        title: "How Anthropic teams use Claude Code",
        href: "https://www.anthropic.com/engineering/how-anthropic-teams-use-claude-code",
        description:
          "A practical read on autonomous loops where humans review partial results while the agent executes specs, tests, and updates.",
        tags: [
          "agent workflows",
          "context engineering",
          "reliability",
          "testing",
        ],
      },
    ],
  },
  {
    source: "arXiv",
    entries: [
      {
        title: "Building Effective AI Coding Agents for the Terminal",
        href: "https://arxiv.org/html/2603.05344v2",
        description:
          "A dense terminal-agent paper that covers scaffolding, compaction, memory, and other mechanics needed for long-running command-line work.",
        tags: [
          "agent workflows",
          "context engineering",
          "memory",
          "reliability",
        ],
      },
      {
        title:
          "Theory of Code Space: Do Code Agents Understand Software Architecture?",
        href: "https://arxiv.org/html/2603.00601v4",
        description:
          "Useful for understanding whether an agent can build and maintain a real map of architecture, not just make local edits.",
        tags: ["agent workflows", "architecture", "modularity"],
      },
    ],
  },
  {
    source: "ArchUnit",
    entries: [
      {
        title: "User Guide",
        href: "https://www.archunit.org/userguide/html/000_Index.html",
        description:
          "Shows how to turn architecture rules into executable tests so boundaries stay enforced as code changes.",
        tags: ["architecture", "modularity", "testing", "tools"],
      },
    ],
  },
  {
    source: "Bazel",
    entries: [
      {
        title: "Hermeticity",
        href: "https://bazel.build/basics/hermeticity",
        description:
          "A strong explanation of why isolated, reproducible builds make automated changes easier to trust and debug.",
        tags: ["reliability", "testing"],
      },
    ],
  },
  {
    source: "Carlos E. Jimenez et al.",
    entries: [
      {
        title:
          "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?",
        href: "https://arxiv.org/abs/2310.06770",
        description:
          "The standard reality check for code agents: real GitHub issues, real repositories, and hard multi-file fixes.",
        tags: ["agent workflows", "evaluation"],
      },
    ],
  },
  {
    source: "Chris Richardson",
    entries: [
      {
        title: "Service per team",
        href: "https://microservices.io/patterns/decomposition/service-per-team.html",
        description:
          "Good reminder that service boundaries work best when they line up with ownership, which also keeps agent tasks narrower.",
        tags: ["architecture", "modularity", "teams"],
      },
    ],
  },
  {
    source: "Cognition",
    entries: [
      {
        title: "Don't Build Multi-Agents",
        href: "https://cognition.ai/blog/dont-build-multi-agents",
        description:
          "Clear argument for sharing full traces and carrying decisions forward, instead of fanning work out before the problem really needs it.",
        tags: ["agent workflows", "multi-agent", "reliability"],
      },
      {
        title: "How Cognition Uses Devin to Build Devin",
        href: "https://cognition.ai/blog/how-cognition-uses-devin-to-build-devin",
        description:
          "Interesting because it shows an agent being used inside the product loop, exposing where automation helps and where human steering still matters.",
        tags: ["agent workflows", "reliability", "teams"],
      },
    ],
  },
  {
    source: "Craig Larman",
    entries: [
      {
        title: "Protected Variation: The Importance of Being Closed",
        href: "https://www.martinfowler.com/ieeeSoftware/protectedVariation.pdf",
        description:
          "Classic guidance for putting stable interfaces around change points, which is the same move you need for tools, prompts, and APIs.",
        tags: ["architecture", "modularity", "tools"],
      },
    ],
  },
  {
    source: "Cucumber",
    entries: [
      {
        title: "BDD",
        href: "https://cucumber.io/docs/bdd/",
        description:
          "Useful for turning examples into shared, testable expectations that humans and automation can agree on.",
        tags: ["documentation", "testing"],
      },
      {
        title: "Gherkin Reference",
        href: "https://cucumber.io/docs/gherkin/reference/",
        description:
          "Worth keeping nearby when you want scenarios to stay precise enough to drive tests, documentation, or agent checks.",
        tags: ["documentation", "testing"],
      },
    ],
  },
  {
    source: "D. L. Parnas",
    entries: [
      {
        title: "On the Criteria To Be Used in Decomposing Systems into Modules",
        href: "https://prl.khoury.northeastern.edu/img/p-tr-1971.pdf",
        description:
          "Foundational reading on modularity as information hiding, especially the idea that you should decompose around likely change.",
        tags: ["architecture", "modularity"],
      },
    ],
  },
  {
    source: "G. Kiczales et al.",
    entries: [
      {
        title: "Aspect-Oriented Programming",
        href: "https://dl.acm.org/doi/10.1145/263698.263754",
        description:
          "A good historical reference for cross-cutting concerns and the tradeoff between local clarity and shared behavior.",
        tags: ["architecture", "modularity"],
      },
    ],
  },
  {
    source: "GitHub Blog",
    entries: [
      {
        title: "Building an agentic memory system for GitHub Copilot",
        href: "https://github.blog/ai-and-ml/github-copilot/building-an-agentic-memory-system-for-github-copilot/",
        description:
          "Shows a memory design that stores useful facts with citations and verifies them before reuse, which is the right way to avoid stale steering signals.",
        tags: ["memory", "reliability", "retrieval"],
      },
      {
        title:
          "How to build reliable AI workflows with agentic primitives and context engineering",
        href: "https://github.blog/ai-and-ml/github-copilot/how-to-build-reliable-ai-workflows-with-agentic-primitives-and-context-engineering/?utm_campaign=agentic-copilot-cli-launch-2025&utm_source=blog-release-oct-2025",
        description:
          "Strong practical guide to splitting planning, implementation, and testing into separate sessions and loading only the context each phase needs.",
        tags: [
          "agent workflows",
          "context engineering",
          "reliability",
          "testing",
        ],
      },
      {
        title:
          "Spec-driven development with AI: Get started with a new open source toolkit",
        href: "https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/",
        description:
          "A four-phase loop (Specify, Plan, Tasks, Implement) with clear artifacts and a strong human steering role.",
        tags: [
          "agent workflows",
          "context engineering",
          "documentation",
          "testing",
        ],
      },
    ],
  },
  {
    source: "Google Research",
    entries: [
      {
        title:
          "AI in software engineering at Google: Progress and the path ahead",
        href: "https://research.google/blog/ai-in-software-engineering-at-google-progress-and-the-path-ahead/",
        description:
          "Useful for seeing where AI already helps at scale and where the next gains are likely to come from, especially testing, understanding, and maintenance.",
        tags: ["agent workflows", "reliability", "testing"],
      },
    ],
  },
  {
    source: "Google SRE",
    entries: [
      {
        title: "Service Level Objectives",
        href: "https://sre.google/sre-book/service-level-objectives/",
        description:
          "Core reading for turning vague reliability goals into measurements that an automated system can actually optimize against.",
        tags: ["reliability"],
      },
    ],
  },
  {
    source: "Google Testing Blog",
    entries: [
      {
        title: "Just Say No to More End-to-End Tests",
        href: "https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html",
        description:
          "A durable argument for pushing feedback down the stack so failures are faster, cheaper, and easier to localize.",
        tags: ["reliability", "testing"],
      },
    ],
  },
  {
    source: "H. Gall",
    entries: [
      {
        title: "Detection of Logical Coupling Based on Product Release History",
        href: "https://plg.uwaterloo.ca/~migod/846/papers/gall-coupling.pdf",
        description:
          "Useful for showing that hidden dependencies can be inferred from release behavior, not just source structure.",
        tags: ["architecture", "modularity"],
      },
    ],
  },
  {
    source: "Herbert Graca",
    entries: [
      {
        title: "Packaging & namespacing",
        href: "https://herbertograca.com/2017/08/31/packaging-code/",
        description:
          "A helpful way to think about packages and namespaces as real architecture boundaries instead of just file organization.",
        tags: ["architecture", "modularity"],
      },
    ],
  },
  {
    source: "Import Linter",
    entries: [
      {
        title: "Layers",
        href: "https://import-linter.readthedocs.io/en/latest/contract_types/layers/",
        description:
          "A practical example of enforcing dependency direction in Python, which keeps generated or agent-edited code from breaking architecture.",
        tags: ["architecture", "modularity", "testing", "tools"],
      },
    ],
  },
  {
    source: "J. Becker",
    entries: [
      {
        title:
          "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity",
        href: "https://arxiv.org/abs/2507.09089",
        description:
          "Good empirical guardrail for productivity claims, especially when you want to know what AI actually changes in real developer work.",
        tags: ["agent workflows", "evaluation"],
      },
    ],
  },
  {
    source: "Jimmy Bogard",
    entries: [
      {
        title: "Vertical Slice Architecture",
        href: "https://www.jimmybogard.com/vertical-slice-architecture/",
        description:
          "Useful for organizing code around use cases so changes stay localized and agents can work on one slice without touching a whole layer stack.",
        tags: ["agent workflows", "architecture", "modularity"],
      },
    ],
  },
  {
    source: "John Ousterhout",
    entries: [
      {
        title: "A Philosophy of Software Design",
        href: "https://web.stanford.edu/~ouster/cgi-bin/aposd2ndEdExtract.pdf",
        description:
          "One of the best general references for reducing complexity by designing modules that stay small, coherent, and easy to reason about.",
        tags: ["architecture", "modularity"],
      },
    ],
  },
  {
    source: "Katie Hempenius",
    entries: [
      {
        title: "Performance Budgets 101",
        href: "https://web.dev/articles/performance-budgets-101",
        description:
          "A concrete way to keep an agent honest about cost, because performance limits need explicit budgets instead of vague aspirations.",
        tags: ["performance", "reliability"],
      },
    ],
  },
  {
    source: "Kent C. Dodds",
    entries: [
      {
        title: "AHA Programming",
        href: "https://kentcdodds.com/blog/aha-programming",
        description:
          "A short case for waiting on abstraction until the variation actually shows up, which helps avoid over-generalized code from both humans and agents.",
        tags: ["architecture", "modularity"],
      },
    ],
  },
  {
    source: "LangChain Blog",
    entries: [
      {
        title: "Context Engineering",
        href: "https://blog.langchain.com/context-engineering-for-agents/?utm_source=chatgpt.com",
        description:
          "A useful taxonomy for writing, selecting, compressing, and isolating context as separate problems instead of one vague prompt challenge.",
        tags: ["agent workflows", "context engineering", "memory", "retrieval"],
      },
      {
        title: 'The rise of "context engineering"',
        href: "https://blog.langchain.com/the-rise-of-context-engineering/",
        description:
          "A concise explanation of why context quality, structure, and format matter more than clever wording once systems become dynamic.",
        tags: ["agent workflows", "context engineering"],
      },
    ],
  },
  {
    source: "M. Cataldo",
    entries: [
      {
        title:
          "Software Dependencies, Work Dependencies, and Their Impact on Failures",
        href: "https://cse.unl.edu/~witty/papers/TSE_2008_11_0361_R1.pdf",
        description:
          "Useful for understanding how coordination and communication links can become failure modes in large delivery systems.",
        tags: ["architecture", "reliability", "teams"],
      },
    ],
  },
  {
    source: "Martin Fowler",
    entries: [
      {
        title: "Bounded Context",
        href: "https://martinfowler.com/bliki/BoundedContext.html",
        description:
          "Strong way to keep domain boundaries clear so an agent or teammate does not have to solve the whole system at once.",
        tags: ["architecture", "modularity"],
      },
      {
        title: "Branch By Abstraction",
        href: "https://martinfowler.com/bliki/BranchByAbstraction.html",
        description:
          "A practical migration pattern when you need to replace behavior gradually without freezing the rest of the system.",
        tags: ["architecture", "migration", "modularity"],
      },
      {
        title: "Conway's Law",
        href: "https://martinfowler.com/bliki/ConwaysLaw.html",
        description:
          "A reminder that team structure leaks into architecture, which matters when agent workflows mirror org boundaries.",
        tags: ["architecture", "teams"],
      },
      {
        title: "Flag Argument",
        href: "https://martinfowler.com/bliki/FlagArgument.html",
        description:
          "Useful warning about APIs that hide multiple behaviors behind one parameter and become hard for agents to use correctly.",
        tags: ["modularity", "tools"],
      },
      {
        title: "Humans and Agents in Software Engineering Loops",
        href: "https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html",
        description:
          "Best read here for the distinction between the why loop and the how loop, and for why the harness deserves as much attention as the model.",
        tags: ["agent workflows", "reliability", "teams"],
      },
      {
        title: "Linking Modular Architecture to Development Teams",
        href: "https://martinfowler.com/articles/linking-modular-arch.html",
        description:
          "Shows that modularity only pays off when the team structure and developer experience support the boundaries.",
        tags: ["architecture", "modularity", "teams"],
      },
      {
        title: "Patterns of Legacy Displacement",
        href: "https://martinfowler.com/articles/patterns-legacy-displacement/",
        description:
          "Very practical for replacing old systems in stages instead of turning modernization into a risky big-bang rewrite.",
        tags: ["architecture", "migration"],
      },
      {
        title: "Test Pyramid",
        href: "https://martinfowler.com/bliki/TestPyramid.html",
        description:
          "Still one of the cleanest heuristics for placing verification where it is cheapest and most informative.",
        tags: ["reliability", "testing"],
      },
      {
        title: "Yet Another Optimization Article",
        href: "https://www.martinfowler.com/ieeeSoftware/yetOptimization.pdf",
        description:
          "A good antidote to speculative tuning, especially when an agent or engineer starts optimizing before the bottleneck is real.",
        tags: ["performance"],
      },
    ],
  },
  {
    source: "Martin Fowler and Birgitta Böckeler",
    entries: [
      {
        title: "Context Engineering for Coding Agents",
        href: "https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html",
        description:
          "A grounded overview of the current context features in coding tools and how to think about prompts, rules, skills, and subagents as a system.",
        tags: [
          "agent workflows",
          "context engineering",
          "multi-agent",
          "tools",
        ],
      },
    ],
  },
  {
    source: "Martin Fowler and James Lewis",
    entries: [
      {
        title: "Microservices",
        href: "https://martinfowler.com/articles/microservices.html",
        description:
          "The classic case for splitting services along independently deployable boundaries, which is still the right default when agent work needs a smaller surface area.",
        tags: ["architecture", "modularity", "teams"],
      },
    ],
  },
  {
    source: "Microsoft Learn",
    entries: [
      {
        title: "Use Test Impact Analysis",
        href: "https://learn.microsoft.com/en-us/azure/devops/pipelines/test/test-impact-analysis?view=azure-devops",
        description:
          "Useful for running only the tests likely to be affected by a change, which is exactly the sort of bounded feedback loop agents need.",
        tags: ["performance", "reliability", "testing"],
      },
    ],
  },
  {
    source: "N. Ajienka",
    entries: [
      {
        title:
          "Managing Hidden Dependencies in OO Software: A Study Based on Open Source Projects",
        href: "https://doi.org/10.1109/ESEM.2017.21",
        description:
          "Useful evidence that hidden dependencies are not theoretical; they show up in real codebases and matter for maintenance.",
        tags: ["architecture", "evaluation", "modularity"],
      },
    ],
  },
  {
    source: "Neal Ford",
    entries: [
      {
        title: "Building Evolutionary Architectures",
        href: "https://www.thoughtworks.com/content/dam/thoughtworks/documents/books/bk_building_evolutionary_architectures_en.pdf",
        description:
          "Good framework for using fitness functions and other checks to let an architecture evolve without losing control.",
        tags: ["architecture", "reliability", "testing"],
      },
    ],
  },
  {
    source: "OpenAI",
    entries: [
      {
        title: "Harness engineering: leveraging Codex in an agent-first world",
        href: "https://openai.com/index/harness-engineering/",
        description:
          "A concrete account of shaping repo structure, docs, and verification so agents can do the bulk work without making the system opaque.",
        tags: ["agent workflows", "documentation", "reliability", "testing"],
      },
    ],
  },
  {
    source: "OpenAI Developers",
    entries: [
      {
        title: "Building an AI-Native Engineering Team",
        href: "https://developers.openai.com/codex/guides/build-ai-native-engineering-team/",
        description:
          "Useful organizational guidance for separating planning, implementation, and testing work so agents fit into the team instead of becoming a side experiment.",
        tags: ["agent workflows", "teams", "testing"],
      },
      {
        title: "Run long-horizon tasks with Codex",
        href: "https://developers.openai.com/blog/run-long-horizon-tasks-with-codex/",
        description:
          "A useful long-run case study on keeping a single session productive for hours through checkpoints, validation, and good status artifacts.",
        tags: ["agent workflows", "reliability", "testing"],
      },
      {
        title: "Build Code Review with the Codex SDK",
        href: "https://developers.openai.com/cookbook/examples/codex/build_code_review_with_codex_sdk",
        description:
          "Shows how to structure Codex for automated review with JSON output and inline PR-comment integration.",
        tags: ["agent workflows", "tools", "testing", "documentation"],
      },
      {
        title: "Testing Agent Skills Systematically with Evals",
        href: "https://developers.openai.com/blog/eval-skills/",
        description:
          "Good guide for turning prompt or skill quality into repeatable checks instead of subjective impressions.",
        tags: ["agent workflows", "evaluation", "testing"],
      },
    ],
  },
  {
    source: "S. Amann",
    entries: [
      {
        title: "A Systematic Evaluation of Static API-Misuse Detectors",
        href: "https://www.computer.org/csdl/journal/ts/2019/12/08338426/13rRUzphDzB",
        description:
          "Useful for understanding where static misuse detectors help and where they still miss enough to require stronger checks.",
        tags: ["evaluation", "reliability", "tools"],
      },
    ],
  },
  {
    source: "Sandi Metz",
    entries: [
      {
        title: "The Wrong Abstraction",
        href: "https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction",
        description:
          "Classic reminder that premature abstraction is often worse than direct code, especially when the variation you are abstracting for has not appeared yet.",
        tags: ["architecture", "modularity"],
      },
    ],
  },
  {
    source: "Software Engineering at Google",
    entries: [
      {
        title: "Chapter 10: Documentation",
        href: "https://abseil.io/resources/swe-book/html/ch10.html",
        description:
          "Useful for thinking about docs as an engineering artifact that agents should be able to rely on and keep in sync.",
        tags: ["documentation", "reliability"],
      },
      {
        title: "Chapter 11: Testing Overview",
        href: "https://abseil.io/resources/swe-book/html/ch11.html",
        description:
          "A broad map of testing as an engineering system, helpful when you need reliable feedback loops for agent-run changes.",
        tags: ["reliability", "testing"],
      },
      {
        title: "Chapter 12: Unit Testing",
        href: "https://abseil.io/resources/swe-book/html/ch12.html",
        description:
          "Good reference for the fastest, most localized form of feedback an agent can get while iterating.",
        tags: ["reliability", "testing"],
      },
      {
        title: "Chapter 17: Code Search",
        href: "https://abseil.io/resources/swe-book/html/ch17.html",
        description:
          "Useful for making large codebases navigable, because searchability is often what lets an agent find the right context at all.",
        tags: ["context engineering", "documentation", "tools"],
      },
    ],
  },
  {
    source: "Thoughtworks",
    entries: [
      {
        title: "Fitness function-driven development",
        href: "https://www.thoughtworks.com/insights/articles/fitness-function-driven-development",
        description:
          "A strong pattern for translating architectural goals into executable checks that run continuously.",
        tags: ["architecture", "reliability", "testing"],
      },
    ],
  },
  {
    source: "W. P. Stevens",
    entries: [
      {
        title: "Structured Design",
        href: "https://dl.acm.org/doi/10.1147/sj.132.0115",
        description:
          "Foundational module-design reading on keeping responsibilities separate and interfaces clean.",
        tags: ["architecture", "modularity"],
      },
    ],
  },
];
