import db from "@/db";
import { resource } from "../model/resource";
import { eq, gt } from "drizzle-orm";

export async function getResources() {
    const results = await db.select().from(resource);
    return results;
}

export async function getResourceById(id: string) {
    const result = await db
        .select()
        .from(resource)
        .where(eq(resource.id, id))
        .limit(1);

    return result[0] ?? null;
}

export async function getPaginatedResources (limit: number, cursor?: string) {
    const results = await db
        .select()
        .from(resource)
        .where(cursor ? gt(resource.id, cursor): undefined)
        .limit(limit + 1)
        .orderBy(resource.createdAt);

    const hasNextPage = results.length > limit;

    const items = hasNextPage ? results.slice(0, -1) : results;

    const nextCursor = hasNextPage ? items[items.length - 1].id : null;

    return {
        items,
        nextCursor
    }
}