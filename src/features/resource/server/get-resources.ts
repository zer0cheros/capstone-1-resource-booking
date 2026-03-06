import db from "@/db";
import { resource } from "../model/resource";

export async function getResources() {
    const results = await db.select().from(resource);
    if (!results.length) throw new Error("insert-failed");
    return results[0]
}