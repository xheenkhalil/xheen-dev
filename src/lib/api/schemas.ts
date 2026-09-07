import { z } from "zod";

// ---------------------------------------------------------------------------
// Project
// ---------------------------------------------------------------------------
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const projectSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(slugPattern, "Slug must be lowercase alphanumeric with hyphens"),
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  category: z.enum(["Product", "Web", "Data Analytics", "Data Science"]),
  stack: z.array(z.string()).default([]),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  featured: z.boolean().default(false),
  cover: z.string().optional().or(z.literal("")),
  images: z.array(z.string()).default([]),
  date: z.string().min(1, "Date is required"), // "YYYY-MM-DD"
  body: z.string().min(1, "Body is required"),
});

export type ProjectInput = z.infer<typeof projectSchema>;

// ---------------------------------------------------------------------------
// Article
// ---------------------------------------------------------------------------
export const articleSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(slugPattern, "Slug must be lowercase alphanumeric with hyphens"),
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  date: z.string().min(1, "Date is required"),
  tags: z.array(z.string()).default([]),
  body: z.string().min(1, "Body is required"),
  published: z.boolean().default(true),
});

export type ArticleInput = z.infer<typeof articleSchema>;

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
export const loginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
