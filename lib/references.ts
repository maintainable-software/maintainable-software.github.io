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
  corePath: boolean;
  learningOrder: number;
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
          "Best starting point on the page for understanding agentic systems. It separates workflows from agents, argues for simple composable patterns, and explains why tools, retrieval, and memory should be added only when the task truly needs them.",
        tags: [
          "agent workflows",
          "context engineering",
          "reliability",
          "tools",
        ],
        corePath: true,
        learningOrder: 3,
      },
      {
        title: "Effective context engineering for AI agents",
        href: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
        description:
          "The clearest explanation here of context as a finite budget that has to be curated every turn. Strong on context rot, high-signal context selection, and the shift from prompt-writing to managing an evolving context state.",
        tags: [
          "agent workflows",
          "context engineering",
          "memory",
          "reliability",
          "retrieval",
        ],
        corePath: true,
        learningOrder: 6,
      },
      {
        title: "Demystifying evals for AI agents",
        href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
        description:
          "A strong guide to moving from ad hoc checks to a real eval program. It covers tasks, trials, graders, and the tradeoffs between deterministic, model-based, and human evaluation for multi-turn agents.",
        tags: ["agent workflows", "evaluation", "reliability", "testing"],
        corePath: true,
        learningOrder: 9,
      },
      {
        title: "Effective harnesses for long-running agents",
        href: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents",
        description:
          "Useful for designing long-running harnesses that keep plans, context, and execution state aligned instead of letting the session drift as work stretches across many steps.",
        tags: [
          "agent workflows",
          "context engineering",
          "reliability",
          "tools",
        ],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Harness design for long-running application development",
        href: "https://www.anthropic.com/engineering/harness-design-long-running-apps",
        description:
          "A practical companion piece on trimming harness bulk while still preserving the context, checkpoints, and controls that keep long-running development runs reliable.",
        tags: [
          "agent workflows",
          "context engineering",
          "reliability",
          "tools",
        ],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "How we built our multi-agent research system",
        href: "https://www.anthropic.com/engineering/multi-agent-research-system",
        description:
          "Best advanced multi-agent case study on the page: split broad research across specialist agents, preserve plan checkpoints, and keep citations attached as the work is merged back together.",
        tags: [
          "agent workflows",
          "context engineering",
          "multi-agent",
          "reliability",
        ],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Introducing Contextual Retrieval",
        href: "https://www.anthropic.com/news/contextual-retrieval",
        description:
          "Concrete retrieval technique for attaching enough surrounding meaning to a chunk before indexing it, which improves recall later without turning retrieval into raw keyword matching.",
        tags: ["context engineering", "memory", "retrieval"],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Our framework for developing safe and trustworthy agents",
        href: "https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents",
        description:
          "Useful for the non-happy-path side of autonomy: oversight, privacy, security, and deployment controls for agents that retrieve information or trigger actions.",
        tags: ["agent workflows", "reliability", "safety"],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Writing effective tools for agents - with agents",
        href: "https://www.anthropic.com/engineering/writing-tools-for-agents",
        description:
          "One of the highest-ROI reads once you move past the intro material. It treats tool design as an interface problem: prototype the tool, improve names and outputs, then evaluate and iterate until the agent uses it well.",
        tags: ["agent workflows", "documentation", "evaluation", "tools"],
        corePath: true,
        learningOrder: 5,
      },
      {
        title: "Best Practices for Claude Code",
        href: "https://www.anthropic.com/engineering/claude-code-best-practices",
        description:
          "Operational guidance for running Claude Code in structured loops, with strong emphasis on context boundaries, iterative verification, and keeping planning separate from implementation work.",
        tags: ["agent workflows", "documentation", "testing", "tools"],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "How Anthropic teams use Claude Code",
        href: "https://www.anthropic.com/engineering/how-anthropic-teams-use-claude-code",
        description:
          "A practical look at human review loops where the agent drives specs, tests, and edits, which makes it useful for designing team-level operating habits around coding agents.",
        tags: [
          "agent workflows",
          "context engineering",
          "reliability",
          "teams",
          "testing",
        ],
        corePath: false,
        learningOrder: 1,
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
          "A dense terminal-agent paper on scaffolding, compaction, memory, verification, and the other mechanics needed for long-running command-line work.",
        tags: [
          "agent workflows",
          "context engineering",
          "memory",
          "reliability",
          "testing",
          "tools",
        ],
        corePath: false,
        learningOrder: 1,
      },
      {
        title:
          "Theory of Code Space: Do Code Agents Understand Software Architecture?",
        href: "https://arxiv.org/html/2603.00601v4",
        description:
          "Useful for understanding whether an agent can build and maintain a real map of architecture, not just make local edits.",
        tags: ["agent workflows", "architecture", "modularity"],
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
      },
    ],
  },
  {
    source: "Birgitta Böckeler",
    entries: [
      {
        title: "Harness engineering for coding agent users",
        href: "https://martinfowler.com/articles/harness-engineering.html",
        description:
          "Strong operational framing for coding agents: the harness is not just plumbing but the system that provides steering loops, maintainability checks, architecture fitness checks, and behavior feedback.",
        tags: ["agent workflows", "architecture", "reliability", "testing"],
        corePath: true,
        learningOrder: 10,
      },
      {
        title: "How far can we push AI autonomy in code generation?",
        href: "https://martinfowler.com/articles/pushing-ai-autonomy.html",
        description:
          "A useful closing corrective. It documents how autonomous coding loops overreach, rationalize failing tests, and invent extra behavior, which makes it a good final chapter on where supervision still matters.",
        tags: ["agent workflows", "evaluation", "reliability", "testing"],
        corePath: true,
        learningOrder: 12,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "How Cognition Uses Devin to Build Devin",
        href: "https://cognition.ai/blog/how-cognition-uses-devin-to-build-devin",
        description:
          "Interesting because it shows an agent being used inside the product loop, exposing where automation helps and where human steering still matters.",
        tags: ["agent workflows", "reliability", "teams"],
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Gherkin Reference",
        href: "https://cucumber.io/docs/gherkin/reference/",
        description:
          "Worth keeping nearby when you want scenarios to stay precise enough to drive tests, documentation, or agent checks.",
        tags: ["documentation", "testing"],
        corePath: false,
        learningOrder: 1,
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
          "Still the clearest foundation for the whole page: modularize around design decisions that are likely to change, so changes stay local and both humans and agents can work without carrying the entire system in their heads.",
        tags: ["architecture", "modularity"],
        corePath: true,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
          "A concrete memory chapter for coding agents: store repository-scoped facts with citations, verify them just in time before reuse, and let memories self-heal instead of turning stale notes into permanent steering errors.",
        tags: ["agent workflows", "memory", "reliability", "retrieval"],
        corePath: true,
        learningOrder: 7,
      },
      {
        title:
          "How to build reliable AI workflows with agentic primitives and context engineering",
        href: "https://github.blog/ai-and-ml/github-copilot/how-to-build-reliable-ai-workflows-with-agentic-primitives-and-context-engineering/?utm_campaign=agentic-copilot-cli-launch-2025&utm_source=blog-release-oct-2025",
        description:
          "Strong practical guide to splitting planning, implementation, and testing into separate sessions, then loading only the context and tools each phase actually needs.",
        tags: [
          "agent workflows",
          "context engineering",
          "reliability",
          "testing",
          "tools",
        ],
        corePath: false,
        learningOrder: 1,
      },
      {
        title:
          "Spec-driven development with AI: Get started with a new open source toolkit",
        href: "https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/",
        description:
          "A four-phase loop (Specify, Plan, Tasks, Implement) that turns human intent into durable artifacts before the agent starts making code changes.",
        tags: [
          "agent workflows",
          "context engineering",
          "documentation",
          "testing",
          "tools",
        ],
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
          "A strong second chapter after Parnas because it translates modularity into day-to-day judgment: keep modules deep, reduce interface surface area, and treat complexity as the primary thing to manage.",
        tags: ["architecture", "modularity"],
        corePath: true,
        learningOrder: 2,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
      },
      {
        title: 'The rise of "context engineering"',
        href: "https://blog.langchain.com/the-rise-of-context-engineering/",
        description:
          "A concise explanation of why context quality, structure, and format matter more than clever wording once systems become dynamic.",
        tags: ["agent workflows", "context engineering"],
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Branch By Abstraction",
        href: "https://martinfowler.com/bliki/BranchByAbstraction.html",
        description:
          "A practical migration pattern when you need to replace behavior gradually without freezing the rest of the system.",
        tags: ["architecture", "migration", "modularity"],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Conway's Law",
        href: "https://martinfowler.com/bliki/ConwaysLaw.html",
        description:
          "A reminder that team structure leaks into architecture, which matters when agent workflows mirror org boundaries.",
        tags: ["architecture", "teams"],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Flag Argument",
        href: "https://martinfowler.com/bliki/FlagArgument.html",
        description:
          "Useful warning about APIs that hide multiple behaviors behind one parameter and become hard for agents to use correctly.",
        tags: ["modularity", "tools"],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Humans and Agents in Software Engineering Loops",
        href: "https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html",
        description:
          "Best read here for the distinction between the why loop and the how loop, and for why the surrounding harness deserves as much attention as the model itself.",
        tags: ["agent workflows", "architecture", "reliability", "teams"],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Linking Modular Architecture to Development Teams",
        href: "https://martinfowler.com/articles/linking-modular-arch.html",
        description:
          "Shows that modularity only pays off when the team structure and developer experience support the boundaries.",
        tags: ["architecture", "modularity", "teams"],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Patterns of Legacy Displacement",
        href: "https://martinfowler.com/articles/patterns-legacy-displacement/",
        description:
          "Very practical for replacing old systems in stages instead of turning modernization into a risky big-bang rewrite.",
        tags: ["architecture", "migration"],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Test Pyramid",
        href: "https://martinfowler.com/bliki/TestPyramid.html",
        description:
          "Still one of the cleanest heuristics for placing verification where it is cheapest and most informative.",
        tags: ["reliability", "testing"],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Yet Another Optimization Article",
        href: "https://www.martinfowler.com/ieeeSoftware/yetOptimization.pdf",
        description:
          "A good antidote to speculative tuning, especially when an agent or engineer starts optimizing before the bottleneck is real.",
        tags: ["performance"],
        corePath: false,
        learningOrder: 1,
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
          "A grounded overview of current context features in coding tools, and how to think about prompts, rules, skills, and subagents as one context system instead of disconnected knobs.",
        tags: [
          "agent workflows",
          "context engineering",
          "multi-agent",
          "reliability",
          "tools",
        ],
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
      },
    ],
  },
  {
    source: "OpenAI",
    entries: [
      {
        title: "A practical guide to building agents",
        href: "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/",
        description:
          "The best OpenAI companion to Anthropic's overview. It connects model choice, instructions, tools, guardrails, and orchestration patterns, while arguing that a capable single agent should be exhausted before splitting into multiple specialists.",
        tags: [
          "agent workflows",
          "multi-agent",
          "reliability",
          "safety",
          "tools",
        ],
        corePath: true,
        learningOrder: 4,
      },
      {
        title: "Harness engineering: leveraging Codex in an agent-first world",
        href: "https://openai.com/index/harness-engineering/",
        description:
          "A concrete account of shaping repo structure, docs, and verification so the harness gives agents room to work without making the system or decision trail opaque.",
        tags: ["agent workflows", "documentation", "reliability", "testing"],
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Run long-horizon tasks with Codex",
        href: "https://developers.openai.com/blog/run-long-horizon-tasks-with-codex/",
        description:
          "A useful long-run case study on keeping a single session productive for hours through checkpoints, validation, and status artifacts that preserve context as the task evolves.",
        tags: [
          "agent workflows",
          "context engineering",
          "reliability",
          "testing",
        ],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Build Code Review with the Codex SDK",
        href: "https://developers.openai.com/cookbook/examples/codex/build_code_review_with_codex_sdk",
        description:
          "Shows how to structure Codex for automated review with JSON output, deterministic review structure, and inline PR-comment integration.",
        tags: [
          "agent workflows",
          "documentation",
          "reliability",
          "testing",
          "tools",
        ],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Guardrails and human review",
        href: "https://developers.openai.com/api/docs/guides/agents/guardrails-approvals",
        description:
          "A compact operational guide to approval surfaces. Useful for deciding which checks should be automatic, where runs should pause for review, and how to separate validation from human authorization.",
        tags: ["agent workflows", "reliability", "safety", "tools"],
        corePath: true,
        learningOrder: 8,
      },
      {
        title: "Testing Agent Skills Systematically with Evals",
        href: "https://developers.openai.com/blog/eval-skills/",
        description:
          "Good guide for turning prompt or skill quality into repeatable checks instead of subjective impressions, especially when skills evolve over time.",
        tags: ["agent workflows", "evaluation", "reliability", "testing"],
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
      },
    ],
  },
  {
    source: "Simon Willison",
    entries: [
      {
        title: "Agentic Engineering Patterns",
        href: "https://simonwillison.net/guides/agentic-engineering-patterns/",
        description:
          "Best practical handbook here for day-to-day coding-agent work. It collects habits, anti-patterns, subagent use, and testing loops that make the rest of the theory usable in real repositories.",
        tags: [
          "agent workflows",
          "multi-agent",
          "reliability",
          "testing",
          "tools",
        ],
        corePath: true,
        learningOrder: 11,
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
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Chapter 11: Testing Overview",
        href: "https://abseil.io/resources/swe-book/html/ch11.html",
        description:
          "A broad map of testing as an engineering system, helpful when you need reliable feedback loops for agent-run changes.",
        tags: ["reliability", "testing"],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Chapter 12: Unit Testing",
        href: "https://abseil.io/resources/swe-book/html/ch12.html",
        description:
          "Good reference for the fastest, most localized form of feedback an agent can get while iterating.",
        tags: ["reliability", "testing"],
        corePath: false,
        learningOrder: 1,
      },
      {
        title: "Chapter 17: Code Search",
        href: "https://abseil.io/resources/swe-book/html/ch17.html",
        description:
          "Useful for making large codebases navigable, because searchability is often what lets an agent find the right context at all.",
        tags: ["context engineering", "documentation", "tools"],
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
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
        corePath: false,
        learningOrder: 1,
      },
    ],
  },
];
