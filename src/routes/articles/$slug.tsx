import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { getArticle, tagToParam } from "@/data/articles";
import { site } from "@/data/site";
import { extractToc, markdownToHtml } from "@/lib/markdown";
import { articleJsonLd, breadcrumbJsonLd, pageHead } from "@/lib/seo";
import { formatDate, readingMinutes } from "@/lib/utils";

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const article = loaderData?.article;
    if (!article) return {};
    return pageHead({
      title: `${article.title} | ${site.name}`,
      description: article.excerpt,
      path: `/articles/${article.slug}`,
    });
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const html = markdownToHtml(article.body);
  const toc = extractToc(article.body);
  const minutes = readingMinutes(article.body);

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Writing", path: "/articles" },
          { name: article.title, path: `/articles/${article.slug}` },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          path: `/articles/${article.slug}`,
          datePublished: article.date,
          tags: article.tags,
        })}
      />

      <Link
        to="/articles"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All articles
      </Link>

      <p className="mt-8 text-xs uppercase tracking-widest text-muted-foreground">
        {formatDate(article.date)} · {minutes} min read
      </p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
        {article.title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{article.excerpt}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Link key={tag} to="/articles/tags/$tag" params={{ tag: tagToParam(tag) }}>
            <Badge variant="outline">{tag}</Badge>
          </Link>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div
          className="prose-article max-w-2xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {toc.length ? (
          <aside className="hidden lg:block">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              On this page
            </p>
            <ul className="mt-4 grid gap-2 text-sm">
              {toc.map((item) => (
                <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
                  <a href={`#${item.id}`} className="text-muted-foreground hover:text-foreground">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </article>
  );
}
