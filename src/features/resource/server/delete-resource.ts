import db from "@/db";
import { resource } from "../model/resource";
import { eq } from "drizzle-orm";

export async function deleteResource(id: string) {
    const del = await db.delete(resource).where(eq(resource.id, id)).returning();
    if (!del.length) throw new Error("delete-failed");
    return del[0];
}