import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { extractToc, markdownToHtml } from "@/lib/markdown";
import { absUrl, breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;
    if (!project) return {};
    return pageHead({
      title: `${project.title} | ${site.name}`,
      description: project.summary,
      path: `/projects/${project.slug}`,
    });
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const html = markdownToHtml(project.body);
  const toc = extractToc(project.body);
  const others = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          url: absUrl(`/projects/${project.slug}`),
          author: { "@type": "Person", name: site.name, url: site.url },
          keywords: project.stack.join(", "),
        }}
      />

      <Link
        to="/projects"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All work
      </Link>

      <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {project.category}
      </p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {project.summary}
      </p>

      {project.cover ? (
        <div className="mt-8 overflow-hidden rounded-xl bg-muted shadow-[var(--shadow-border)]">
          <img
            src={project.cover}
            alt={`Live view of ${project.title}`}
            className="aspect-wide w-full object-cover object-top"
          />
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {project.liveUrl ? (
          <Button asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live site
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        ) : null}
        {project.githubUrl ? (
          <Button asChild variant="outline">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="size-4" />
              Source
            </a>
          </Button>
        ) : null}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div
          className="prose-article"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {toc.length ? (
          <aside className="hidden lg:block">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              On this page
            </p>
            <ul className="mt-4 grid gap-2 text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-muted-foreground hover:text-foreground">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>

      <section className="mt-20 border-t border-border pt-12">
        <h2 className="font-serif text-2xl tracking-tight">More work</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {others.map((item) => (
            <ProjectCard key={item.slug} project={item} />
          ))}
        </div>
      </section>
    </article>
  );
}
