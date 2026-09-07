import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { JsonLd } from "@/components/json-ld";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { latestArticles } from "@/data/articles";
import { featuredProjects } from "@/data/projects";
import { engagement, services, site } from "@/data/site";
import { pageHead, personJsonLd, websiteJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: `${site.name} | ${site.title}`,
      description: site.summary,
      path: "/",
    }),
  component: Home,
});

function Home() {
  const [lead, ...rest] = featuredProjects();
  const articles = latestArticles(3);

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl items-end gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_0.6fr] lg:py-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              {site.title} · {site.location}
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {site.hero}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {site.pitch}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {site.name} — {site.tagline}. {site.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#work">
                  See the work
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/hire">
                  Hire me
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/articles">Read how it was built</Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-xs lg:mx-0 lg:justify-self-end">
            <div className="overflow-hidden rounded-xl bg-card p-1.5 shadow-[var(--shadow-border)]">
              <img
                src={site.photo}
                alt={`${site.name}, ${site.title}`}
                width={480}
                height={600}
                className="aspect-portrait w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {lead ? (
        <section id="work" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Featured case
            </p>
            <div className="mt-6 grid items-start gap-8 lg:grid-cols-2">
              <Link
                to="/projects/$slug"
                params={{ slug: lead.slug }}
                className="overflow-hidden rounded-xl bg-muted shadow-[var(--shadow-border)]"
              >
                {lead.cover ? (
                  <img
                    src={lead.cover}
                    alt={`Live view of ${lead.title}`}
                    className="aspect-wide w-full object-cover object-top"
                  />
                ) : null}
              </Link>
              <div>
                <Badge variant="outline">{lead.category}</Badge>
                <h2 className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl">
                  {lead.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {lead.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {lead.stack.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link to="/projects/$slug" params={{ slug: lead.slug }}>
                      Case notes
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  {lead.liveUrl ? (
                    <Button asChild variant="outline">
                      <a href={lead.liveUrl} target="_blank" rel="noopener noreferrer">
                        Open live site
                        <ArrowUpRight className="size-4" />
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Selected work
            </p>
            <h2 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
              Same hands, different jobs
            </h2>
          </div>
          <Link
            to="/projects"
            className="hidden text-sm font-medium sm:inline-flex sm:items-center sm:gap-1"
          >
            All work
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Engagement
          </p>
          <h2 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
            What working together looks like
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {engagement.map((item) => (
              <div key={item.step}>
                <p className="font-mono text-xs tracking-widest text-accent">
                  {item.step}
                </p>
                <h3 className="mt-3 font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Journal
            </p>
            <h2 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
              How the work is actually made
            </h2>
          </div>
          <Link
            to="/articles"
            className="inline-flex items-center gap-1 text-sm font-medium"
          >
            All articles
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Services
          </p>
          <h2 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
            Four ways in
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((service) => (
              <div key={service.title}>
                <h3 className="font-medium">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
