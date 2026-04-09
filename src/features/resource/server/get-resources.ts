import db from "@/db";
import { resource } from "../model/resource";
import { rating } from "@/features/rating/model/rating";
import { eq, gt, sql, getTableColumns, asc } from "drizzle-orm";

const ratingAgg = {
    avgRating: sql<string | null>`(round(avg(${rating.stars})::numeric, 1))::text`,
    totalReviews: sql<number>`count(${rating.id})::int`,
};

export async function getResources() {
    const results = await db
        .select({
            ...getTableColumns(resource),
            ...ratingAgg,
        })
        .from(resource)
        .leftJoin(rating, eq(resource.id, rating.resourceId))
        .groupBy(resource.id)
        .orderBy(asc(resource.createdAt));

    return results;
}

export async function getResourceById(id: string) {
    const result = await db
        .select({
            ...getTableColumns(resource),
            ...ratingAgg,
        })
        .from(resource)
        .leftJoin(rating, eq(resource.id, rating.resourceId))
        .where(eq(resource.id, id))
        .groupBy(resource.id)
        .limit(1);

    return result[0] ?? null;
}

export async function getPaginatedResources(limit: number, cursor?: string) {
    const results = await db
        .select({
            ...getTableColumns(resource),
            ...ratingAgg,
        })
        .from(resource)
        .leftJoin(rating, eq(resource.id, rating.resourceId))
        .where(cursor ? gt(resource.id, cursor) : undefined)
        .groupBy(resource.id)
        .orderBy(asc(resource.id))
        .limit(limit + 1);

    const hasNextPage = results.length > limit;

    const items = hasNextPage ? results.slice(0, -1) : results;

    const nextCursor = hasNextPage ? items[items.length - 1].id : null;

    return {
        items,
        nextCursor,
    };
}
