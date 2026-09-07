import shippingAgatha from "@/content/articles/shipping-agatha-career-intelligence.md?raw";
import ragChatbots from "@/content/articles/rag-chatbots-that-cite-the-docs.md?raw";
import sqlStandup from "@/content/articles/sql-that-survives-a-standup.md?raw";
import headlessCommerce from "@/content/articles/headless-commerce-without-the-theatre.md?raw";
import fridayHandoff from "@/content/articles/what-i-hand-a-client-on-friday.md?raw";
import notesIdentity from "@/content/articles/notes-from-a-data-scientist-who-also-ships-the-site.md?raw";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  body: string;
};

export const articles: Article[] = [
  {
    slug: "shipping-agatha-career-intelligence",
    title: "Shipping Agatha Career Intelligence",
    excerpt:
      "How I built a career platform that parses a CV, matches roles, rewrites documents, and can apply — without turning the model into the product.",
    date: "2026-08-18",
    tags: ["Next.js", "TypeScript", "Career", "Product", "AI"],
    body: shippingAgatha,
  },
  {
    slug: "rag-chatbots-that-cite-the-docs",
    title: "RAG chatbots that cite the docs",
    excerpt:
      "SupportIQ’s retrieval loop: crawl with Firecrawl, embed in Supabase, generate with Gemini, and refuse to answer without a source.",
    date: "2026-07-12",
    tags: ["RAG", "Next.js", "Product", "TypeScript"],
    body: ragChatbots,
  },
  {
    slug: "sql-that-survives-a-standup",
    title: "SQL that survives a standup",
    excerpt:
      "Grain, denominators, and a recommendation you can still defend after lunch — the analytics practice behind the Amazon, Walmart, and Spotify work.",
    date: "2026-06-04",
    tags: ["SQL", "Analytics", "Product"],
    body: sqlStandup,
  },
  {
    slug: "headless-commerce-without-the-theatre",
    title: "Headless commerce without the theatre",
    excerpt:
      "Velo is four screens, a Sanity desk, and a cart that adds. How I ship a storefront without a six-month replatform.",
    date: "2026-04-21",
    tags: ["Next.js", "TypeScript", "Product"],
    body: headlessCommerce,
  },
  {
    slug: "what-i-hand-a-client-on-friday",
    title: "What I hand a client on Friday",
    excerpt:
      "Brief, Build, Handoff — the engagement as a folder: URLs, runbook, credentials map, and the brief marked done.",
    date: "2026-03-11",
    tags: ["Product", "Career"],
    body: fridayHandoff,
  },
  {
    slug: "notes-from-a-data-scientist-who-also-ships-the-site",
    title: "Notes from a data scientist who also ships the site",
    excerpt:
      "I declined the lane. SQL, Next.js, and a Friday URL are the same job from different ends.",
    date: "2026-01-26",
    tags: ["TypeScript", "SQL", "Product", "Career"],
    body: notesIdentity,
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function latestArticles(count = 3) {
  return articles.slice(0, count);
}

export function articlesByTag(tag: string) {
  const needle = tag.toLowerCase();
  return articles.filter((article) =>
    article.tags.some((item) => item.toLowerCase() === needle),
  );
}

export function allTags(): string[] {
  return [...new Set(articles.flatMap((article) => article.tags))].sort();
}

export function tagToParam(tag: string) {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

export function paramToTag(param: string) {
  const needle = param.toLowerCase();
  return (
    allTags().find((tag) => tagToParam(tag) === needle) ??
    param.replace(/-/g, " ")
  );
}
