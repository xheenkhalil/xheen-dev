export const site = {
  name: "Moses Thomas",
  wordmark: "Moses",
  domain: "xheen.dev",
  url: "https://xheen.dev",
  title: "Data Scientist & Full Stack Developer",
  tagline: "Developer • Data Engineer • Writer",
  summary:
    "Building data-driven applications and stunning web experiences. Let's turn your complex data into clear insights.",
  pitch:
    "Clients hire me to ship the thing: career platforms, RAG support, storefronts, memberships, and analytics you can run a meeting with. The live work below is the standard — not a concept deck.",
  hero: "You get the live product, not a pitch deck.",
  email: "engrzyfer@gmail.com",
  phone: "+234 8126 554 701",
  location: "Remote / Worldwide",
  github: "https://github.com/xheenkhalil",
  linkedin: "https://www.linkedin.com/in/moses-thomas-61195434a/",
  twitter: "https://twitter.com/xenzyfer2",
  twitterHandle: "@xenzyfer2",
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
    blurb: "Top Rated",
    href: "https://www.upwork.com",
  },
  {
    name: "Fiverr",
    blurb: "Level 2",
    href: "https://www.fiverr.com",
  },
  {
    name: "Jobberman",
    blurb: "Open for Opportunities",
    href: "https://www.jobberman.com",
  },
] as const;

export const services = [
  {
    title: "Career platforms",
    copy: "Intake, matching, documents, and application workflows a job seeker can actually finish — not a chatbot demo.",
  },
  {
    title: "RAG support",
    copy: "Chat that cites the docs you already have. Crawled, chunked, retrieved, and answerable in a real support queue.",
  },
  {
    title: "Storefronts",
    copy: "Headless catalogues, cart, and merchandising without a six-month commerce ceremony.",
  },
  {
    title: "Memberships",
    copy: "Packages, pricing, and a site that sells the next session — not a template with a payment button.",
  },
  {
    title: "Analytics you can present",
    copy: "SQL, models, and dashboards that survive a standup. The artefact is the insight, not the notebook.",
  },
] as const;

export const engagement = [
  {
    step: "01",
    title: "Brief",
    copy: "We agree the job, the stack, and what done looks like before a line of production code. Constraints go on paper, not in a later surprise.",
  },
  {
    step: "02",
    title: "Build",
    copy: "Weekly visible progress on a live URL. You review the product, not a slide that promises one.",
  },
  {
    step: "03",
    title: "Handoff",
    copy: "Repo, runbook, credentials map, and a Friday artefact you can keep running. Ownership transfers; the work does not evaporate.",
  },
] as const;
