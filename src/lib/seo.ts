import { site } from "@/data/site";

export function absUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${clean === "/" ? "/" : clean}`;
}

type PageHeadInput = {
  title: string;
  description: string;
  path: string;
};

export function pageHead({ title, description, path }: PageHeadInput) {
  const url = absUrl(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "author", content: site.name },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: site.email,
    jobTitle: site.title,
    description: site.summary,
    image: absUrl("/images/profile.jpg"),
    sameAs: [site.github, site.linkedin, site.twitter],
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
    },
    worksFor: {
      "@type": "Organization",
      name: "xheen.dev",
      url: site.url,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.name} — ${site.title}`,
    url: site.url,
    description: site.summary,
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
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
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    image: absUrl("/images/profile.jpg"),
    keywords: tags?.join(", "),
    inLanguage: "en",
  };
}
