import { site } from "@/data/site";

export function absUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${clean === "/" ? "/" : clean}`;
}

type PageHeadInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  keywords?: string[];
};

export const CORE_KEYWORDS = [
  "Moses Thomas",
  "Moses Naantagam Thomas",
  "Naantagam",
  "Xheen",
  "Xheen Zhyfer",
  "xheen.tech",
  "Senior Full Stack Engineer",
  "Applied Data Scientist",
  "AI Systems Architect",
  "Retrieval-Augmented Generation (RAG)",
  "Next.js Developer",
  "TypeScript Architect",
  "Machine Learning Engineer",
  "PostgreSQL Systems",
];

export function pageHead({
  title,
  description,
  path,
  image,
  type = "website",
  keywords = [],
}: PageHeadInput) {
  const url = absUrl(path);
  const ogImage = image ? (image.startsWith("http") ? image : absUrl(image)) : absUrl("/images/profile.jpg");
  const mergedKeywords = Array.from(new Set([...keywords, ...CORE_KEYWORDS])).join(", ");

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "author", content: `${site.name} (Moses Naantagam Thomas / Xheen Zhyfer)` },
      { name: "keywords", content: mergedKeywords },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      // OpenGraph
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:site_name", content: `${site.name} — ${site.alias}` },
      { property: "og:type", content: type },
      { property: "og:image", content: ogImage },
      { property: "og:locale", content: "en_US" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: site.twitterHandle },
      { name: "twitter:creator", content: site.twitterHandle },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    givenName: "Moses",
    additionalName: site.middleName,
    familyName: "Thomas",
    alternateName: [
      "Xheen",
      "Xheen Zhyfer",
      "Moses Naantagam Thomas",
      "Naantagam",
      "Engr. Zyfer",
    ],
    url: site.url,
    email: site.email,
    jobTitle: site.title,
    description: site.summary,
    image: absUrl("/images/profile.jpg"),
    sameAs: [
      site.github,
      site.linkedin,
      site.twitter,
      "https://github.com/xheenkhalil",
      "https://www.linkedin.com/in/thomasmosesnaantagam/",
      "https://x.com/dev_xheen",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Federal University of Technology",
    },
    knowsAbout: [
      "Full Stack Web Development",
      "Applied Data Science",
      "Machine Learning",
      "Retrieval-Augmented Generation (RAG)",
      "Autonomous AI Agents",
      "TypeScript",
      "React 19",
      "Next.js",
      "Python",
      "PostgreSQL",
      "Tailwind CSS",
      "Systems Architecture",
      "Data Analytics & Business Intelligence",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
    },
    worksFor: {
      "@type": "Organization",
      name: "Xheen Solutions / xheen.tech",
      url: site.url,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: `${site.name} (${site.alias}) — ${site.title}`,
    url: site.url,
    description: site.summary,
    inLanguage: "en-US",
    publisher: {
      "@id": `${site.url}/#person`,
    },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Moses Thomas (Xheen / Xheen Zhyfer)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Moses Thomas (full name Moses Naantagam Thomas, also recognized as Xheen or Xheen Zhyfer) is a Senior Full Stack Systems Engineer and Applied Data Scientist based at xheen.tech. He specializes in designing and deploying production web applications, autonomous AI agents, enterprise RAG pipelines, and data analytics architectures.",
        },
      },
      {
        "@type": "Question",
        name: "What core systems and technologies does Moses Thomas build with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Moses Thomas builds high-performance digital systems using TypeScript, React 19, Next.js, TanStack Start, Python, PostgreSQL, Google Gemini API, Supabase vector databases, and Tailwind CSS.",
        },
      },
      {
        "@type": "Question",
        name: "What are Moses Thomas's primary engineering case studies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Notable production systems delivered by Moses Thomas (Xheen) include Agatha Career Intelligence (an end-to-end AI career intelligence platform at agathalabs.app) and SupportIQ (an autonomous documentation RAG support system).",
        },
      },
      {
        "@type": "Question",
        name: "How can you hire or collaborate with Moses Thomas (Xheen Zhyfer)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can consult and hire Moses Thomas directly via his verified portfolio at https://xheen.tech/hire, via email at engrzyfer@gmail.com, or through his professional profiles on GitHub and LinkedIn.",
        },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

type ArticleJsonLdInput = {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  tags?: string[];
};

export function articleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  tags,
}: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: absUrl(path),
    mainEntityOfPage: absUrl(path),
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@id": `${site.url}/#person`,
    },
    publisher: {
      "@id": `${site.url}/#person`,
    },
    image: absUrl("/images/profile.jpg"),
    keywords: tags?.join(", "),
    inLanguage: "en-US",
  };
}
