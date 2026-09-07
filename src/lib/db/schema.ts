import {
  pgTable,
  uuid,
  text,
  boolean,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  category: text("category").notNull(),
  stack: text("stack").array().notNull().default([]),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  featured: boolean("featured").notNull().default(false),
  cover: text("cover"),
  images: text("images").array().notNull().default([]),
  date: date("date").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------
export const articles = pgTable("articles", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  date: date("date").notNull(),
  tags: text("tags").array().notNull().default([]),
  body: text("body").notNull(),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ---------------------------------------------------------------------------
// Admin Users
// ---------------------------------------------------------------------------
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------
export type ProjectRow = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type ArticleRow = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
export type AdminUserRow = typeof adminUsers.$inferSelect;
