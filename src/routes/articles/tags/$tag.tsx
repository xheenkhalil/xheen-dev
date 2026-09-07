import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { JsonLd } from "@/components/json-ld";
import { articlesByTag, paramToTag } from "@/data/articles";
import { site } from "@/data/site";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/articles/tags/$tag")({
  loader: ({ params }) => {
    const tag = paramToTag(params.tag);
    return { tag, articles: articlesByTag(tag) };
  },
  head: ({ loaderData }) => {
    const tag = loaderData?.tag ?? "Tag";
    return pageHead({
      title: `${tag} | Writing | ${site.name}`,
      description: `Articles tagged ${tag} by ${site.name}.`,
      path: `/articles/tags/${loaderData ? encodeURIComponent(loaderData.tag.toLowerCase().replace(/\s+/g, "-")) : ""}`,
    });
  },
  component: TagPage,
});

function TagPage() {
  const { tag, articles } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Writing", path: "/articles" },
          { name: tag, path: `/articles/tags/${tag.toLowerCase().replace(/\s+/g, "-")}` },
        ])}
      />
      <Link
        to="/articles"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All articles
      </Link>
      <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Tag
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">{tag}</h1>
      <p className="mt-4 text-muted-foreground">
        {articles.length} {articles.length === 1 ? "article" : "articles"}
      </p>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
