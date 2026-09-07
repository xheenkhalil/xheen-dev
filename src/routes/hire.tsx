import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { engagement, platforms, site } from "@/data/site";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/hire")({
  head: () =>
    pageHead({
      title: `Consult & Hire ${site.name} (${site.alias})`,
      description: `Retain ${site.name} (Moses Naantagam Thomas / Xheen Zhyfer) for full stack systems, production AI/RAG architectures, and data engineering.`,
      path: "/hire",
      keywords: [
        "Hire Moses Thomas",
        "Hire Xheen",
        "Hire Xheen Zhyfer",
        "Moses Naantagam Thomas",
        "Full Stack Consultant",
        "AI Systems Architect for Hire",
      ],
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
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        Contracting & Consulting Availability
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
        Retain & Engage Engineering
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
        {site.pitch}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Direct collaboration with <strong>{site.name}</strong> ({site.fullName}, professionally known as <strong>{site.alias}</strong>). Available for advisory, fractional lead engineering, and end-to-end greenfield builds worldwide.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <a href={`mailto:${site.email}`}>
            Direct Email Inquiries
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link to="/contact">Structured Scope Form</Link>
        </Button>
      </div>

      <section className="mt-14">
        <h2 className="font-serif text-2xl tracking-tight">Verified Platforms & Profiles</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Escrow-backed contracts and public client feedback across global platforms.
        </p>
        <div className="mt-6 grid gap-4">
          {platforms.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex min-h-11 items-center justify-between rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)] transition-colors hover:bg-muted"
              rel="noreferrer"
            >
              <span>
                <span className="font-medium text-foreground">{item.name}</span>
                <span className="ml-2 text-sm text-muted-foreground">{item.blurb}</span>
              </span>
              <ArrowUpRight className="size-4" />
            </a>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl tracking-tight">Engineering Engagement Framework</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A disciplined, milestone-driven process from discovery to production deployment.
        </p>
        <div className="mt-6 grid gap-6">
          {engagement.map((item) => (
            <div key={item.step} className="rounded-xl border border-border bg-card p-5">
              <p className="font-mono text-xs tracking-widest text-accent">{item.step}</p>
              <h3 className="mt-2 font-medium text-foreground">{item.title}</h3>
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
