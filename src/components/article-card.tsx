import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/data/articles";
import { tagToParam } from "@/data/articles";
import { formatDate, readingMinutes } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  const minutes = readingMinutes(article.body);

  return (
    <article className="flex h-full flex-col border-t border-border pt-6">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        {formatDate(article.date)} · {minutes} min read
      </p>
      <h3 className="mt-3 font-serif text-2xl leading-snug tracking-tight">
        <Link
          to="/articles/$slug"
          params={{ slug: article.slug }}
          className="hover:text-accent"
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {article.excerpt}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Link
            key={tag}
            to="/articles/tags/$tag"
            params={{ tag: tagToParam(tag) }}
          >
            <Badge variant="outline">{tag}</Badge>
          </Link>
        ))}
      </div>
    </article>
  );
}
