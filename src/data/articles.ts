import {
  listArticles,
  getArticleBySlug,
  getLatestArticles,
  getArticlesByTag,
  getAllTags,
  toPublicArticle,
} from "@/lib/api/articles";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  body: string;
};

export async function getArticles(): Promise<Article[]> {
  const rows = await listArticles();
  return rows.map(toPublicArticle);
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const row = await getArticleBySlug({ data: slug });
  return row ? toPublicArticle(row) : undefined;
}

export async function latestArticles(count = 3): Promise<Article[]> {
  const rows = await getLatestArticles({ data: count });
  return rows.map(toPublicArticle);
}

export async function articlesByTag(tag: string): Promise<Article[]> {
  const rows = await getArticlesByTag({ data: tag });
  return rows.map(toPublicArticle);
}

export async function allTags(): Promise<string[]> {
  return await getAllTags();
}

export function tagToParam(tag: string) {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

export function paramToTag(param: string) {
  return param.replace(/-/g, " ");
}
