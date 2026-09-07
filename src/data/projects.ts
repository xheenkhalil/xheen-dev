import {
  listProjects,
  getProjectBySlug,
  getFeaturedProjects,
  getOtherProjects,
  toPublicProject,
} from "@/lib/api/projects";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: "Product" | "Web" | "Data Analytics" | "Data Science";
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  cover?: string;
  images: string[];
  date: string;
  body: string;
};

export async function getProjects(): Promise<Project[]> {
  const rows = await listProjects();
  return rows.map(toPublicProject);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const row = await getProjectBySlug({ data: slug });
  return row ? toPublicProject(row) : undefined;
}

export async function featuredProjects(): Promise<Project[]> {
  const rows = await getFeaturedProjects();
  return rows.map(toPublicProject);
}

export async function otherProjects(): Promise<Project[]> {
  const rows = await getOtherProjects();
  return rows.map(toPublicProject);
}
