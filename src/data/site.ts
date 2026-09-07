export const site = {
  name: "Moses Thomas",
  fullName: "Moses Naantagam Thomas",
  middleName: "Naantagam",
  nicknames: ["Xheen", "Xheen Zhyfer"],
  alias: "Xheen (Xheen Zhyfer)",
  wordmark: "Moses",
  domain: "xheen.tech",
  url: "https://xheen.tech",
  title: "Senior Full Stack Engineer & Applied Data Scientist",
  tagline: "Full-Stack Architecture • Production AI & RAG • Data Intelligence",
  summary:
    "Moses Thomas (Moses Naantagam Thomas, professionally known as Xheen or Xheen Zhyfer) is a Senior Full Stack Engineer and Applied Data Scientist engineering high-performance web platforms, production AI/RAG architectures, and data-driven systems.",
  pitch:
    "I architect, build, and deploy production software: enterprise-scale web applications, autonomous AI agents, verified RAG pipelines, and operational analytics. No conceptual slide decks — every engagement yields battle-tested software running on live infrastructure.",
  hero: "Production Systems Engineered to Scale. Delivered to Live Infrastructure.",
  email: "engrzyfer@gmail.com",
  phone: "+234 8126 554 701",
  location: "Remote / Worldwide",
  github: "https://github.com/xheenkhalil",
  linkedin: "https://www.linkedin.com/in/thomasmosesnaantagam/",
  twitter: "https://x.com/dev_xheen",
  twitterHandle: "@dev_xheen",
  photo: "/images/profile.jpg",
} as const;

export const nav = [
  { href: "/projects", label: "Work" },
  { href: "/articles", label: "Writing" },
  { href: "/resume", label: "Expertise" },
  { href: "/contact", label: "Contact" },
] as const;

export const platforms = [
  {
    name: "Upwork",
    blurb: "Top Rated Full Stack & AI Specialist",
    href: "https://www.upwork.com",
  },
  {
    name: "Fiverr",
    blurb: "Pro & Level 2 Solutions Engineer",
    href: "https://www.fiverr.com",
  },
  {
    name: "GitHub",
    blurb: "Open Source Systems & Repositories",
    href: "https://github.com/xheenkhalil",
  },
] as const;

export const services = [
  {
    title: "Enterprise Web Architecture",
    copy: "High-concurrency web applications built with TypeScript, React 19, Next.js, and modern distributed backends engineered for resilience, accessibility, and sub-second latency.",
  },
  {
    title: "Production AI & Enterprise RAG",
    copy: "Grounded retrieval-augmented generation (RAG) and autonomous agent workflows. Ingestion pipelines, vector embeddings, and strict source citation systems designed for real support and enterprise search.",
  },
  {
    title: "Headless Commerce & Digital Products",
    copy: "Custom storefronts, transactional engines, and dynamic membership portals with headless CMS backends and automated payment flows.",
  },
  {
    title: "Applied Data Science & Analytics",
    copy: "Production ML pipelines, statistical modeling, and automated data pipelines. Actionable SQL schemas and executive dashboards built to inform boardroom decisions.",
  },
  {
    title: "Systems Auditing & Infrastructure",
    copy: "Architectural reviews, database performance optimization, CI/CD automation, and operational runbooks that guarantee clean client handoff and ongoing reliability.",
  },
] as const;

export const engagement = [
  {
    step: "01",
    title: "Architecture & Scope Brief",
    copy: "We define precise technical constraints, system requirements, tech stack, and verifiable deliverables before writing production code. Clear milestones, no scope surprises.",
  },
  {
    step: "02",
    title: "Iterative Build & Staging",
    copy: "Continuous delivery with weekly preview deployments to live URLs. You inspect functioning software and review pull requests, not conceptual status slides.",
  },
  {
    step: "03",
    title: "Production Delivery & Handoff",
    copy: "Complete ownership transfer: audited codebase, comprehensive documentation, environment secrets map, and automated test suites that ensure perpetual maintainability.",
  },
] as const;
