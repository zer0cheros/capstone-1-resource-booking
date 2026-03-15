import { resource } from "../model/resource";
import db from "@/db";
import { CreateResourceInput } from "../validation/create-resource-validator";
import { eq } from "drizzle-orm";
import { User } from "better-auth";

export async function updateResource(id: string, data: any, userId: string) {
    const updated = await db.update(resource).set(data).where(eq(resource.id, userId)).returning();
    if (!updated.length) throw new Error("update-failed");
    return updated[0];
}