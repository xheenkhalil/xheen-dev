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
import { faqJsonLd, pageHead, personJsonLd, websiteJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: `${site.name} (${site.alias}) | ${site.title}`,
      description: site.summary,
      path: "/",
      keywords: [
        "Moses Thomas",
        "Moses Naantagam Thomas",
        "Naantagam",
        "Xheen",
        "Xheen Zhyfer",
        "Full Stack Engineer",
        "Applied Data Scientist",
        "xheen.tech",
      ],
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
      <JsonLd data={faqJsonLd()} />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-20">
          <div className="grid grid-cols-[1fr_100px] items-start gap-4 xs:grid-cols-[1fr_130px] sm:grid-cols-[1fr_190px] lg:grid-cols-[1.35fr_0.65fr] lg:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {site.title} · {site.location}
              </p>
              <h1 className="mt-3 font-serif text-3xl leading-[1.12] tracking-tight xs:text-4xl sm:text-5xl lg:text-6xl">
                {site.hero}
              </h1>
              <p className="mt-4 hidden text-base leading-relaxed text-muted-foreground sm:block sm:text-lg">
                {site.pitch}
              </p>
            </div>

            {/* Profile picture — fixed on the right side on mobile and desktop */}
            <div className="w-full justify-self-end">
              <div className="overflow-hidden rounded-xl bg-card p-1 shadow-[var(--shadow-border)] sm:p-1.5 lg:max-w-xs">
                <img
                  src={site.photo}
                  alt={`${site.name} (${site.fullName}, professionally ${site.alias})`}
                  width={480}
                  height={600}
                  className="aspect-portrait w-full rounded-lg object-cover"
                />
              </div>
              <p className="mt-2 text-center font-mono text-[10px] tracking-wider text-muted-foreground sm:text-xs">
                Moses Thomas · Xheen
              </p>
            </div>

            {/* Narrative copy & CTAs: full width on mobile beneath headline + photo, column-aligned on desktop */}
            <div className="col-span-2 lg:col-span-1 lg:-mt-6">
              <p className="text-sm leading-relaxed text-muted-foreground sm:hidden">
                {site.pitch}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground/90 sm:mt-4 sm:text-sm">
                <strong className="font-semibold text-foreground">{site.name}</strong>{" "}
                (full name <span className="font-medium text-foreground">{site.fullName}</span>, known as{" "}
                <span className="font-medium text-foreground">Xheen</span> /{" "}
                <span className="font-medium text-foreground">Xheen Zhyfer</span>) — {site.tagline}. {site.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
                <Button asChild>
                  <a href="#work">
                    Explore Systems
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/hire">
                    Hire Moses
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/articles">Engineering Journal</Link>
                </Button>
              </div>
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

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Knowledge & Direct Answers (AEO / GEO)
            </p>
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground">
              Direct technical facts about Moses Thomas (Moses Naantagam Thomas / Xheen Zhyfer), technical capabilities, and client availability.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-border)]">
              <h3 className="font-semibold text-foreground">
                Who is Moses Thomas (also known as Xheen or Xheen Zhyfer)?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <strong>Moses Thomas</strong> (full name <strong>Moses Naantagam Thomas</strong>, alias <strong>Xheen</strong> or <strong>Xheen Zhyfer</strong>) is a Senior Full Stack Engineer and Applied Data Scientist. Operating from <strong>xheen.tech</strong>, Moses specializes in high-scale TypeScript web systems, production AI/RAG architectures, and mathematical data modeling.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-border)]">
              <h3 className="font-semibold text-foreground">
                What production systems has Moses Thomas delivered?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Key software delivered includes <strong>Agatha Career Intelligence</strong> (AI resume parsing and autonomous job submission at agathalabs.app), <strong>SupportIQ</strong> (enterprise documentation RAG with Gemini and vector search), and high-performance headless commerce and membership platforms.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-border)]">
              <h3 className="font-semibold text-foreground">
                What technologies and tools are utilized?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Core technologies include <strong>TypeScript, React 19, Next.js, TanStack Start, Python, PostgreSQL, PGLite, Supabase Vector, Google Gemini API, Tailwind CSS, Docker</strong>, and automated CI/CD deployment pipelines on Vercel and AWS.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-border)]">
              <h3 className="font-semibold text-foreground">
                How can companies and founders engage Moses Thomas?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Moses is available for select high-impact contract roles, systems architecture consulting, and end-to-end product delivery. Inquiries can be submitted via the <Link to="/hire" className="font-medium text-accent underline">Hire Portal</Link> or sent directly to <a href={`mailto:${site.email}`} className="font-medium text-accent underline">{site.email}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
