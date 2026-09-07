import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { engagement, platforms, site } from "@/data/site";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/hire")({
  head: () =>
    pageHead({
      title: `Hire ${site.name}`,
      description: `Hire ${site.name} for data products, RAG systems, and fullstack web apps.`,
      path: "/hire",
    }),
  component: HirePage,
});

function HirePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Hire", path: "/hire" },
        ])}
      />
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Available
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
        Hire me
      </h1>
      <p className="mt-5 leading-relaxed text-muted-foreground">{site.pitch}</p>
      <p className="mt-4 text-sm text-muted-foreground">
        {site.location}. Email {site.email} or {site.phone}.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <a href={`mailto:${site.email}`}>
            Email me
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link to="/contact">Contact form</Link>
        </Button>
      </div>

      <section className="mt-14">
        <h2 className="font-serif text-2xl tracking-tight">Freelance platforms</h2>
        <div className="mt-6 grid gap-4">
          {platforms.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex min-h-11 items-center justify-between rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]"
              rel="noreferrer"
            >
              <span>
                <span className="font-medium">{item.name}</span>
                <span className="ml-2 text-sm text-muted-foreground">{item.blurb}</span>
              </span>
              <ArrowUpRight className="size-4" />
            </a>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl tracking-tight">How we work</h2>
        <div className="mt-6 grid gap-6">
          {engagement.map((item) => (
            <div key={item.step}>
              <p className="font-mono text-xs tracking-widest text-accent">{item.step}</p>
              <h3 className="mt-2 font-medium">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
