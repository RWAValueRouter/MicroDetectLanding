import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

export type InsightMeta = {
  title: string;
  description: string;
  coverImage: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
};

export type InsightSummary = InsightMeta & {
  slug: string;
};

type InsightModule = {
  default: ComponentType;
  meta: InsightMeta;
};

const insightsDirectory = path.join(process.cwd(), "content", "insights");

export function getInsightSlugs() {
  return fs
    .readdirSync(insightsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getInsightBySlug(slug: string) {
  const module = (await import(`../content/insights/${slug}.mdx`)) as InsightModule;

  return {
    slug,
    meta: module.meta,
    Component: module.default
  };
}

export async function getAllInsights(): Promise<InsightSummary[]> {
  const insights = await Promise.all(
    getInsightSlugs().map(async (slug) => {
      const insight = await getInsightBySlug(slug);

      return {
        slug,
        ...insight.meta
      };
    })
  );

  return insights.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
