import db from "@/db";
import { resource } from "../model/resource";
import { eq } from "drizzle-orm";

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