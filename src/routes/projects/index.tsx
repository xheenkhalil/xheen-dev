import { createFileRoute } from "@tanstack/react-router";
import { JsonLd } from "@/components/json-ld";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/data/projects";
import { site } from "@/data/site";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/projects/")({
  loader: async () => {
    const projects = await getProjects();
    return { projects };
  },
  head: () =>
    pageHead({
      title: `Projects | ${site.name}`,
      description: `Selected product, web, and data work by ${site.name}.`,
      path: "/projects",
    }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { projects } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Work
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
        Projects
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Live products, storefronts, and analytics. The screenshots are the real
        sites, not mockups.
      </p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
