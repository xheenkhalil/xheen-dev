/**
 * Projects CRUD — server functions for the admin CMS and public site.
 */
import { createServerFn } from "@tanstack/react-start";
import { eq, desc, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/drizzle";
import { projects } from "@/lib/db/schema";
import type { ProjectRow } from "@/lib/db/schema";
import { projectSchema } from "./schemas";
import { requireAdmin } from "./admin-auth";

// ---------------------------------------------------------------------------
// Public reads
// ---------------------------------------------------------------------------
export const listProjects = createServerFn({ method: "GET" }).handler(
  async () => {
    const db = await getDb();
    return db.select().from(projects).orderBy(desc(projects.date));
  },
);

export const getProjectBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const db = await getDb();
    const [row] = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug))
      .limit(1);
    return row ?? null;
  });

export const getFeaturedProjects = createServerFn({ method: "GET" }).handler(
  async () => {
    const db = await getDb();
    return db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .orderBy(desc(projects.date));
  },
);

export const getOtherProjects = createServerFn({ method: "GET" }).handler(
  async () => {
    const db = await getDb();
    return db
      .select()
      .from(projects)
      .where(eq(projects.featured, false))
      .orderBy(desc(projects.date));
  },
);

// ---------------------------------------------------------------------------
// Admin mutations
// ---------------------------------------------------------------------------
export const getProjectById = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    await requireAdmin();
    const db = await getDb();
    const [row] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);
    return row ?? null;
  });

export const createProject = createServerFn({ method: "POST" })
  .validator(projectSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await getDb();
    const [row] = await db
      .insert(projects)
      .values({
        slug: data.slug,
        title: data.title,
        summary: data.summary,
        category: data.category,
        stack: data.stack,
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        featured: data.featured,
        cover: data.cover || null,
        images: data.images,
        date: data.date,
        body: data.body,
      })
      .returning();
    return row;
  });

export const updateProject = createServerFn({ method: "POST" })
  .validator(
    (input: { id: string; data: Record<string, unknown> }) => input,
  )
  .handler(async ({ data: { id, data } }) => {
    await requireAdmin();
    const parsed = projectSchema.parse(data);
    const db = await getDb();
    const [row] = await db
      .update(projects)
      .set({
        slug: parsed.slug,
        title: parsed.title,
        summary: parsed.summary,
        category: parsed.category,
        stack: parsed.stack,
        liveUrl: parsed.liveUrl || null,
        githubUrl: parsed.githubUrl || null,
        featured: parsed.featured,
        cover: parsed.cover || null,
        images: parsed.images,
        date: parsed.date,
        body: parsed.body,
        updatedAt: sql`now()`,
      })
      .where(eq(projects.id, id))
      .returning();
    return row;
  });

export const deleteProject = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    await requireAdmin();
    const db = await getDb();
    await db.delete(projects).where(eq(projects.id, id));
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// Type helper — map DB row → public Project shape
// ---------------------------------------------------------------------------
export function toPublicProject(row: ProjectRow) {
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    category: row.category as "Product" | "Web" | "Data Analytics" | "Data Science",
    stack: row.stack,
    liveUrl: row.liveUrl ?? undefined,
    githubUrl: row.githubUrl ?? undefined,
    featured: row.featured,
    cover: row.cover ?? undefined,
    images: row.images,
    date: row.date,
    body: row.body,
  };
}
