import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleCard } from "@/components/article-card";
import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { allTags, getArticles, tagToParam } from "@/data/articles";
import { site } from "@/data/site";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/articles/")({
  loader: async () => {
    const tags = await allTags();
    const articles = await getArticles();
    return { tags, articles };
  },
  head: () =>
    pageHead({
      title: `Writing | ${site.name}`,
      description: `Notes on shipping data products, RAG systems, and fullstack apps — by ${site.name}.`,
      path: "/articles",
    }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const { tags, articles } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Writing", path: "/articles" },
        ])}
      />
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Journal
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
        Writing
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Build notes from live work — how Agatha, SupportIQ, and the analytics
        jobs were actually made.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link key={tag} to="/articles/tags/$tag" params={{ tag: tagToParam(tag) }}>
            <Badge variant="outline">{tag}</Badge>
          </Link>
        ))}
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
