import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/data/site";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: `Contact ${site.name} (${site.alias})`,
      description: `Initiate an engineering consultation with ${site.name} (${site.fullName}) regarding software architecture, AI/RAG systems, or full stack execution.`,
      path: "/contact",
      keywords: [
        "Contact Moses Thomas",
        "Contact Xheen",
        "Moses Naantagam Thomas",
        "Xheen Zhyfer",
        "Engineering Inquiries",
      ],
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Direct Engineering Channel
        </p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          Define the Scope
        </h1>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          Submit the problem statement, technical constraints, and target timeline. I evaluate requirements and reply directly with concrete technical feasibility and architecture milestones.
        </p>
        <dl className="mt-8 grid gap-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Phone</dt>
            <dd>
              <a href="tel:+2348126554701">{site.phone}</a>
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Location</dt>
            <dd>{site.location}</dd>
          </div>
        </dl>
      </div>
      <div className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)] sm:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
