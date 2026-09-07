/**
 * Articles CRUD — server functions for the admin CMS and public site.
 */
import { createServerFn } from "@tanstack/react-start";
import { eq, desc, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/drizzle";
import { articles } from "@/lib/db/schema";
import type { ArticleRow } from "@/lib/db/schema";
import { articleSchema } from "./schemas";
import { requireAdmin } from "./admin-auth";

// ---------------------------------------------------------------------------
// Public reads
// ---------------------------------------------------------------------------
export const listArticles = createServerFn({ method: "GET" }).handler(
  async () => {
    const db = await getDb();
    return db
      .select()
      .from(articles)
      .where(eq(articles.published, true))
      .orderBy(desc(articles.date));
  },
);

export const listAllArticles = createServerFn({ method: "GET" }).handler(
  async () => {
    await requireAdmin();
    const db = await getDb();
    return db.select().from(articles).orderBy(desc(articles.date));
  },
);

export const getArticleBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const db = await getDb();
    const [row] = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1);
    return row ?? null;
  });

export const getLatestArticles = createServerFn({ method: "GET" })
  .validator((count: number) => count)
  .handler(async ({ data: count }) => {
    const db = await getDb();
    return db
      .select()
      .from(articles)
      .where(eq(articles.published, true))
      .orderBy(desc(articles.date))
      .limit(count);
  });

export const getArticlesByTag = createServerFn({ method: "GET" })
  .validator((tag: string) => tag)
  .handler(async ({ data: tag }) => {
    const db = await getDb();
    // Use array contains operator for tag filtering
    const rows = await db
      .select()
      .from(articles)
      .where(eq(articles.published, true))
      .orderBy(desc(articles.date));
    // Filter in JS for case-insensitive tag matching (same as the old static function)
    const needle = tag.toLowerCase();
    return rows.filter((r) =>
      r.tags.some((t) => t.toLowerCase() === needle),
    );
  });

export const getAllTags = createServerFn({ method: "GET" }).handler(
  async () => {
    const db = await getDb();
    const rows = await db
      .select({ tags: articles.tags })
      .from(articles)
      .where(eq(articles.published, true));
    const tagSet = new Set<string>();
    for (const row of rows) {
      for (const tag of row.tags) tagSet.add(tag);
    }
    return [...tagSet].sort();
  },
);

// ---------------------------------------------------------------------------
// Admin mutations
// ---------------------------------------------------------------------------
export const getArticleById = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    await requireAdmin();
    const db = await getDb();
    const [row] = await db
      .select()
      .from(articles)
      .where(eq(articles.id, id))
      .limit(1);
    return row ?? null;
  });

export const createArticle = createServerFn({ method: "POST" })
  .validator(articleSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    const db = await getDb();
    const [row] = await db
      .insert(articles)
      .values({
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        tags: data.tags,
        body: data.body,
        published: data.published,
      })
      .returning();
    return row;
  });

export const updateArticle = createServerFn({ method: "POST" })
  .validator(
    (input: { id: string; data: Record<string, unknown> }) => input,
  )
  .handler(async ({ data: { id, data } }) => {
    await requireAdmin();
    const parsed = articleSchema.parse(data);
    const db = await getDb();
    const [row] = await db
      .update(articles)
      .set({
        slug: parsed.slug,
        title: parsed.title,
        excerpt: parsed.excerpt,
        date: parsed.date,
        tags: parsed.tags,
        body: parsed.body,
        published: parsed.published,
        updatedAt: sql`now()`,
      })
      .where(eq(articles.id, id))
      .returning();
    return row;
  });

export const deleteArticle = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    await requireAdmin();
    const db = await getDb();
    await db.delete(articles).where(eq(articles.id, id));
    return { ok: true };
  });

// ---------------------------------------------------------------------------
// Type helper — map DB row → public Article shape
// ---------------------------------------------------------------------------
export function toPublicArticle(row: ArticleRow) {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: row.date,
    tags: row.tags,
    body: row.body,
  };
}
