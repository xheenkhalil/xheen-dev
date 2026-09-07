import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-border-hover)]">
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        className="block overflow-hidden bg-muted"
      >
        {project.cover ? (
          <img
            src={project.cover}
            alt=""
            className="aspect-wide w-full object-cover object-top"
          />
        ) : (
          <div className="aspect-wide flex items-end p-5">
            <p className="font-serif text-2xl leading-tight tracking-tight">
              {project.title}
            </p>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="outline">{project.category}</Badge>
          <span className="text-xs text-muted-foreground">{project.stack[0]}</span>
        </div>
        <h3 className="mt-4 font-serif text-2xl leading-snug tracking-tight">
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="transition-colors hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 3).map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          className="mt-5 inline-flex min-h-11 items-center gap-1 text-sm font-medium"
        >
          Case notes
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
