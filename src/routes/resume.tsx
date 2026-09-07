import { createFileRoute } from "@tanstack/react-router";
import { JsonLd } from "@/components/json-ld";
import {
  certifications,
  education,
  experience,
  resumeOverview,
  skillGroups,
} from "@/data/resume";
import { site } from "@/data/site";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/resume")({
  head: () =>
    pageHead({
      title: `Curriculum Vitae | ${site.name} (${site.alias})`,
      description: resumeOverview.body,
      path: "/resume",
      keywords: [
        "Moses Thomas CV",
        "Moses Naantagam Thomas Resume",
        "Xheen Zhyfer",
        "Full Stack Engineer CV",
        "Applied Data Scientist Experience",
      ],
    }),
  component: ResumePage,
});

function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Expertise", path: "/resume" },
        ])}
      />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {resumeOverview.kicker}
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
        {site.name}
      </h1>
      <p className="mt-1 font-mono text-sm text-muted-foreground">
        Full Name: <span className="text-foreground">{site.fullName}</span> · Alias: <span className="text-foreground">{site.alias}</span>
      </p>
      <p className="mt-2 text-accent font-medium">{site.title}</p>
      <p className="mt-6 leading-relaxed text-muted-foreground">{resumeOverview.body}</p>

      <section className="mt-12">
        <h2 className="font-serif text-2xl tracking-tight">Experience</h2>
        <div className="mt-6 grid gap-8">
          {experience.map((item) => (
            <div key={item.role}>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {item.year}
              </p>
              <h3 className="mt-1 font-medium">{item.role}</h3>
              <p className="text-sm text-accent">{item.company}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl tracking-tight">Education</h2>
        <div className="mt-6 grid gap-8">
          {education.map((item) => (
            <div key={item.degree}>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {item.year}
              </p>
              <h3 className="mt-1 font-medium">{item.degree}</h3>
              <p className="text-sm text-accent">{item.school}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl tracking-tight">Certifications</h2>
        <div className="mt-6 grid gap-4">
          {certifications.map((item) => (
            <p key={item.name} className="text-sm">
              <span className="font-medium">{item.name}</span>
              <span className="text-muted-foreground">
                {" "}
                · {item.issuer} · {item.year}
              </span>
            </p>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl tracking-tight">Skills</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-medium">{group.title}</h3>
              <ul className="mt-3 grid gap-1 text-sm text-muted-foreground">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
